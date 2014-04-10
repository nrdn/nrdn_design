$(document).ready(function() {
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