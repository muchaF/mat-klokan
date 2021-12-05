from logging import debug
from flask import Flask, render_template, redirect, request, session, jsonify, Response
import json, database

# Database variables
userData = database.database("config.json")
users = json.load(open("database/users.json"))

# Webserver variables
server = Flask("Mat Klokan")
server.secret_key = 'jf_73j_CER'

@server.route("/")
def home():
     return redirect("/login")

@server.route("/login")
@server.route("/login/<state>")
def login(state=""):
     return render_template("login.html", state = state)

@server.route("/dashboard/<user>")
def dashboad(user):
     if ("user" in session and session["user"] == user):
          if (users[user]["type"] == "admin"):
               return render_template("dashboardAdmin.html",user = "admin")
          else:
               return render_template("dashboardUser.html",user = users[user]["school"])
     else:
          return redirect("/login")

# API - login, database updata, database loading
@server.route("/userValidation",methods= ["POST"])
def userValidation():
     login = request.form["login"]
     password = request.form["password"]
     if (login in users):
          if (password == users[login]["password"]):
               session["user"] = login
               return redirect("/dashboard/"+login)
     return redirect("/login/fail")

#saving data from server
@server.route("/submit",methods=['POST'])
def submit():
     if ("user" in session):
          data = {}
          for key in request.form.keys():
               data[key] = request.form[key]
          userData.write(session["user"],data)
     return Response(status=200)

# send data to server
@server.route("/getForm",methods=["GET"])
def getForm():
     if ("user" in session):
          return userData.get(session["user"]),200
     return Response(status=404)
     

if __name__ == "__main__":
     server.run(host='localhost',port=2000,debug=True)