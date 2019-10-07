

var req = new XMLHttpRequest(); // Makes AJAX Possible
req.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    var json = JSON.parse(req.responseText);
    console.log(json[0].age_text); //replace 0 with i and use array length for loop
  }
  else {
    console.log(this.readyState, this.status)//handling errors
  }
}
req.open('GET', 'static/soldiers.json', true);
req.send();


window.onresize = function(event) {
  
};


// Three JS


  var canvas = document.getElementById('soldiers');

  var scene = new THREE.Scene(canvas);
  scene.background = new THREE.Color( 0xEA0A0A );
  var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 2000 );


  var renderer = new THREE.WebGLRenderer(canvas);
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  scene.add( new THREE.AmbientLight( 0xFF0000, 0.9 ) );
  var light = new THREE.DirectionalLight( 0xDD0000, 0.35 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 6;

  var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  animate();
