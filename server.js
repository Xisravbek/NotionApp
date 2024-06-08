const express = require('express');
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload');
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//router;
const mainRotuer = require('./src/router/mainRouter');
const authRouter = require('./src/router/authRouter');
const dashboardRouter = require('./src/router/dashboardRouter')

const app = express();
const PORT = process.env.PORT || 4001;

app.use(session({secret: 'my-session_sekret', resave: true, saveUninitialized:true }));

app.use(passport.initialize())
app.use(passport.session());

app.use(express.urlencoded({extended : true}));
app.use(fileUpload());
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static('public'));

app.use(expressLayouts)


app.set('layout', './layouts/main');

app.set('view engine' , 'ejs')
app.use('/', mainRotuer)
app.use('/', dashboardRouter)


const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT , () => console.log(`Serever runing in ${PORT} port`)) 
    } catch (error) {
        console.log(error);
    }
}
start()