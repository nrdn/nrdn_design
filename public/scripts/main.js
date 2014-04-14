$(document).ready(function() {

	$('.work_item').click(function(event) {
		var arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];

		$.post( '/work', { id: $(this).attr('id') } ).done(function(work) {
			$(document).scrollTop(0)
			$('.main_block').css('margin-bottom', '0px').css('margin', '0 auto');
			$('#works, #categorys, #contacts, #maps').hide();

			$.each(work.images, function(index, image) {
				var img_link = $('<a/>', {'class': 'm_img_item', 'href': '#' + arr[index]});
				var img = $('<img/>', {'src': image});
				var demo = $('<img/>', {'src': image, id: arr[index]});

				$('#work_area').append(demo);
				$('.m_images').append(img_link.append(img));
			});
			$('#work_area, .m_images').fadeIn(500);
		});
	});

	$('#m_works, #m_categorys, #m_contacts').click(function(event) {
		$('#work_area, .m_images').fadeOut(500).promise().done(function() {
			$('.m_images, #work_area').empty();
		});
		$('#works, #categorys, #contacts, #maps').show();
		$('.main_block').removeAttr('style');
	});

	var s = skrollr.init({
		forceHeight: false,
		constants: {
			works: $('#works').height() + 800
		}
	});

	skrollr.menu.init(s, {
		animate: true,
		scale: 2,

		duration: function(currentTop, targetTop) {
			return 500;
		}
	});
});