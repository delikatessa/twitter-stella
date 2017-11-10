window.onload = function WindowLoad(event) {
  var options = {
    list: words,
    gridSize: Math.round(16 * 1440 / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 3) * 1440 / 1024;
      },
      fontFamily: 'Itim, cursive',
      color: function (word, weight) {
        return (weight === 12) ? '#ffffff' : '#ffffff';
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: ''
  }
  WordCloud(document.getElementById('word-cloud-canvas'), options );
};
