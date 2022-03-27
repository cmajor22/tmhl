const express = require('express');
const app = express();
const cors=require("cors");
var bodyParser = require('body-parser')
var mysql = require('mysql');
const path = require("path");
require('dotenv').config()
const { db } = require('./constants');
var connection = mysql.createPool(db);
const port = process.env.BACKENDPORT;

const corsOptions ={
   origin:'*',
   credentials:true,
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "client/build")))

// parse application/json
app.use(bodyParser.json())

var rostersRouter = require('./routes/rosters') (express, connection);
app.use('/rosters', rostersRouter);
var seasonsRouter = require('./routes/seasons') (express, connection);
app.use('/seasons', seasonsRouter);
var standingsRouter = require('./routes/standings') (express, connection);
app.use('/standings', standingsRouter);
var scheduleRouter = require('./routes/schedule') (express, connection);
app.use('/schedule', scheduleRouter);
var statsRouter = require('./routes/stats') (express, connection);
app.use('/stats', statsRouter);
var upcomingGamesRouter = require('./routes/upcomingGames') (express, connection);
app.use('/upcomingGames', upcomingGamesRouter);
var gameRouter = require('./routes/game') (express, connection);
app.use('/game', gameRouter);
var postsRouter = require('./routes/posts') (express, connection);
app.use('/posts', postsRouter);
var playerRouter = require('./routes/player') (express, connection);
app.use('/player', playerRouter);
var signupRouter = require('./routes/signUp') (express, connection);
app.use('/signup', signupRouter);
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, './client/build/index.html')
  );
})

app.listen(port, () => {
  console.log(`TMHL Backend listening at http://localhost:${port}`)
})