//for showing data, make three seperate renders of three.js and
// then call each one depending on true or false of class
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

      else if(date.indexOf('1915') > -1){
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

      else if(date.indexOf('1916') > -1){
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

      else if(date.indexOf('1917') > -1){
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

      else if(date.indexOf('1918') > -1){
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

//    console.log(soldiers1918)
//    console.log(soldiers1914.length)
//    console.log(soldiers1915.length)
//    console.log(soldiers1916.length)
  //  console.log(soldiers1917.length)
//    console.log(soldiers1918.length)
//    console.log(allSoldiers.length)

    init(json.length,
        soldiers1914,
        soldiers1915,
        soldiers1916,
        soldiers1917,
        soldiers1918);
  }

  else {
    console.log(this.readyState, this.status);//handling errors
  }
}

req.open('GET', '/static/soldiers.json', true);
req.send();

function insertEntry(array, entry){
  array.push(entry);
}

function poppys(){
  console.log(allSoldiers.length)

  if(soldiersAll == 1){
    return allSoldiers.length;
  }
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
    import { GUI } from './jsm/libs/dat.gui.module.js';
    import Stats from './jsm/libs/stats.module.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';


    var container, stats;
    var controls;
    var camera, scene, renderer;
    var radius = 100, theta = 0;
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();

function sceneSetup(){

    container = document.getElementById( 'soldiers' );
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 150;

    camera.layers.enable( 0 ); // enabled by default
    camera.layers.enable( 1 );
    camera.layers.enable( 2 );
    camera.layers.enable( 3 );
    camera.layers.enable( 4 );
    camera.layers.enable( 5 );
    scene.background = new THREE.Color( 0x0c0c0c );
    var light = new THREE.PointLight( 0xffffff, 10 );
    light.layers.enable( 0 );
    light.layers.enable( 1 );
    light.layers.enable( 2 );
    light.layers.enable( 3 );
    light.layers.enable( 4 );
    light.layers.enable( 5 );



    scene.add( camera );
    camera.add( light );
}

function layerSetup(){

    var layers = {
      '1914': function() {
        camera.layers.enable( 0 );
        camera.layers.disable( 1);
        camera.layers.disable( 2);
        camera.layers.disable( 3);
        camera.layers.disable( 4);

      },
      '1915': function() {
        camera.layers.enable( 1 );
        camera.layers.disable( 0);
        camera.layers.disable( 2);
        camera.layers.disable( 3);
        camera.layers.disable( 4);
      },
      '1916': function() {
        camera.layers.enable( 2 );
        camera.layers.disable( 1);
        camera.layers.disable( 0);
        camera.layers.disable( 3);
        camera.layers.disable( 4);
      },
      '1917': function() {
        camera.layers.enable( 3 );
        camera.layers.disable( 1);
        camera.layers.disable( 2);
        camera.layers.disable( 0);
        camera.layers.disable( 4);
      },
      '1918': function() {
        camera.layers.enable( 4 );
        camera.layers.disable( 1);
        camera.layers.disable( 2);
        camera.layers.disable( 3);
        camera.layers.disable( 0);
      },

      'All Soldiers': function() {
        camera.layers.enableAll();
      },

    };
    //
    // Init gui
    var gui = new GUI();
    gui.add( layers, '1914' );
    gui.add( layers, '1915' );
    gui.add( layers, '1916' );
    gui.add( layers, '1917' );
    gui.add( layers, '1918' );
    gui.add( layers, 'All Soldiers' );

}

function playercontrols(){
  controls = new OrbitControls( camera, renderer.domElement );

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.15;
  controls.zoomSpeed = 0.75;
  controls.screenSpacePanning = false;
  controls.minDistance = -2000;
  controls.maxDistance = 4500;
  controls.maxPolarAngle = Math.PI / 2;
  console.log(camera.position.z)

}
    //init();
    sceneSetup();
    layerSetup();
    playercontrols();
    animate();



    function init(
        all,
        len1914,
        len1915,
        len1916,
        len1917,
        len1918,){


      var loader = new GLTFLoader();

      loader.load( './static/PoppyHead.glb', function ( gltf ) {

        gltf.scene.scale.set(10,10,10); // scale here
      	scene.add( gltf.scene );


      }, undefined, function ( error ) {

      	console.error( error );

      } );


      var colors = [ 0xff0000, 0xff1000, 0xDD0000, 0xEE0000, 0xBF0000 ];
      var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
      var layer;


      for ( var i = 0; i < len1914.length; i ++ ) {

          var sizeage14 = len1914[i][2];
           layer = 0;

        loader.load( './static/PoppyHead.glb', function ( gltf ) {
          var object = gltf.scene; // scale here
          object.position.set(Math.random() * 200 - 100,Math.random() * 200 - 100,Math.random() * 200 - 100);
          object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
          object.scale.set(sizeage14/2, sizeage14/2,sizeage14/2);
          object.layers.set( layer );
          scene.add( object );



      });
      }

      for ( var i = 0; i < len1915.length; i ++ ) {

        var sizeage15 = len1915[i][2];
        layer = 1;

        loader.load( './static/PoppyHead.glb', function ( gltf ) {

          var object = gltf.scene; // scale here
          object.position.set(Math.random() * 1800 - 900,Math.random() * 1900 - 900,Math.random() * 1800 - 900);
          object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
          object.scale.set(sizeage15/2, sizeage15/2,sizeage15/2);
          object.layers.set( layer );
          scene.add( object );


      });
      }

      for ( var i = 0; i < len1916.length; i ++ ) {

        var sizeage16 = len1916[i][2];

        loader.load( './static/PoppyHead.glb', function ( gltf ) {
          layer = 2;
          var object = gltf.scene; // scale here
          object.position.set(Math.random() * 2500 - 1250,Math.random() * 2500 - 1250,Math.random() * 2500 - 1250);
          object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
          object.scale.set(sizeage16/2, sizeage16/2,sizeage16/2);
          object.layers.set( layer );
          scene.add( object );


      });
      }

      for ( var i = 0; i < len1917.length; i ++ ) {

        var sizeage17 = len1917[i][2];

        loader.load( './static/PoppyHead.glb', function ( gltf ) {

          var object = gltf.scene;
          object.position.set(Math.random() * 3000 - 1500, Math.random() * 3000 - 1500, Math.random() * 3000 - 1500);
          object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
          object.scale.set(sizeage17/2, sizeage17/2,sizeage17/2);
          object.layers.set( layer );
          scene.add( object );


      });
      }


      for ( var i = 0; i < len1918.length; i ++ ) {

          var sizeage18 = len1918[i][2]; //this can't get two i dont know why
          var layer = 4;

          loader.load( './static/PoppyHead.glb', function ( gltf ) {

            var object = gltf.scene; // scale here
            object.position.set(Math.random() * 3940 - 1920,Math.random() * 3940 - 1920,Math.random() * 3940 - 1920);
            object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
            object.scale.set(sizeage18/2, sizeage18/2,sizeage18/2);
            object.layers.set( layer );
            scene.add( object );



        });
      }


// NZ soldiers that are not in the database

//1914 = 14 killed - existing 1914 above
      for ( var i = 0; i < 2; i ++ ) {


          var layer = 1;

          loader.load( './static/PoppyHead.glb', function ( gltf ) {

            var object = gltf.scene; // scale here
            object.position.set(Math.random() * 1800 - 900,Math.random() * 1900 - 900,Math.random() * 1800 - 900);
            object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
            object.scale.set( Math.random(16,47)/2,Math.random(16,47)/2, Math.random(16,47)/2 );
            object.layers.set( layer );
            scene.add( object );

        });
      }
// 1915 total of 2876 - 1915 above
      for ( var i = 0; i < 2800; i ++ ) {


          var layer = 1;

          loader.load( './static/PoppyHead.glb', function ( gltf ) {

            var object = gltf.scene; // scale here
            object.position.set(Math.random() * 1800 - 900,Math.random() * 1900 - 900,Math.random() * 1800 - 900);
            object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
            object.scale.set( Math.random(16,47)/2,Math.random(16,47)/2, Math.random(16,47)/2 );
            object.layers.set( layer );
            scene.add( object );

        });
      }

//1916 somme offensive =  3552 dead -  above
      for ( var i = 0; i < 3376; i ++ ) {

          var layer = 2;

          loader.load( './static/PoppyHead.glb', function ( gltf ) {

            var object = gltf.scene; // scale here
            object.position.set(Math.random() * 2500 - 1250,Math.random() * 2500 - 1250,Math.random() * 2500 - 1250);
            object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
            object.scale.set( Math.random(16,47)/2,Math.random(16,47)/2, Math.random(16,47)/2 );
            object.layers.set( layer );
            scene.add( object );

        });
      }

//1917 total of 5535 killed - above
      for ( var i = 0; i < 5386; i ++ ) {

    var layer = 3;

    loader.load( './static/PoppyHead.glb', function ( gltf ) {

      var object = gltf.scene; // scale here
      object.position.set(Math.random() * 3000 - 1500, Math.random() * 3000 - 1500, Math.random() * 3000 - 1500);
      object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
      object.scale.set( Math.random(16,47)/2,Math.random(16,47)/2, Math.random(16,47)/2 );
      object.layers.set( layer );
      scene.add( object );

  });
}

//1918 total pf 5478 - above
      for ( var i = 0; i < 4677; i ++ ) {

var layer = 4;

loader.load( './static/PoppyHead.glb', function ( gltf ) {

var object = gltf.scene; // scale here
object.position.set(Math.random() * 3940 - 1920,Math.random() * 3940 - 1920,Math.random() * 3940 - 1920);
object.rotation.set(Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI,Math.random() * 2 * Math.PI);
object.scale.set( Math.random(16,47)/2,Math.random(16,47)/2, Math.random(16,47)/2 );
object.layers.set( layer );
scene.add( object );

});
}





      renderer.setPixelRatio( window.devicePixelRatio);
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
    //  container.appendChild( stats.dom );

      //window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function render() {
        renderer.render( scene, camera );
    }


    //
    function animate() {
          requestAnimationFrame( animate );
      controls.update();

      render();
    }

    function sort1914() {
      camera.layers.enable( 0 );
      camera.layers.disable( 1);
      camera.layers.disable( 2);
      camera.layers.disable( 3);
      camera.layers.disable( 4);
    }
    function sort1915() {
      camera.layers.enable( 1 );
      camera.layers.disable( 0);
      camera.layers.disable( 2);
      camera.layers.disable( 3);
      camera.layers.disable( 4);
    }
    function sort1916() {
      camera.layers.enable( 2 );
      camera.layers.disable( 1);
      camera.layers.disable( 0);
      camera.layers.disable( 3);
      camera.layers.disable( 4);
    }
    function sort1917() {
      camera.layers.enable( 3 );
      camera.layers.disable( 1);
      camera.layers.disable( 2);
      camera.layers.disable( 0);
      camera.layers.disable( 4);
    }
    function sort1918() {
      camera.layers.enable( 4 );
      camera.layers.disable( 1);
      camera.layers.disable( 2);
      camera.layers.disable( 3);
      camera.layers.disable( 0);
    }

    document.getElementByClass('sort1914').addEventListener('click', function orginise1914(){
      sort1914();
    });
    document.getElementByClass('sort1915').addEventListener('click', function orginise1915(){
      sort1915();
    });
    document.getElementByClass('sort1916').addEventListener('click', function orginise1916(){
      sort1916();
    });
    document.getElementByClass('sort1917').addEventListener('click', function orginise1917(){
      sort1917();
    });
    document.getElementByClass('sort1918').addEventListener('click', function orginise1918(){
      sort1918();
    });





//for showing data, make three seperate renders of three.js and then call each one depending on true or false of class
