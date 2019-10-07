from flask import Flask, render_template, request, json
import sqlite3
SOLDIERSDB = 'soldiers.json'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/soldiers', methods=['GET'])
def soldiers_list():
#    return jsonify('score')
    con = connect.json(SOLDIERSDB)
    soldiers = []
    cur = con.execute('SELECT * FROM soldiers ORDER BY score desc')

    for row in cur:
        soldiers.append( list(row) )

    con.close()

    return soldiers
