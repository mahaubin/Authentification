const User = require('../model/userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.signUp = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    
  } = req.body;
  try {
    if(password){
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            nom:nom,
            prenom:prenom,
            email:email,
            password:passwordHash
        })
        await newUser.save();
        res.status(201).json({ message: "New user created" })
    }
   
  } catch (err) {
    res.status(500).json(err);
    console.log(err.message)
  }

};

module.exports.login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email:email})
    if(!user){
       return  res.status(404).json("User not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);  


    if(!isPasswordCorrect){
        return  res.status(400).json("The password is incorrect")
      }
    const payload = {
        id:user._id,
    }

    const token = jwt.sign(payload,process.env.SECRET_JWT,{expiresIn:'1d'})
    res.cookie('user',token,{
        httpOnly:true
    }).status(200).json({"nom":user.nom})

} catch (error) {
    res.status(500).json(error.message)
}
};

module.exports.logout = (req, res) => {
//     req.clearCookie("user")
//   res.status(200).json("déconnexion avec succès")
res.clearCookie('user').status(200).json("déconnexion avec succès");
};

