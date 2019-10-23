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

    console.log(soldiers1918)
    console.log(soldiers1914.length)
    console.log(soldiers1916.length)
    console.log(soldiers1917.length)
    console.log(soldiers1918.length)
    console.log(allSoldiers.length)

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
    import Stats from './jsm/libs/stats.module.js';
    import { GUI } from './jsm/libs/dat.gui.module.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

    var container, stats;
    var camera, scene, renderer;
    var radius = 100, theta = 0;

    //init();
    animate();

    function init(
        all,
        len1914,
        len1915,
        len1916,
        len1917,
        len1918) {

      container = document.getElementById( 'soldiers' );

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.layers.enable( 0 ); // enabled by default
      camera.layers.enable( 1 );
      camera.layers.enable( 2 );
      camera.layers.enable( 3 );
      camera.layers.enable( 4 );
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x151010 );
      var light = new THREE.PointLight( 0xffffff, 2 );
      light.layers.enable( 0 );
      light.layers.enable( 1 );
      light.layers.enable( 2 );
      light.layers.enable( 3 );
      light.layers.enable( 4 );
      scene.add( camera );
      camera.add( light );

      var loader = new GLTFLoader();

      loader.load( './static/PoppyHead.glb', function ( gltf ) {

        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            //  child.geometry.center(); // center here
            }
          });

        gltf.scene.scale.set(20,20,20); // scale here
      	scene.add( gltf.scene );


      }, undefined, function ( error ) {

      	console.error( error );

      } );


      var colors = [ 0xff0000, 0xff1000, 0xDD0000, 0xEE0000, 0xBF0000 ];
      var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
      var layer;


      for ( var i = 0; i < len1914.length; i ++ ) {
        layer = 0;
        var sizeage14 = len1914[i][2];
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[ layer ] } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = sizeage14/20;
        object.scale.y = sizeage14/20;
        object.scale.z = sizeage14/20;
        object.layers.set( layer );
        scene.add( object );
      }

      for ( var i = 0; i < len1915.length; i ++ ) {
        layer = 1;
        var sizeage15 = len1915[i][2];
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[ layer ] } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = sizeage15;
        object.scale.y = sizeage15;
        object.scale.z = sizeage15;
        object.layers.set( layer );
        scene.add( object );
      }

      for ( var i = 0; i < len1916.length; i ++ ) {
        layer = 2;
        var sizeage16 = len1916[i][2];
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[ layer ] } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = sizeage16;
        object.scale.y = sizeage16;
        object.scale.z = sizeage16;
        object.layers.set( layer );
        scene.add( object );
      }

      for ( var i = 0; i < len1917.length; i ++ ) {
        layer = 3;
        var sizeage17 = len1917[i][2];
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[ layer ] } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = sizeage17;
        object.scale.y = sizeage17;
        object.scale.z = sizeage17;
        object.layers.set( layer );
        scene.add( object );
      }

      for ( var i = 0; i < len1918.length; i ++ ) {
        var sizeage18 = len1918[i][2];
        layer = 4;
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[ layer ] } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = sizeage18;
        object.scale.y = sizeage18;
        object.scale.z = sizeage18;
        object.layers.set( layer );
        scene.add( object );
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      stats = new Stats();
      container.appendChild( stats.dom );

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
      //window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    //
    function animate() {
      requestAnimationFrame( animate );
      render();
      stats.update();
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

    function render() {
      theta += 0.1;
      camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
      camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
      camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }
