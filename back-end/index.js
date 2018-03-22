// Basic imports
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
// Morgan permet de log les actions utilisateurs dans la console du serveur
// exemple access get sur /users, morgan affiche: "GET /users 200 2.874 ms - 1197"
import morgan from 'morgan'
// DotEnv permet d'utiliser un fichier de config .env (à la racine)
// on déclare des variables dedans puis on les utilise avec process.env.NOMDELAVARIABLE
import dotEnv from 'dotenv'

// Init .env
// Il faut absolement declarer la config de dotenv immediatement
// Pour que les process.env.VARIABLE soient utilisable depuis les imports (de routes)
dotEnv.config()

//  Routes Imports
import auth from './routes/auth/auth'
import users from './routes/users/users'
import messages from './routes/messages/messages'
// Middleware Imports
import verifyToken from './middlewares/verifyToken'

// APP INIT
let app = express();

// Morgan
// A partir d'ici, toute les routes utilisent le middleware morgan
app.use(morgan('dev'))

// CORS
// A partir d'ici, toute les routes utilisent le middleware pour les cross-origin
// Cela permet d'accepter certaines requetes qui seraient autrement invalides car
// bloquées par le navigateur ou autre..
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');    
//   // intercept OPTIONS method
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// })
app.use(cors())

// BODY PARSER
// A partir d'ici, toute les routes utilisent le middleware body-parser
// Qui permet de recuperer les données envoyés depuis le body d'une requete, req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// MONGOOSE MONGODB CONNECT
// Ne pas faire attention à mongoose.Promise
// Avec la methode CONNECT on etabli une connection vers la database mongodb grace à Mongoose
// Très simple d'utilisation pour le coup.
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGOURL, {}, function (err) {
  if (err) { throw err; } else {
    console.log('Connection to the Database etablished (' + process.env.MONGOURL + ')...');
  }
})

// AUTH ROUTE UNPROTECTED
// Les routes qui suivent sont libres d'accès
// Afin de pouvoir s'enregister / se loguer
app.use('/auth', auth)

// AUTH PROTECTION STARTS HERE...
// Use of auth middleware from there
// A partir d'ici on appelle donc pour toutes les routes qui suivent le middleware verifyToken
// Il verifiera à chaque fois si le token est valide avant d'authoriser l'acces à la suite sinon l'aventure s'arrête ici.
app.use(verifyToken)

// Protected routes
// Voici nos routes qui necessitent un token pour être accessibles.
// la route /users aura comme prefix /users et renvoi vers la routes du router 'users' importé au début.
app.use('/users', users)
app.use('/messages', messages)

// Fin des routes, on renvoi un 404 not found pour tout le reste
app.use('/*', (req, res) => {
  res.status(404).json({ success: false, message: 'Этот маршрут не существует.. This route does not exists..'})
})

// LAUNCHING SERVER TO THE MOON
// On défini un port depuis le fichier de config .env  sinon si la variable n'existe pas on utilise le port 1407
let port = process.env.PORT || 1407;
app.listen(port, () => console.log('App listen on port: ' + port + ' ...'))