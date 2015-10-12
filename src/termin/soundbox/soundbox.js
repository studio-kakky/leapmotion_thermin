class SoundBox{
	constructor( ctx, freq = 440, gain = 0.5 ){
		if( ctx ){

			this._ctx = ctx;
			this._node1 = this._ctx.createOscillator();
			this._node2 = this._ctx.createOscillator();
			this._node3 = this._ctx.createOscillator();


			this._node1Gain = this._ctx.createGain();
			this._node2Gain = this._ctx.createGain();
			this._node3Gain = this._ctx.createGain();


			this._lfo = this._ctx.createOscillator();
			this._vcf = this._ctx.createBiquadFilter();

			this._vcfGain = this._ctx.createGain();
			this._masterGain = this._ctx.createGain();
			this._controleGain = this._ctx.createGain();
			this._controleGain.gain.value = 1;

			this._node1.connect(this._node1Gain);
			this._node2.connect(this._node2Gain);
			this._node3.connect(this._node3Gain);

			this._node1Gain.connect( this._vcf )
			this._node2Gain.connect( this._vcf )
			this._node3Gain.connect( this._vcf )



			this._lfo.connect( this._node1.detune )
			this._lfo.connect( this._node2.detune )
			this._lfo.connect( this._node3.detune )
			this._lfo.connect( this._vcf.detune );
			this._vcf.connect( this._vcfGain );
			this._vcfGain.connect( this._controleGain );
			this._controleGain.connect( this._masterGain );

			this._node2.type = "sawtooth";
			this._node3.type = "square";
			this._node2Gain.gain.value = 0;
			this._node3Gain.gain.value = 0;

			this._node2.detune.value = -35
			this._node3.detune.value = -35
			this._lfo.frequency.value = 1000;
			this._vcf.frequency.value = 50;






			this._baseFrequency = freq;
			this.frequency = freq;
			this._vcfGain.gain.value = 2

			this.gain = gain;


		}else{
			console.error("audioContext is not defiened");
		}
	}

	start( ){
		this._node1.start();
		this._node2.start();
		this._node3.start();
		this._lfo.start();
	}

	stop( ){
		this._node1.stop();
		this._node2.stop();
		this._node3.stop();
		this._lfo.stop();
	}

	set gain( value ){
		this._controleGain.gain.value = value;
	}

	set frequency( value ){
		this._node1.frequency.value = value;
		this._node2.frequency.value = value;
		this._node3.frequency.value = value;
	}

	get frequency(){
		return this._node1.frequency.value;
	}

	get baseFreq(){
		return this._baseFrequency;
	}

	get node(){
		return this._masterGain;
	}

	connect( node ){
		this._masterGain.connect( node );
	}




}
