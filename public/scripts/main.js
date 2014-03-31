$(document).ready(function() {
	var h = 100;
	$(document).scroll(function(event) {
		if (h >= 50) {
			h-=2;
			$('.inner').css({'width': h + 'px', 'height': h + 'px'});
		}
	});
});