from flask import Flask, render_template, request, jsonify
import sqlite3
import json



app = Flask(__name__)

@app.route('/')
def index():
#   return render_template('indexALLsoldiers.html') #all dead soldiers
    return render_template('indexperformance.html') #soldiers from memorial DB with age
#   return render_template('indexsorting.html') #having the sorting function work but no poppies
