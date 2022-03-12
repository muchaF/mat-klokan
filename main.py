from datetime import timedelta
from logging import debug
from tkinter.messagebox import NO
from flask import Flask, render_template, redirect, request, session, jsonify, Response
import json, database

userData = database.database("config.json")
users = json.load(open("database/users.json"))

server = Flask("Mat Klokan")
server.secret_key = 'jf_73j_CER'

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
               server.permanent_session_lifetime = timedelta(seconds=1)
               return redirect("/dashboard/" + requestData["login"])
     return redirect("/login")

@server.route("/API/sync",methods= ["POST"])
def sync():
     data = request.get_json()
     print(data)

     return "OK ulozeno",200

if __name__ == "__main__":
     server.run(host='localhost',port=2000,debug=True)