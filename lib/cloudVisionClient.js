function VisionClient() {
  if (!(this instanceof VisionClient)) {
    return new VisionClient();
  }
};
var unirest = require('unirest');
VisionClient.prototype.detectImageURL = function(url, callback) {
  require('request')(
    {
      url: url,
      encoding: 'binary'
    }
    , function (e,r,b) {
      var base64  = new Buffer(b, 'binary').toString('base64');
      var body = {
        requests: [
          {
            image: {
              content: base64
            },
            features: [
              {
                type: "LABEL_DETECTION",
                maxResults: 10
              }
            ]
          }
        ]
      };
      unirest.post( 'https://vision.googleapis.com/v1/images:annotate' + '?key=' +  'AIzaSyDFcFBobUY91rG4O73qay_VlxE4-fSWUtI')
        .header({ 'Content-Type': 'application/json' })
        .send(body)
        .end(function (response) {
          callback(response.error, response.body);
        });
    }
  );
};
module.exports = VisionClient;
