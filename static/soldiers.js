


window.onresize = function(event) {

};


// Three JS


var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

if (window.innerWidth > 800) {
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.needsUpdate = true;
//renderer.toneMapping = THREE.ReinhardToneMapping;
//console.log(window.innerWidth);
};
//---

  document.body.appendChild( renderer.domElement );




  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  };

  var setcolor = 0x000000;
//var setcolor = 0xF2F111;
//var setcolor = 0xFF6347;



  var canvas = document.getElementById('soldiers');

  var scene = new THREE.Scene(canvas);
  var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 2000 );

  scene.background = new THREE.Color(setcolor);
  //scene.fog = new THREE.Fog(setcolor, 10, 16);
  scene.fog = new THREE.FogExp2(setcolor, 0.05);

  document.body.appendChild( renderer.domElement );

  scene.add( new THREE.AmbientLight( 0xFFDDDD, 0.8 ) );
  var light = new THREE.DirectionalLight( 0xDD0000, 0.35 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );


//  for (i = 0; i < allSoldiers; i ++){
  //placehere}


  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xf3f3f3 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  //var cube = new THREE.Mesh( geometry, material );



  for (i = 0; i < 100; i ++)
{
  var cube = new THREE.Mesh( geometry, material, ( { color: Math.random() * 0xff2222 } ) );
					cube.position.x = Math.random() * 800 - 400;
					cube.position.y = Math.random() * 800 - 400;
					cube.position.z = Math.random() * 800 - 400;
					cube.rotation.x = Math.random() * 2 * Math.PI;
					cube.rotation.y = Math.random() * 2 * Math.PI;
					cube.rotation.z = Math.random() * 2 * Math.PI;
					cube.scale.x = Math.random() + 0.5;
					cube.scale.y = Math.random() + 0.5;
					cube.scale.z = Math.random() + 0.5;
					scene.add( cube );
}

  camera.position.z = 6;

  var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };



  animate();



  var req = new XMLHttpRequest(); // Makes AJAX Possible
  req.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var json = JSON.parse(req.responseText);
      console.log(json);

      for (var i = 0; i<json.length; i++){
          scene.add(cube);
      } //good for generating-stuff
    }
    else {
      console.log(this.readyState, this.status)//handling errors
    }
  }
