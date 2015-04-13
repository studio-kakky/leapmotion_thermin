class SoundBox{
	constructor( ctx, freq = 440, gain = 0.5 ){
		if( ctx ){
			this._ctx = ctx;
			this._oscillator1 = this._ctx.createOscillator();
			this._gohstnote = this._ctx.createOscillator();
			this._gainNode = this._ctx.createGain();

			this._oscillator1.connect( this._gainNode );
			
			this._baseFrequency = freq;
			this.frequency = freq;
			this._gohstnote.frequency.value = freq-10;


			this.gain = 0.5;


		}else{
			console.error("audioContext is not defiened");
		}
	}

	start( ){
		this._oscillator1.start();
	}

	stop( ){
		this._oscillator1.stop();
	}

	set gain( value ){
		this._gainNode.value = value; 
	}

	set frequency( value ){
		this._oscillator1.frequency.value = value;
	}
	
	get frequency(){
		return this._oscillator1.frequency.value;
	}

	get baseFreq(){
		return this._baseFrequency;
	}

	get node(){
		return this._gainNode;
	}


}