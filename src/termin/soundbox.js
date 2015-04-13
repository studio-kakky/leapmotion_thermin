class SoundBox{
	constructor( ctx, freq = 440, gain = 0.5 ){
		if( ctx ){
			this._ctx = ctx;
			this._node1 = this._ctx.createOscillator();
			this._node2 = this._ctx.createOscillator();
			this._
			this._gohstnote = this._ctx.createOscillator();
			this._gainNode = this._ctx.createGain();

			this._node1.connect( this._gainNode );
			
			this._baseFrequency = freq;
			this.frequency = freq;
			this._gohstnote.frequency.value = freq-10;


			this.gain = 0.5;


		}else{
			console.error("audioContext is not defiened");
		}
	}

	start( ){
		this._node1.start();
	}

	stop( ){
		this._node1.stop();
	}

	set gain( value ){
		this._gainNode.value = value; 
	}

	set frequency( value ){
		this._node1.frequency.value = value;
	}
	
	get frequency(){
		return this._node1.frequency.value;
	}

	get baseFreq(){
		return this._baseFrequency;
	}

	get node(){
		return this._gainNode;
	}


}