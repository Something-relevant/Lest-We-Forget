//for showing data, make three seperate renders of three.js and then call each one depending on true or false of class
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
				scene.background = new THREE.Color( 0x000000 );
				pickingScene = new THREE.Scene();
				pickingTexture = new THREE.WebGLRenderTarget( 1, 1 );
				scene.add( new THREE.AmbientLight( 0x553333,1.5 ) );
				var light = new THREE.SpotLight( 0xffeeee, 1.5S );
				light.position.set( 0, 500, 2000 );
				scene.add( light );
				var pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
				var defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors, shininess: 0	} );
				function applyVertexColors( geometry, color ) {
					var position = geometry.attributes.position;
					var colors = [];
					for ( var i = 0; i < position.count; i ++ ) {
						colors.push( color.r, color.g, color.b );
					}
					geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 1 ) );
				}
				var geometriesDrawn = [];
				var geometriesPicking = [];
				var matrix = new THREE.Matrix4();
				var quaternion = new THREE.Quaternion();
				var color = new THREE.Color();
				for ( var i = 0; i < 5000; i ++ ) {
					var geometry = new THREE.BoxBufferGeometry();
					var position = new THREE.Vector3();
					position.x = Math.random() * 12000 - 5000;
					position.y = Math.random() * 18000 - 3000;
					position.z = Math.random() * 19000 - 4000;
					var rotation = new THREE.Euler();
					rotation.x = Math.random() * 2 * Math.PI;
					rotation.y = Math.random() * 2 * Math.PI;
					rotation.z = Math.random() * 2 * Math.PI;
					var scale = new THREE.Vector3();
					scale.x = Math.random() * 200 + 100;
					scale.y = Math.random() * 200 + 100;
					scale.z = Math.random() * 200 + 100;
					quaternion.setFromEuler( rotation );
					matrix.compose( position, quaternion, scale );
					geometry.applyMatrix( matrix );
					// give the geometry's vertices a random color, to be displayed
					applyVertexColors( geometry, color.setHex( Math.random() * 0xffffff ) );
					geometriesDrawn.push( geometry );
					geometry = geometry.clone();
					// give the geometry's vertices a color corresponding to the "id"
					applyVertexColors( geometry, color.setHex( i ) );
					geometriesPicking.push( geometry );
					pickingData[ i ] = {
						position: position,
						rotation: rotation,
						scale: scale
					};
				}
				var objects = new THREE.Mesh( BufferGeometryUtils.mergeBufferGeometries( geometriesDrawn ), defaultMaterial );
				scene.add( objects );
				pickingScene.add( new THREE.Mesh( BufferGeometryUtils.mergeBufferGeometries( geometriesPicking ), pickingMaterial ) );
				highlightBox = new THREE.Mesh(
					new THREE.BoxBufferGeometry(),
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
				renderer.readRenderTargetPixels( pickingTexture, 0, 0, 1, 1, pixelBuffer );
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






//for showing data, make three seperate renders of three.js and then call each one depending on true or false of class
var req = new XMLHttpRequest(); // Makes AJAX Possible


req.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    var json = JSON.parse(req.responseText);
    //console.log(json);

    for (var i = 0; i<json.length; i++){

      var date = json[i].date_of_death;

      if(date.indexOf('1914') > -1){
        insertEntry(soldiers1914,
          [
            json[i].forename,
            json[i].surname,
            json[i].age_text,
            json[i].date_of_death,
            json[i].rank,
            json[i].additionalinformation,
          //console.log(success14);
        ]);
      }

      if(date.indexOf('1915') > -1){
        insertEntry(soldiers1915,
          [
            json[i].forename,
            json[i].surname,
            json[i].age_text,
            json[i].date_of_death,
            json[i].rank,
            json[i].additionalinformation,
          //console.log(success14);
        ]);
      }

      if(date.indexOf('1916') > -1){
        insertEntry(soldiers1916,
          [
            json[i].forename,
            json[i].surname,
            json[i].age_text,
            json[i].date_of_death,
            json[i].rank,
            json[i].additionalinformation,
          //console.log(success14);
        ]);
      }

      if(date.indexOf('1917') > -1){
        insertEntry(soldiers1917,
          [
            json[i].forename,
            json[i].surname,
            json[i].age_text,
            json[i].date_of_death,
            json[i].rank,
            json[i].additionalinformation,
          //console.log(success14);
        ]);
      }

      if(date.indexOf('1918') > -1){
        insertEntry(soldiers1918,
          [
            json[i].forename,
            json[i].surname,
            json[i].age_text,
            json[i].date_of_death,
            json[i].rank,
            json[i].additionalinformation,
          //console.log(success14);
        ]);
      }

      insertEntry(allSoldiers,
        [
        json[i].forename,
        json[i].surname,
        json[i].age_text,
        json[i].date_of_death,
        json[i].rank,
        json[i].additionalinformation,
      ]);
        console.log('success1')
    }
  }

  else {
    console.log(this.readyState, this.status);//handling errors
  }
}

req.open('GET', '/static/soldiers.json', true);
req.send();

console.log(allSoldiers)
console.log(soldiers1914)
