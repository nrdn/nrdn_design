$(document).ready(function() {

	var scrollorama = $.scrollorama({
		blocks:'.scrollblock'
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

	scrollorama.animate('#menu',{ duration:600, delay:-50, property:'margin-top', start:450, end:10})
						 .animate('.m_item:odd',{ duration:300, delay:-20, property:'margin-top', start:250, end:0})


	scrollorama.animate('#one',{ duration:600, delay:600, property:'margin-top', start:350, end:0, pin:true})


	scrollorama.animate('#works',{ duration:600, delay: 550, property:'margin-top', start:150, end:650})
						 .animate('.w_block:odd',{ duration:600, delay: 550, property:'margin-left', start:180, end:0})
						 .animate('.w_block:even',{ duration:600, delay: 550, property:'margin-left', start:0, end:180})


	scrollorama.animate('#three',{ duration:2000, delay:600, property:'margin-top', start:100, end: 500})
						 .animate('#four',{ duration:2000, delay:2300, property:'margin-top', start:100, end: 500});
});