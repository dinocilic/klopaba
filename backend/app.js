let express = require('express')
let app = express();
let port = 3000;
let cors = require('cors')
let bodyParser = require('body-parser')
let path = require('path')
const { MongoClient, ObjectId } = require('mongodb')
let flash = require('express-flash')
let session = require('express-session')
// const { body, validationResult } = require('express-validator')
// let nodeMailer = require('nodemailer')

app.use(cors())

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'swordfish',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

const gradovi = require('./routes/gradovi');
app.use('/api', gradovi)

app.use('/klopadmin', (req,res) => {   
    res.render('login')
})

// handle production
//if (process.env.NODE_ENV === 'production') {
    // static folder
    // app.use(express.static(__dirname + '/public'))

    // handle SPA0
    //app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
//}

app.listen(port, () => {
    console.log("Server is starting on " + port)
})
  
