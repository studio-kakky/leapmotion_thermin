class Distortion{

	constructor( ctx ){
		this._ctx = ctx;
		this._input = this._ctx.createWaveShaper();
		this._gain = this._ctx.createGain();
		this._input.connect( this._gain )
		this.gain = 0.3;
		this._input.curve = this._createCurve();
	}


	_createCurve( amount = 0.9, sampling_num = 4096){

		var curves = new Float32Array( sampling_num );
		var k = 20 * amount / (1 - amount);

		for( var i = 0; i < sampling_num; i++){
			var x = ( ( (i -0) * ( 1 - (-1) ) ) / (sampling_num - 0) ) -1;
			curves[i] = ( (1+k) * x ) / (1 + k * Math.abs(x) );

		}
		return curves;

	}

	connect( node ){
		this._gain.connect( node );
	}

	get input(){
		return this._input;
	}

	set gain( value ){
		return this._gain.gain.value = value;
	}

	get gain(){
		return this._gain.gain.value
	}




}
