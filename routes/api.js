var express = require('express');
var request = require('request');

var router = express.Router();

var yelp = {
    url: 'http://api.yelp.com/v2/search',
    oauth: {
        consumer_key: process.env.YELP_CONSUMER_KEY,
        consumer_secret: process.env.YELP_CONSUMER_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET
    }
};

function restaurants(coords) {
    var ll = [
        coords.latitude,
        coords.longitude,
        coords.accuracy
    ].join(',');
    var qs = {
        category_filter: 'restaurants',
        ll: ll
    };
    return request.get({
        url: yelp.url,
        oauth: yelp.oauth,
        qs: qs
    });
}

router.get('/restaurants', function(req, res, next) {
    var coords = req.query;
    if (!coords) {
        return next('Missing coordinates')
    }
    restaurants(coords).pipe(res);
});

module.exports = router;
