// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
//
module.exports = function(app) {

    // GET all burgers
    app.get('/', function(req, res) {
        db.Burger.findAll({}).then(function(dbBurger) {
    
            var hbsObject = {
                burgers: dbBurger,
            };

            res.render('index', hbsObject);
        });
    });



    // POST new burger
    app.post('/api/burgers', function(req, res) {
        db.Burger.create(req.body).then(function(dbBurger) {
        res.json(dbBurger);
        });
    });



    // DELETE burger based on id
    app.delete('/api/burgers/:id', function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger) {
         res.json(dbBurger);
        });
    });

    // UPDATE burger
    app.put('/api/burgers/:id', function(req, res) {
      console.log('update id = ' + req.params.id);
        db.Burger.update(
          {
            devoured: req.body.devoured
          },
           {
                where: {
                    id: req.params.id
                }
        }).then(function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
             return res.status(200).end();
        });
    });
} // end exports


