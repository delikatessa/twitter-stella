
var twitter = require('twitter');
var express = require('express');

var app = express();

var router = express.Router();

var routes = function() {
    router.get('/',
        function(req, res) {
            res.sendFile('index.html');
        });
    router.post('/',
        function(req, res) {
            GetTwitterImages('althaire');
        }
    );
}

app.use('/', routes);

app.listen(3000, function () {
    console.log('listening');
});

var client = new twitter({
    consumer_key: '2gsIVrW3EAUKgxcYFn9fNkg9d',//process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: 'si6QlxsDdm2HdeNO1uVIRKWfexIN2ZxWcCd42or4RPdxGVE4DW', //process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: '119993000-bnph0yrVf8w3JJIrkquLAlFumoDo2aEUKqBEOOcW', //process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: 'Vo4EjIZ13uDSzm4OHcc6cmr5uzyWpLhP6dsdkCH4YopUI',//process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function GetTwitterImages(username, next) {
    var params = { screen_name: username, include_entities: true, exclude_replies: true, include_rts: true, count: 200 };
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (error) {
            console.log(error);
            return;
        }
        var fotos = [];
        tweets.forEach(function (tweet) {
            if (tweet.extended_entities && tweet.extended_entities.media) {
                tweet.extended_entities.media.forEach(function (data) {
                    if (data.type === 'photo') {
                        fotos.push(data.media_url);
                    }
                });
            }
        });
        console.log(tweets.length + ':' + fotos.length);
    }); 
    next();
}



