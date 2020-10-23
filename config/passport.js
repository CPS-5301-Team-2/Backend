const Strategy = require("passport-local").Strategy;
var Users = require("../model/users");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {

    // Authenticates user
    passport.use(new Strategy((username, password, done)=>{

        Users.findOne({"username": username}, (err, user)=>{

            if(err){return done(err);}
            if(!user){return done(null, false, {message: "User does not exist."});}
            if(!bcrypt.compareSync(password, user.password)){
                return done(null, false, {message: "Incorrect password."});
            }else{
                return done(null, user);
            }

        });
    }));

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        Users.findById(id, (err, user)=>{
            done(err, user);
        });
    });
};