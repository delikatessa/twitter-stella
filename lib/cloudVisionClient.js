var unirest = require('unirest');
VisionClient.GOOGLE_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';
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
      unirest.post(VisionClient.GOOGLE_VISION_API_URL + '?key=' +  'AIzaSyDFcFBobUY91rG4O73qay_VlxE4-fSWUtI')
        .header({ 'Content-Type': 'application/json' })
        .send(body)
        .end(function (response) {
          callback(response.error, response.body);
        });
    }
  );
};
module.exports = VisionClient;
