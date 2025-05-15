
const userModel=require('../models/user.js');
const userController=async(req,res)=>{
    try{

        const data=req.body;
        const isEmailExist=await userModel.findOne({
            where:{
                Email:data.Email
            }
        })
        if(isEmailExist){
            return res.status(400).json({
                message:"Email already exists"
            })
        }
        const response=await userModel.create({
            Name:data.Name,
            Email:data.Email,
            Address:data.Address,
            password:data.password
        })
        console.log(response);
        res.status(200).json({
            message:"User Created",
            data:response
        })

    }catch(err){
        console.log(err);
    }
}

module.exports={
    userController
}