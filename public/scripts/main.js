$(document).ready(function() {

	var scrollorama = $.scrollorama({
		blocks:'.scrollblock',
		enablePin:false
	});

	// scrollorama.onBlockChange(function() {
	// 	var i = scrollorama.blockIndex;
	// 	$('#console')
	// 		.css('display','block')
	// 		.text('onBlockChange | blockIndex:'+i+' | current block: '+scrollorama.settings.blocks.eq(i).attr('id'));
	// });
	//
	//
	//

	scrollorama.animate('#one',{ duration:600, property:'margin-top', start:350, end:0})
						 .animate('#works',{ duration:600, delay: -50, property:'margin-top', start:150, end:650})
						 		.animate('.even',{ duration:600, delay: 250, property:'margin-left', start:180, end:0})
						 		.animate('.odd',{ duration:600, delay: 250, property:'margin-left', start:0, end:180})
						 .animate('#three',{ duration:2000, delay:600, property:'margin-top', start:100, end: 500})
						 .animate('#four',{ duration:2000, delay:2300, property:'margin-top', start:100, end: 500});
});