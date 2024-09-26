import jwt from 'jsonwebtoken'

const signAccessToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            aud: id
        }
        const secretKey = "secret"
        const options = {
            expiresIn: '3d'
        }

        jwt.sign(payload, secretKey, options, (err, token) => {
            if(err){
                console.log(err.message);
                reject(err)
            }
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if(!req.header['authorization']) return next('unAuthorized')
    
    const authHeader = req.header;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1]

    jwt.verify(token, 'secret', (err, payload) => {
        if(err)
        {
            const message = err.name === 'JsonWebTokenError' ? 'unAuthorized' : err.message
            return next(message)
        }
        req.payload = payload
        next()
    })

}

export {signAccessToken, verifyAccessToken}