var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query.code)
	console.log(req.query.state)
     res.send(req.query);

  // https://graph.facebook.com/v3.1/ads_archive?access_tokenE=EAABvoAZAq3x4BANvZBBab16kJvLrTCJyRb3b8EFrAnhcHHLZAESZCCWySgMnbescSMNhhmSDdDsQM7rZAJuALrXGzn4sZB5aPVmwrRl3GtWGJaEZB8ll2JW1GKq2FknvSj6ZB8FORElrHqFKWZAuvHcdnlUuSvT8aGQcVZBetFLUuX7oRHWd6v4ZAW8eOzpQliAl5ib4Yfwd9nSvgZDZD&search_terms='california'&ad_reached_countries=['vn']&ad_type=ALL

});

module.exports = router;
