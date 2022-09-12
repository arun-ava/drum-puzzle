import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { constants } from './models/dimensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'drum-puzzle';
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  scene = new THREE.Scene();
  cylinderContainer = new THREE.Object3D();
  cylinder = new THREE.CylinderGeometry(
    constants.cylinder.radius, 
    constants.cylinder.radius,
    constants.cylinder.height,
    constants.cylinder.sides,
  );

  materialtop = new THREE.MeshBasicMaterial();
  materialmid = new THREE.MeshBasicMaterial();
  materialbottom = new THREE.MeshBasicMaterial();
  // cylMeshTop = new THREE.Mesh( this.cylinder );
  // cylMeshMid = new THREE.Mesh( this.cylinder );
  // cylMeshBottom = new THREE.Mesh( this.cylinder );

  cylMeshTop =  new THREE.Object3D();
  cylMeshMid =  new THREE.Object3D();
  cylMeshBottom =  new THREE.Object3D();

  tileGeometry = new THREE.BoxGeometry(
    constants.tile.width,
    constants.tile.height,
    constants.tile.depth,
  );

  readonly yaxis = constants.yaxis;

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  isMouseDown = false;
  startX = 0;
  startY = 0;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  ngOnInit(): void {
    this.camera.position.z = 1;
   
    this.cylMeshTop.add(this.getGreenTile());
    this.cylMeshMid.add(this.getGreenTile());
    this.cylMeshBottom.add(this.getGreenTile());

    this.cylMeshTop.add(this.getRedTile());
    this.cylMeshMid.add(this.getRedTile());
    this.cylMeshBottom.add(this.getRedTile());

    this.cylMeshTop.add(this.getYellowTile());
    this.cylMeshMid.add(this.getYellowTile());
    this.cylMeshBottom.add(this.getYellowTile());

    this.cylMeshTop.add(this.getBlueTile());
    this.cylMeshMid.add(this.getBlueTile());
    this.cylMeshBottom.add(this.getBlueTile());

    this.cylMeshTop.add(this.getPinkTile());
    this.cylMeshBottom.add(this.getPinkTile());

    this.cylMeshTop.translateY(0.11);
    this.cylMeshBottom.translateY(-0.11);
    this.cylinderContainer.add(this.cylMeshTop, this.cylMeshMid, this.cylMeshBottom);

    document.getElementById('myCanvas')?.addEventListener('mousedown', (event: any) => {
      // console.log('click down', event);
      this.isMouseDown = true;
      this.startX = event.x;
      this.startY = event.y;
    });

    document.getElementById('myCanvas')?.addEventListener('mouseup', (event: any) => {
      this.isMouseDown = false;
      this.startX = 0;
      this.startY = 0;

      
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects( this.scene.children );
      console.log('intersects', intersects);

      this.testadd(intersects);
    });

    document.getElementById('myCanvas')?.addEventListener('mousemove', (event: any) => {

      this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      if(this.isMouseDown) {
        this.rotateX(event.y - this.startY);
        this.rotateY(event.x - this.startX);
      }
    });

    this.scene.add( this.cylinderContainer );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setAnimationLoop( this.renderview );
    document.getElementById('myCanvas')!.appendChild( this.renderer.domElement );
  }
  
  renderview = (( time: any ) => {
    this.raycaster.setFromCamera( this.pointer, this.camera );
    this.renderer.render( this.scene, this.camera );
    // console.log('renderd');
  });


  rotateLevelRight() {
    this.cylMeshTop.rotateOnAxis(this.yaxis, THREE.MathUtils.degToRad(360/constants.cylinder.sides));
  }

  rotateLevelLeft() {}

  rotateX(offsetX: number) {
    this.cylinderContainer.rotation.x = offsetX / 100;
  }

  rotateY(offsetY: number) {
    this.cylinderContainer.rotation.y = offsetY / 100;
  }

  rotate() {
    this.cylinderContainer.rotation.x = (this.cylinderContainer.rotation.x * 1000 + 500) / 2000;
    this.cylinderContainer.rotation.y = (this.cylinderContainer.rotation.y * 1000 + 500) / 1000;
  }

  getGreenTile() {
    let green = new THREE.MeshBasicMaterial();
    green.color = new THREE.Color('#04f634');
    return new THREE.Mesh(this.tileGeometry, green).rotateOnAxis(this.yaxis, 0.628319).translateZ(0.085);
  }

  getRedTile() {
    let green = new THREE.MeshBasicMaterial();
    green.color = new THREE.Color('#c8144a');
    return new THREE.Mesh(this.tileGeometry, green).rotateOnAxis(this.yaxis, 2*0.628319).translateZ(-0.085);
  }

  getYellowTile() {
    let green = new THREE.MeshBasicMaterial();
    green.color = new THREE.Color('#cbdd46');
    return new THREE.Mesh(this.tileGeometry, green).rotateOnAxis(this.yaxis, 4*0.628319).translateZ(-0.085);
  }

  getBlueTile() {
    let green = new THREE.MeshBasicMaterial();
    green.color = new THREE.Color('#221fc1');
    return new THREE.Mesh(this.tileGeometry, green).rotateOnAxis(this.yaxis,5*0.628319).translateZ(0.085);
  }

  getPinkTile() {
    let green = new THREE.MeshBasicMaterial();
    green.color = new THREE.Color('#f21bc0');
    return new THREE.Mesh(this.tileGeometry, green).rotateOnAxis(this.yaxis,3*0.628319).translateZ(0.085);
  }

  testadd(intersects: any[]) {

    intersects.forEach((intersect) => {
      intersect.object.material.color = new THREE.Color('#221fc1');
      let inte = this.cylMeshTop.children.find((val) => {val.uuid === intersect.object.uuid});
      console.log('matched', inte);
      if(inte) {
        this.cylMeshTop.remove(inte);
        this.cylMeshMid.add(inte);
      }
    });
  }
}




