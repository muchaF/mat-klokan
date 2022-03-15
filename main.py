import random
from flask import Flask, render_template, redirect, request, session
import json, database

userData = database.database("config.json")
users = json.load(open("database/users.json"))

server = Flask("Mat Klokan")
server.secret_key = 'jf_73j_CER'
server.config['JSON_AS_ASCII'] = False

@server.route("/")
def home():
     return redirect("/login")

@server.route("/login")
def login():
     return render_template("login.html")

@server.route("/dashboard/<user>")
def dashboad(user):
     if ("user" in session and session["user"] == user):
          return render_template("user.html")
     else:
          return redirect("/login")

@server.route("/API/login",methods= ["POST"])
def userValidation():
     requestData = request.form
     print(request.args)
     if (requestData["login"] in users):
          if (requestData["password"] == users[requestData["login"]]["password"]):
               session["user"] = requestData["login"]
               session.permanent = True
               # server.permanent_session_lifetime = timedelta(seconds=1)
               return redirect("/dashboard/" + requestData["login"])
     return redirect("/login")

@server.route("/API/sync",methods= ["POST","GET"])
def sync():
     if(request.method == "POST"):
     
          data = request.get_json()
          print(session["user"])
          print("> posted data")
          print(json.dumps(data,indent=4))
     
     print(request)
     if(request.method == "GET"):
          args = request.args
          print(args.to_dict())
          data = {
               "category":args["table"],
               "best":{
                    "0":{
                         "name":"Petr",
                         "surename":"Peroutka",
                         "birthday":"21.2.2003",
                         "class":"septima"                    
                    }
               },
               "table":{

               },
          }
          for x in range(int(args['length'])):
               data["table"][x] = random.randint(0,150)
          
          return data, 200
     return "OK ulozeno",200

if __name__ == "__main__":
     server.run(host='localhost',port=2000,debug=True)