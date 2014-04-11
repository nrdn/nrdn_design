$(document).ready(function() {
	$('#work_area, .m_images').hide();

	$('.work').click(function(event) {
		$('#work_area, .m_images').show();
		$('#works, #categorys, #contacts, #maps').hide();
		$('.maket').css('margin-bottom', '10%');
	});

	$('#work_area').click(function(event) {
		$('#work_area, .m_images').hide();
		$('#works, #categorys, #contacts, #maps').show();
		$('.maket').removeAttr('style');
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