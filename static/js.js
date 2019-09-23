// variables

var colors = [
  '#D00',
  '#DD0',
  '#0DD',
  '#22D',
  '#D0D'
];

var scores = [
 /* ['TAB','1991-03-03','12345'] */
];

var topscore = 13000;

// insert entry

function insertEntry(entry) {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';

  for (var i=0; i < scores.length; i++) {
    color = colors[i%colors.length];

    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = scores[i][2] / topscore * 100 + '%';
    bar.style.backgroundColor = color;
    document.getElementById('chart').appendChild(bar);

    var row = document.createElement('tr');
    row.style.color = color;
    row.innerHTML += '<td>' + scores[i][0] + '</td>';
    row.innerHTML += '<td>' + scores[i][1] + '</td>';
    row.innerHTML += '<td>' + scores[i][2] + '</td>';
    document.getElementById('highscores').appendChild(row);
  }
}

// submit button

document.querySelector('#addscore a').addEventListener('click', function() {
  var entry = [
   document.getElementById('name').value,
   document.getElementById('date').value,
   document.getElementById('score').value
  ];

  document.querySelector('#addscore .alert').innerHTML = '';

  if (entry[0] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER NAME!';
  }
  else if (entry[1].search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == -1) {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER DATE!';
  }
  else if (entry[2].search(/^[0-9]*$/) < 0 || entry[2] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER SCORE!';
  }
  else {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
            insertEntry(entry);
      }

      else {
          console.log(this.readyState, this.status)//handling errors
      }
    }
    req.open('POST', 'scores', true);
    req.setRequestHeader('Content-type','application/json');
    body = JSON.stringify(entry);
    req.send(body);
  }
});

//load scores

var req = new XMLHttpRequest(); // Makes AJAX Possible
req.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    var json = JSON.parse(req.responseText);
    console.log(json);

    for (var i = 0; i<json.length; i++){
      insertEntry([
        json[i][1],
        json[i][2],
        json[i][3],
      ])
    } //good for generating-stuff
  }
  else {
    console.log(this.readyState, this.status)//handling errors
  }
}

req.open('GET', '/scores', true);
req.send();
