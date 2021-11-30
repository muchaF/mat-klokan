from logging import debug
from flask import Flask, render_template, redirect, request, session, jsonify

admin = {
     "password":"WYSI",
     "username":"admin"
}

server = Flask("Mat Klokan")
server.secret_key = 'jf_73j_CER'

@server.route("/")
def home():
     return redirect("/login")

@server.route("/login")
@server.route("/login/<state>")
def login(state=""):
     print(state)
     return render_template("login.html", state = state)

@server.route("/dashboard/<user>")
def dashboad(user):
     if ("user" in session and session["user"] == user):
          return render_template("dashboard.html",user = user)
     return redirect("/login")

""" API - login"""
@server.route("/userValidation",methods= ["POST"])
def userValidation():
     login = request.form["login"]
     password = request.form["password"]

     if (password == admin["password"] and login == admin["username"]):
          session["user"] = login
          return redirect("/dashboard/"+login)
     return redirect("/login/fail")

@server.route("/submit",methods=['POST'])
def submit():
     # print(request.form)
     for each in request.form:
          print(each + ". " +request.form[each])
     return "OK"

@server.route("/getForm",methods=["GET"])
def getForm():
     return (jsonify({"name":"Aarush"}),200)

if __name__ == "__main__":
     server.run(host='localhost',port=2000,debug=True)