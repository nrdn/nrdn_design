$(document).ready(function() {
	$('#work_area, .m_images').hide();

	$('.work_item').click(function(event) {
		$.post( '/work', { id: $(this).attr('id') } ).done(function(work) {
			$(document).scrollTop(0)
			$('.main_block').css('margin-bottom', '0px').css('margin', '0 auto');
			$('#works, #categorys, #contacts, #maps').hide();

			$.each(work.images, function(index, image) {
				var img_link = $('<a/>', {'class': 'm_img_item', 'href': '#cool'});
				var img = $('<img/>', {'src': image});
				var demo = $('<img/>', {'src': image});

				$('#work_area').append(demo);
				$('.m_images').append(img_link.append(img));
			});
			$('#work_area, .m_images').show();
		});
	});

	$('#m_works, #m_categorys, #m_contacts').click(function(event) {
		$('#work_area, .m_images').hide();
		$('.m_images, #work_area').empty();
		$('#works, #categorys, #contacts, #maps').show();
		$('.main_block').removeAttr('style');
	});

	var s = skrollr.init({
		constants: {
			works: document.getElementById("works").clientHeight + 800
		},
		forceHeight: false
	});

	skrollr.menu.init(s, {
	    //skrollr will smoothly animate to the new position using `animateTo`.
	    animate: true,

	    //Multiply your data-[offset] values so they match those set in skrollr.init
	    scale: 2,

	    //How long the animation should take in ms.
	    duration: function(currentTop, targetTop) {
	    	return 500;
	    }
	});
});