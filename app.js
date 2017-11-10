
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var twitter = require('twitter');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
var routes = function() {
  router.get('/',
    function(req, res) {
      res.sendFile('public/index.html');
    });
  router.post('/',
    function(req, res) {
      GetTwitterImages(req.body.uname, function(fotos) {

        var words = [];
        var processedFotos = 0;
        for(var foto of fotos) {
          var cloudVisionClient = require('./lib/cloudVisionClient')();
          cloudVisionClient.detectImageURL(foto, function(error, body) {
            body["responses"][0]["labelAnnotations"].forEach(function (guess) {
              ProcessWord(words, guess["description"]);
            });
            processedFotos++;
            if(processedFotos == fotos.length) {
              words.sort(function (a, b) {
                return b.count - a.count;
              });
              res.render('wordcloud', {twitter: req.body.uname, words: JSON.stringify(words)});
            }
          });
        };
      });
    }
  );
  return router;
}

app.use('/', routes());

app.listen(process.env.port || process.env.PORT || 3000, function () {
  console.log('listening');
});

var client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function ProcessWord(words, word) {
  var duplicateWords = words.filter(function(singleWord){ return singleWord[0] === word });
  if (duplicateWords.length != 0) {
    duplicateWords[0][1] ++;
  }
  else {
    words.push([word, 1]);
  }
}
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
    next(fotos);
  });
}



