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
var camera, scene, renderer;
var geometry, material, mesh;



init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(  70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 20, 20, 20 );
    material = new THREE.MeshNormalMaterial();

for ( var i = 0; i < 100; i ++ ) {
    mesh = new THREE.Mesh( geometry, material );

          var soldiersAge = allSoldiers[i[2]];

					mesh.position.x = Math.random() * 600 - 400;
					mesh.position.y = Math.random() * 600 - 400;
					mesh.position.z = Math.random() * 600 - 400;
					mesh.rotation.x = Math.random() * 2 * Math.PI;
					mesh.rotation.y = Math.random() * 2 * Math.PI;
					mesh.rotation.z = Math.random() * 2 * Math.PI;
					mesh.scale.x = Math.random() + soldiersAge;
					mesh.scale.y = Math.random() + soldiersAge;
					mesh.scale.z = Math.random() + soldiersAge;

          scene.add(mesh);
}

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

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

//console.log(allSoldiers)
//console.log(soldiers1914)
