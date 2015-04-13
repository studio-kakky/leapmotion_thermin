$(window).ready(function(){
	var audioContext = new ( window.AudioContext || window.webkitAudioContext )();
	var mysoundBox = new SoundBox( audioContext );
	mysoundBox.node.connect( audioContext.destination );
	mysoundBox.start();
	$("html").mousemove(function(e){
		//console.log(e.clientX);
		//console.log(  )
		mysoundBox.frequency = mysoundBox.baseFreq + e.clientX/10;
	})
	
})