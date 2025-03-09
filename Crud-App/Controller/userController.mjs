import bcrypt from "bcryptjs";
import User from "../models/user.mjs"

const login = async (req, res) => {
    try{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(user){
    const checkPassword = bcrypt.compareSync(password, user.Password);
    if(checkPassword){
      res.Status(200).send({status:200, message:"Login Successfull", user})
    }else{
      res.status(404).send({error:err, status:401, message:"Incorrect Password"});
    }
  }else{
  res.status(404).send({eerror:err, status:404, message:"User not found"})
  }
    } catch(err){
  console.log(err);
  res.status(400).send({error: err, status:400})
    }
  };
  
  app.post('/user',async(req,res)=>{
    try{
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await user.create({...req.body, password});
      res.status(201).send({status: 201, user});
    }  catch(err){
      res.status(400).send({error:err , status:400});
    }
  });
  
  app.get('/user',async(req, res) => {
     try {
      const users = await User.findbyId()
      res.send(users)
    }catch(err){
  res.status(404).send({error: err, status:400})
    }
    });
  
  app.delete('/user/:id', async(req, res) => {
      try{const {id} = req.params;
      await User.findByIdAndDelete(id)
      console.log(id);
      res.send({message: "User deleted Successfully!"})
    } catch(err){
  res.status(400).send({error:err, status:400});
    }
    })
   
    
    app.put('/user/:id',async(req,res)=>{
     try {
    const {id} = req.params;
     const user = await User.findByIdAndUpdate(id, req.body);
      res.send({message:"User updated successfully"})
    }catch(err){
      res.status(404).send({error:err, status:404});
    } 
  })