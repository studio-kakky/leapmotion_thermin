class Finger extends THREE.Object3D{
  constructor(baseScale = 1) {
    super();
    this.baseRadius = 3;
    this.createFinger(baseScale);
  }

  createFinger(baseScale) {
    this.proximal = this.createOneBone(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.2, baseScale, 0.2));
    this.intermediate = this.createOneBone(new THREE.Vector3(0, this.baseRadius * baseScale *2.1, 0), new THREE.Vector3(0.2, baseScale * 0.8, 0.2));
    this.dispal = this.createOneBone(new THREE.Vector3(0, this.baseRadius* baseScale * 3.8, 0), new THREE.Vector3(0.2, baseScale * 0.4, 0.2));
    //this.container.add(this.proximal, this.intermediate, this.dispal);
    this.add(this.proximal, this.intermediate,this.dispal);
  }

  createOneBone(position, scale) {
    var container = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(this.baseRadius,16,16);
    var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.scale.copy(scale);
    sphere.position.set(0, this.baseRadius * scale.y, 0);

    container.add(sphere);
    container.position.copy(position);

    return container;

  }
};
