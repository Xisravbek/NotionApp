const express = require('express');
const rotuer = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../model/userModel');
const router = require('./mainRouter');


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
    }
    
    try {
        let user = await User.findOne({ googleId: profile.id });
       
        if(user) {
            done(null, user)
        }else{
            user = await User.create(newUser)
            done(null, user) 
        }
    } catch (error) {
        console.log(error);
    }
   
  }
));

router.get('/auth/google',passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get( '/google/callback', passport.authenticate( 'google', { successRedirect: '/dashboard', failureRedirect: '/login-failure'}));
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
            res.send("Error logout")
        }else{
            res.redirect('/home')
        }
    })
})

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    }).catch(error => {
        done(error, null)
    })
})

module.exports = router;