$(document).ready(function() {
  var s = skrollr.init({
  	forceHeight: true
  });

  s.on('render', function(data) {
  	console.log(data)
  });
});