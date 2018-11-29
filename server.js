// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');

// Set up Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Require models (this syncs the db model with the db)
var db = require('./models');

// items in this directory are what public sees - css, images, etc.
app.use(express.static('public'));

// states Express will handle parsing data (req.body as JSON)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// handlebars setup
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); // handlebars is handling what the user sees

// Get Routes
require('./routes/burger-api-routes.js')(app);

// Sync sequelize table models with db, THEN start Express app (listen)
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('App now listening at localhost:' + PORT);
  });
});