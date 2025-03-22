import usersModel from "../model/users.model.js";
import { hashValue, hashCompare, createToken } from '../utils/auth.js'





const signUp = async(req, res) => {
    try {
        let user = await usersModel.findOne({
            email: req.body.email
        })

        if(!user){
            req.body.password = await hashValue(req.body.password)
            await usersModel.insertOne(req.body)
            res.status(201).json({message: "User created successfully"})
        }
        else{
            res.status(400).json({message: `User with ${req.body.email} already exists!`})
        }

    }
    catch(err){
        res.status(500).send({
            message: err.message || "Internal Server Error", err
        })
    }
}



const signIn = async(req, res) => {
    try {

        let  { email, password } = req.body
        let user = await usersModel.findOne({email})

        if(user)
        {
            if ( await hashCompare(password, user.password)){
                let data = {
                    id: user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
                let token = await createToken(data)
                res.status(200).json({message: "User logged in successfully", token, role:user.role})
            }
            else{
                res.status(400).json({message: "Invalid password"})
            }
        }
        else{
            res.status(400).json({message: "Invalid email"})
        }

    }
    catch(err){
        res.status(500).send({
            message:err.message || "Internal Server Error",
            err
        })
    }
}


const getUserByIdFromToken =  async(req,res)=>{
    try {
        let id = req.headers.id

        let data = await usersModel.findOne({_id:id},{password:0,_id:0})

        res.status(200).send({
            message:"Data Fetch Successfull",
            data
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}






export default{
    signUp,
    signIn,
    getUserByIdFromToken
}
