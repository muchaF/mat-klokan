from logging import debug
from flask import Flask, render_template, redirect, request, session, jsonify
import json

users = {
     "admin":"WYSI",
     "ZSTGM":"123"
}

server = Flask("Mat Klokan")
server.secret_key = 'jf_73j_CER'

userData = json.load(open("database/userData/test.json"))


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
          return render_template("dashboard.html",user = user)
     else: return redirect("/login")

""" API - login, database updata, database loading"""
@server.route("/userValidation",methods= ["POST"])
def userValidation():
     login = request.form["login"]
     password = request.form["password"]
     if (login in users):
          if (password == users[login]):
               session["user"] = login
               return redirect("/dashboard/"+login)
     return redirect("/login/fail")

@server.route("/submit",methods=['POST'])
def submit():
     if (session["user"] in userData):
          userData[session["user"]] = request.form.to_dict(flat=False)
          with open('database/userData/test.json', 'w') as outfile:
               json.dump(userData, outfile,indent=2)
     return "OK"

@server.route("/getForm",methods=["GET"])
def getForm():
     if (session["user"] in userData):
          return (jsonify(userData[session["user"]]),200)
     return "NOT OK"
     

if __name__ == "__main__":
     server.run(host='localhost',port=2000,debug=True)