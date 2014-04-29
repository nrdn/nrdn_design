$(document).ready(function() {

	function scrollMain(data) {
	  if ($('.logo').offset().top >= $('#categorys').offset().top) {
	  	$('.m_item').removeAttr('style')
	  }
	  if ($('.logo').offset().top >= $('#works').offset().top) {
	  	$('.m_item').removeAttr('style')
	  	$('#m_works').css('color', 'black');
	  }
	 	if ($('.logo').offset().top >= $('#contacts').offset().top - 250) {
	  	$('.m_item').removeAttr('style');
	  	$('#m_contacts').css('color', 'black');
	  }
	}

	function scrollImg (data) {
	  if ($('.logo').offset().top >= $('.img_demo').offset().top - 250) {
	  	var id = $('.img_demo').attr('id');
	  	console.log(id)
	  	$('.m_img_item').removeAttr('style')
	  	$('#' + id).css('color', 'red');
	  }
	}

	$('.work_item').click(function(event) {
		var arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
		s.on('render', scrollImg)

    $('.m_item').removeAttr('style')
		$('#m_works').css('color', 'black');

		$.post( '/work', { id: $(this).attr('id') } ).done(function(work) {
			$(document).scrollTop(0);
			$('.main_block').css('margin-bottom', '0px').css('margin', '0 auto');
			$('.footer_block').css('height', '200px');
			$('.maket').css('margin-bottom', '200px');
			$('#works, #categorys, #contacts, #maps').hide();


			var work_description_block = $('<div/>', {'class': 'work_description_block'});
			var title = $('<div/>', {'class': 'work_title', 'text': work.ru.title});
			var description = $('<div/>', {'class': 'work_description', 'text': work.ru.description});
			$('.footer_block').append(work_description_block.append(title, description));


			$.each(work.images, function(index, image) {
				var img_link = $('<a/>', {'class': 'm_img_item', 'text':'●', 'href': '#' + arr[index]});
				var demo = $('<img/>', {'src': image, 'class':'img_demo', 'id': arr[index]});

				$('#work_area').append(demo);
				$('.m_images').append(img_link);
			});
			$('#work_area, .m_images').fadeIn(500);
		});
	});

	$('#m_works, #m_categorys, #m_contacts').click(function(event) {
		s.on('render', scrollMain);

		$('#work_area, .m_images').fadeOut(500).promise().done(function() {
			$('.m_images, #work_area').empty();
			$('.work_description_block').remove();
		});
		$('#works, #categorys, #contacts, #maps').show();
		$('.main_block, .footer_block, .maket').removeAttr('style');
	});

	var s = skrollr.init({
		forceHeight: false,
		constants: {
			works: $('#works').height() + 800
		},
    render: scrollMain
	});

	skrollr.menu.init(s, {
		animate: true,
		scale: 2,

		duration: function(currentTop, targetTop) {
			return 500;
		}
	});
});