from flask import Flask, render_template, request, jsonify
import sqlite3
import json

soldiersDB = 'soldiers.db'
request = json.load(open('soldiers.json'))

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/soldiers', methods=['POST'])
def soldiers_list():


    con = sqlite3.connect(soldiersSDB)
    soldiersreq = request.get_json()

    soldierFN = request_json.get("forename")
    soldierLN = request_json.get("surname")

    soldierV1 = string(soldierFN + soldierLN)
    soldierV2 = request_json.get("age_text")
    soldierV3 = request_json.get("date_of_death")
    soldierV4 = request_json.get("rank")
    soldierV5 = request_json.get("regiment")
    soldierV6 = request_json.get("additionalinformation")

    for row in soldiersreq:
        cur = con.execute("INSERT INTO soldiers(name,age,date_of_death,rank,regiment,additional_information) VALUES (%s,%i,%s,%s,%s,%s)", (soldierV1,soldierV2,soldierV3,soldierV4,soldierV5,soldierV6))
        con.commit()



    con.close
    return jsonify(soldiers)
