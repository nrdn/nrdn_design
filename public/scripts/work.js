$(document).ready(function() {
	$('.dot:first').text('●');
	var count = $('.background_item').length - 1;
	var w_count = 0;

	function backScroll(event) {
			var target = $(event.target);
			$('.round_click_block').hide();
			$('.background_works').addClass('glow');

			if (target.is( ':not(.logo, .menu_items a)' )) {
				w_count++;
				$('.work_item').hide();
				$('.work_item').eq(w_count).show();
				$('.dot').text('◦');
				$('.dot').eq(w_count).text('●');
				$('.background_item').eq(count).css('opacity', '0');
				$('.background_item').eq(count-1).css('opacity', '1');
				count--;

				if (count < 0) {
					$('.background_item').css('opacity', '1')
					count = $('.background_item').length - 1;
					w_count = 0;
					$('.work_item').eq(w_count).show();
					$('.dot').eq(w_count).text('●');
				}
			}
		}

		$(document).on('click', backScroll);
});