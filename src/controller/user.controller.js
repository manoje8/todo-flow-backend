import userModel from "../model/user.model.js"
import { randomString } from "../utils/generateKeys.js"
import generateMail from "../utils/generateMail.js"
import { signAccessToken } from "../utils/jwtHelper.js"

class User
{
    static async register(req, res, next)
    {
        const {email, password} = req.body
        try
        {
            const findUser = await userModel.findOne({email})
            if(findUser) return res.status(400).send({message: 'Already registerd. Please Login'})
            
            if(password.length < 5) return res.status(400).send({message: 'Your password is too small. please enter the character more than 5'})
            
            await userModel.create(req.body)

            res.status(200).send('Successfully registered')
        }
        catch(error)
        {
            console.log("Error occurs in registering: ", error);
            next(error)
        }
    }

    static async login(req, res, next)
    {
        const {email, password} = req.body
        try
        {
            const findUser = await userModel.findOne({email})
            if(!findUser) return res.status(400).send({message: 'User not registered'})

            const isMatch = await findUser.isValidPassword(password); 
            if(!isMatch) return res.status(400).send({message: 'Email/Password is not valid'})

            const accessToken = await signAccessToken(findUser._id)

            res.status(200).send({accessToken, name:findUser.name})
        }
        catch(error)
        {
            console.log("Error in login: ", error);
            next(error)
        }
    }


    static async forgotPassword(req, res, next)
    {
        const {email} = req.body
        try 
        {
            const user = await userModel.findOne({email})

            if(!user) return res.status(400).send({message: "User not registered"}) 
                
            const otp = randomString();
            const otpExpire = new Date();
            otpExpire.setMinutes(otpExpire.getMinutes() + 5)

            const link = `${process.env.CLIENT_URI}/auth/reset-password`

            user.otp = otp;
            user.otpExpire = otpExpire
            await user.save();

            const resetPasswordMessage = `Hello ${user.name} ,
            <br> 
            Here's your Reset password link:  <a style="color:green" href="${link}">Click Here To Reset</a> 
            <br> 
            Here is your One-Time Password (OTP): <strong>${otp}</strong></p>
            <br>
            OTP expires in 5 Minutes...`
            
            const mailResponse = await generateMail(user, "Reset password", resetPasswordMessage)
            res.status(200).send(mailResponse)

        } catch (error) 
        {
            console.log(error);
            next(error)
        }
    }

    static async resetPassword(req, res, next)
    {
        const {otp, email, newPassword} = req.body;
        try 
        {
            const user = await userModel.findOne({email})
            
            if(!user) return res.status(400).send({message: "User not registered"})
            if(user.otp !== otp) return res.status(400).send({message: "Invalid OTP"})
            

            if (user.otpExpire > new Date()) 
            {
                user.password = newPassword;
                user.otp = null;
                user.otpExpire = null;
                await user.save()

                res.status(200).send("Password changed successfully" );
            } else 
            {
                // Handle expired OTP scenario
                res.status(400).send({ message: 'OTP has expired' });
            }

        } catch (error) 
        {
            console.log("Error: ", error);
            next(error)
        }
    }
}

export default User