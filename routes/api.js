var express = require('express');
var Factual = require('factual-api');

var router = express.Router();
var factual = new Factual(
    process.env.FACTUAL_API_KEY,
    process.env.FACTUAL_API_SECRET
);
var categories = [
    338 // Social > Food & Dining
];

function restaurants(latitude, longitude, radius, cb) {
    factual.get('/t/restaurants-us', {
        geo: {
            "$circle": {
                "$center": [latitude, longitude],
                "$meters": radius
            }
        }
    }, cb);
}

/* GET home page. */
router.get('/restaurants', function(req, res, next) {
    var latitude = req.query.lat;
    var longitude = req.query.lng;
    var radius = req.params.rad || 5000;
    restaurants(latitude, longitude, radius, function(err, rez) {
        if (err) {
            return next(err);
        }
        res.send(rez.data);
    });
});

module.exports = router;
