class Main {
  constructor(element) {
    this.UPDATE_LEFT = 'update_left';
    this.UPDATE_RIGHT = 'update_right';
    this.scale = 0.7;
    this.events = {};
    _.extend(this.events, Backbone.Events);
    this.init(element);
  }

  init(element) {
    this.setScene(element);
    this.renderStart();
    this.setHands();
    this.setInstruments();
    this.listenHandMove();
  }

  setScene(element) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild( this.renderer.domElement );

    this.camera.position.set(0, -100, 100);
    this.camera.lookAt({x:0, y:80, z:0});

    var groundGeo = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    var groundMaterial = new THREE.MeshBasicMaterial( {color: 0x222222, wireframe: true} );
    var ground = new THREE.Mesh(groundGeo, groundMaterial)

    this.scene.add(ground);

    var axis = new THREE.AxisHelper(1000);
    axis.position.set(0, 0, 0);
    this.scene.add(axis);

  }

  setHands() {
    this.leftHand = new Hand(false);
    this.leftHand.position.set(-15, -5, 0);
    this.rightHand = new Hand();
    this.rightHand.position.set(15, -5, 0);
    this.scene.add(this.leftHand, this.rightHand);
  }

  setInstruments() {
    this.audioContext = new ( window.AudioContext || window.webkitAudioContext )();
  	this.termin = new Termin( this.audioContext, document.getElementById('noteGuid') );
    this.distortion = new Distortion( this.audioContext );
  	this.delay = new Delay( this.audioContext );
    this.termin.connect( this.distortion.input );
  	this.distortion.connect( this.delay.input );
  	this.delay.connect( this.audioContext.destination )
    //this.soundBox.connect(this.audioContext.destination);
    this.termin.gain = 0.01;
  	this.termin.start();
  }

  renderStart() {
    setInterval(()=> {
      this.renderer.render(this.scene, this.camera);
    }, 60);
  }

  listenHandMove() {

    this.events.listenTo(this.events, this.UPDATE_LEFT, (data)=> {
      this.updateLeftHand(data);
    });
    this.events.listenTo(this.events, this.UPDATE_RIGHT,(data)=> {
      this.updateRightHand(data);
    });

    this.startLeap();
  }

  startLeap() {
    var hand;
    var data;
    Leap.loop((frame)=>{
      for(var i = 0, l = frame.hands.length; i < l; i++){
        hand = frame.hands[i];
        data = {
          rotation:new THREE.Vector3(hand.pitch(), hand.roll() * -1 , hand.yaw() * -1),
          position:new THREE.Vector3(
            hand.palmPosition[0] * this.scale,
            hand.palmPosition[2] * this.scale * -1,
            (hand.palmPosition[1] - 30) * this.scale
          )
        };
        if (hand.type == 'left') {
          this.events.trigger(this.UPDATE_LEFT, data);
        } else {
          this.events.trigger(this.UPDATE_RIGHT, data);
        }
      }
    });
  }

  updateLeftHand(data) {
    this.updateHandPosition(this.leftHand, data);
    this.updateGain(data.position.z);
  }

  updateRightHand(data) {
    this.updateHandPosition(this.rightHand, data);
    this.updateFrequency(data.position.x);
  }

  updateHandPosition(target, data) {
    target.position.copy(data.position);
    target.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
  }

  updateFrequency(input) {
    var distance = input * 2;
    this.termin.setNote(distance);
  }

  updateGain(input) {
    var distance =  input -15 ;
    if (distance < 0) distance = 0;
    this.termin.setGain(distance / 30);
  }


}
