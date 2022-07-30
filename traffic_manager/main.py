#app imports


import json
import math
import random

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL 


#app config
app=Flask(__name__)

#DB config 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'database'
  
  #SAMPLE MYSQL QUERY SNIPPET
#    cursor = mysql.connection.cursor()
        # cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''',(name,age))
        # mysql.connection.commit()

mysql = MySQL(app)

#API endpoints
@app.route('/')
def index():
    return jsonify('hello world')
  
@app.route('/hello')
def hello():
   name= request.get_json()
   data=name.get('name')
   return jsonify(data),200



@app.route('/offences/new')

@app.route('/offences/new',methods=["POST"])

def offIns():
    data=request.get_json()
    dlno=data.get('dlno')
    name=data.get('name')
    location=data.get('location')
    Type=data.get('type')
    fine=data.get('fine')
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO offences VALUES(%s,%s,%s,%s,%s)''',(dlno,name,location,Type,fine))
    mysql.connection.commit()
    return jsonify("success"), 200

@app.route('/offences/insert/<id>/<type>/<fine>')
def insPar(id, type, fine):
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO offences VALUES(%s,%s,%s)''',(id, type, fine))
    mysql.connection.commit()
    return jsonify("Inserted!")

@app.route('/offences/all', methods=['GET'])
def offences():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM offences''')
    details = cursor.fetchall()
    return jsonify(details),200
    

@app.route('/offences/del/<id>')
def offDel(id):
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM offences WHERE offenceid=%s''',(id))
    mysql.connection.commit()
    return jsonify("Deleted!")

@app.route('/all',methods=["GET"])
def all():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM demotable''')
    details = cursor.fetchall()
    cursor.close()
    
    
        
    
    return jsonify(details)
  



#app run config
app.run(host='localhost', port= 5000)
