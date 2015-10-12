class Hand extends THREE.Object3D{
  constructor(isRight = true) {
    super();
    this.body = this.createBody();
    this.add(this.body);
    this.setFingers(isRight);
  }

  setFingers(isRight) {
    var posDir = (isRight) ? 1 : -1;
    var finger0 = new Finger(0.8);
    finger0.rotation.set(0, 0, Math.PI * 0.1  * posDir );
    finger0.position.set(-7 * posDir, 0, 0);

    var finger1 = new Finger();
    finger1.rotation.set(0, 0, 0);
    finger1.position.set(-5 * posDir, 7, 0);

    var finger2 = new Finger(1);
    finger2.rotation.set(0, 0, 0);
    finger2.position.set(-1 * posDir, 9.5, 0);

    var finger3 = new Finger();
    finger3.rotation.set(0, 0, 0);
    finger3.position.set(3 * posDir, 8.5, 0);

    var finger4 = new Finger(0.8);
    finger4.rotation.set(0, 0, 0);
    finger4.position.set(6 * posDir, 6, 0);

    this.fingers = [finger0, finger1, finger2, finger3, finger4];

    this.add(finger0, finger1, finger2, finger3, finger4);
  }

  createBody() {
    var rad = 5
    var body = new THREE.Object3D();
    var geometry = new THREE.TorusGeometry(rad, 0.6, 16, 16);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true});
    var torus = new THREE.Mesh(geometry, material);
    torus.position.set(0, rad/2,0);
    body.add(torus);

    return body;
  }

}
