
var req = new XMLHttpRequest(); // Makes AJAX Possible
var soldiersAge = 0;
req.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    var json = JSON.parse(req.responseText);
    console.log(json);

    for (var i = 0; i<json.length; i++){
      var date = json[i][6];
      var date14 = date.includes('1914');
      var date15 = date.includes('1915');
      var date16 = date.includes('1916');
      var date17 = date.includes('1917');
      var date18 = date.includes('1918');

      insertEntry(allSoldiers,
        [
        json[i][2],
        json[i][1],
        json[i][4],
        json[i][6],
        json[i][8],
        json[i][16],
      ]);

      if(date14 = true){
        insertEntry(soldiers1914,
          [
          json[i][2],
          json[i][1],
          json[i][4],
          json[i][6],
          json[i][8],
          json[i][16],
        ]);
      }

      else if(date15 = true){
        insertEntry(soldiers1915,
          [
          json[i][2],
          json[i][1],
          json[i][4],
          json[i][6],
          json[i][8],
          json[i][16],
        ]);
      }

      else if(date16 = true){
        insertEntry(soldiers1916,
          [
          json[i][2],
          json[i][1],
          json[i][4],
          json[i][6],
          json[i][8],
          json[i][16],
        ]);
      }

      else if(date17=true){
        insertEntry(soldiers1917,
          [
          json[i][2],
          json[i][1],
          json[i][4],
          json[i][6],
          json[i][8],
          json[i][16],
        ]);
      }

      else (date18=true){
        insertEntry(soldiers1918,
          [
          json[i][2],
          json[i][1],
          json[i][4],
          json[i][6],
          json[i][8],
          json[i][16],
        ]);
      }

      console.log("1914 :" + date14 + "---");
      //console.log("1915 :" + date15 + "---");
    //  console.log("1916 :" + date16 + "---");
    //  console.log("1917 :" + date17 + "---");
    //  console.log("1918 :" + date18 + "---");

    }

  }

  else {
    console.log(this.readyState, this.status)//handling errors
  }
}

var soldiersAll = 1
var dead1914 = 0;
var dead1915 = 0;
var dead1916 = 0;
var dead1917 = 0;
var dead1918 = 0;


var soldiers1914 = [];
var soldiers1915 = [];
var soldiers1916 = [];
var soldiers1917 = [];
var soldiers1918 = [];

var allSoldiers = [];

function insertEntry(array, entry){
  array.push(entry);
}

function poppys(array){

}

function soldierDetails(selectedArray){

  var infobox = document.createElement('div');
  infobox.className = 'soldierInfo';
  document.getElementById('soldier').appendChild(infobox);

  var info = document.createElement('tr');
  row.innerHTML += '<td>' + '<h2>' +  selectedArray[i][0] + '  ' + selectedArray[i][1] + '</h2>' + '</td>';
  row.innerHTML += '<td>' + 'Age :' + '  ' +  selectedArray[i][2] +  '</td>';
  row.innerHTML += '<td>' + 'D.O.D :' + '  ' +  selectedArray[i][3] +  '</td>';
  row.innerHTML += '<td>' + 'rank :' + '  ' +   selectedArray[i][4] +  '</td>';
  row.innerHTML += '<td>' +  selectedArray[i][5] + '</td>';

  document.getElementById('infobox').appendChild(info);

}
















//three.js
import * as THREE from './build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { BufferGeometryUtils } from './jsm/utils/BufferGeometryUtils.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';

var container, stats;
var camera, controls, scene, renderer;
var pickingData = [], pickingTexture, pickingScene;
var highlightBox;
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3( 10, 10, 10 );

init();
animate();

			function init() {
				container = document.getElementById( "soldiers" );
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1000;
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x110000 );
				pickingScene = new THREE.Scene();
				pickingTexture = new THREE.WebGLRenderTarget( 1, 1 );
				scene.add( new THREE.AmbientLight( 0x555555 ) );
				var light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 500, 2000 );
				scene.add( light );

				var pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
				var defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors, shininess: 0	} );


    		var geometriesDrawn = [];
    		var geometriesPicking = [];
    		var matrix = new THREE.Matrix4();
    		var quaternion = new THREE.Quaternion();
    		var color = new THREE.Color();

        var loader = new FBXLoader();

				for ( var i = 0; i < 5000; i ++ ) {

    			loader.load( '/static/PoppyHead.fbx', function( object ) {

            var refObject = this.referenceModel;
            var mesh = new THREE.Mesh( refObject.geometry, refObject.material );


            mesh.position.set(0,0,10);
            mesh.scale.set(0.2,0.2,0.2);
            mesh.rotation.x=-0.25*Math.PI;
            var poppy= this.poppyPre.clone();

            poppy.children[1]=mesh;

            poppy.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
            });


            this.scene.add( poppy );


              });
				}

				var objects = new THREE.Mesh( BufferGeometryUtils.mergeBufferGeometries( geometriesDrawn ), defaultMaterial );
				scene.add( objects );
				pickingScene.add( new THREE.Mesh( BufferGeometryUtils.mergeBufferGeometries( geometriesPicking ), pickingMaterial ) );
				highlightBox = new THREE.Mesh(
					new THREE.BoxBufferpoppy(),
					new THREE.MeshLambertMaterial( { color: 0xffff00 }
					) );


				scene.add( highlightBox );
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				controls = new TrackballControls( camera, renderer.domElement );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
				stats = new Stats();
				container.appendChild( stats.dom );
				renderer.domElement.addEventListener( 'mousemove', onMouseMove );
			}
			//
			function onMouseMove( e ) {
				mouse.x = e.clientX;
				mouse.y = e.clientY;
			}


			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}


			function pick() {
				//render the picking scene off-screen
				// set the view offset to represent just a single pixel under the mouse
				camera.setViewOffset( renderer.domElement.width, renderer.domElement.height, mouse.x * window.devicePixelRatio | 0, mouse.y * window.devicePixelRatio | 0, 1, 1 );
				// render the scene
				renderer.setRenderTarget( pickingTexture );
				renderer.render( pickingScene, camera );
				// clear the view offset so rendering returns to normal
				camera.clearViewOffset();
				//create buffer for reading single pixel
				var pixelBuffer = new Uint8Array( 4 );
				//read the pixel
				renderer.readRenderTargetPixels( pickingTexture, 1, 1, 0, 1, pixelBuffer );
				//interpret the pixel as an ID
				var id = ( pixelBuffer[ 0 ] << 16 ) | ( pixelBuffer[ 1 ] << 8 ) | ( pixelBuffer[ 2 ] );
				var data = pickingData[ id ];
				if ( data ) {
					//move our highlightBox so that it surrounds the picked object
					if ( data.position && data.rotation && data.scale ) {
						highlightBox.position.copy( data.position );
						highlightBox.rotation.copy( data.rotation );
						highlightBox.scale.copy( data.scale ).add( offset );
						highlightBox.visible = true;
					}
				} else {
					highlightBox.visible = false;
				}
			}

			function render() {
				controls.update();
				pick();
				renderer.setRenderTarget( null );
				renderer.render( scene, camera );
			}
