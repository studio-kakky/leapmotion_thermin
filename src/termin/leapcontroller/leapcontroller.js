class LeapController{

	constructor(){

		this._rightHand = {};
		this._leftHand = {};

	}

	startTracking(){

		Leap.loop((frame)=>{

			var l = frame.hands.length;
			if( l > 2) l = 2;
			for( var i =0; i < l; i++){
				this.setData( frame.hands[i] );
			}

		})

	}

	setData( data ){

		if( data.isRigth ){
			console.log( data );
			this._rightHand = data;
		}else if( data.isLeft ){
			this._leftHand = data;
		}

	}

	get leftHand(){
		return this._leftHand;
	}

	get rightHand(){
		return this._rightHand;
	}

}