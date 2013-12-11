var count = 0;
var margin = 250;

function getScroll () {
	var offset_top = $('.cont').eq(count).offset().top;
	var offset_bottom = $('.cont').eq(count).offset().top + $('.cont').eq(count).height();
	var scroll_top = $(document).scrollTop();

	if (scroll_top >= offset_bottom) {
		count++;
		margin = 250;
	}

	if (scroll_top >= offset_top + 100) {
		if (margin < 550) {
			margin+=5.33333333333333333;
			$('.cont').eq(count+1).css('margin-top', margin)
		}
	}
}


$(document).ready(function() {
	$(document).on('scroll', getScroll)
});