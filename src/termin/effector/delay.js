class Delay{
	constructor( ctx ){
		this._ctx = ctx;
		this._input = this._ctx.createGain();
		this._dry = this._ctx.createGain();
		this._delay = this._ctx.createDelay();
		this._wet = this._ctx.createGain();
		this._feedback = this._ctx.createGain();
		this._gain = this._ctx.createGain();

		this.initSetting();


		this._input.connect( this._delay );
		this._input.connect( this._dry );

		this._delay.connect( this._feedback );
		this._feedback.connect( this._delay );

		this._delay.connect( this._wet );

		this._wet.connect( this._gain );
		this._dry.connect( this._gain );

		

	}

	initSetting(){
		this._delay.delayTime.value = 0.2;
		this._feedback.gain.value = 0.5;
		this._wet.gain.value = 0.3;
		this._dry.gain.value = 0.7;
		this.gain = 0.7
	}

	connect( node ){
		this._gain.connect( node );
	}


	get input(){
		return this._input
	}

	set wet( value ){
		this._wet.gain.value = value;
	}

	get wet(){
		return this._wet;
	}

	set dry( value ){
		this._dry.gain.value = value;
	}

	get dry( value ){
		return this._dry
	}

	set gain( value ){
		this._gain.gain.value = value;
	}

	get gain( ){
		return this._gain.gain.value;
	}

}