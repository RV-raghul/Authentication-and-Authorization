import { decodeToken } from '../utils/auth.js'

const authGuard = ( req, res, next) =>{
    let token = req?.headers?.authorization?.split(" ")[1]
    
    if(token){
        let payload = decodeToken(token)
        req.headers.id = payload.id

        if( Math.floor(+new Date()/1000) <= payload.exp)
            next()
        else
        res.status(401).json({message: "Token has expired" })
    }
    else
    res.status(401).json({message: "No token provided" })
    
}


export default authGuard