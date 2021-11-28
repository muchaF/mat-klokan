from logging import debug
from flask import Flask, render_template, redirect, request

server = Flask("Mat Klokan")

@server.route("/")
def home():
     return redirect("/login/")

@server.route("/login")
@server.route("/login/<state>")
def login(state=""):
     print(state)
     return render_template("login.html", state = state)

@server.route("/dashboard/<user>")
def dashboad(user):
     return render_template("dashboard.html",user = user)

""" API """

@server.route("/userValidation",methods= ["POST"])
def userValidation():
     # print("$ validation")
     login = request.form["login"]
     password = request.form["password"]
     # print("$ user: {} \n$ password: {}".format(login,password))
     if (login and password != ""):
          return redirect("/dashboard/"+login)

     return redirect("/login/fail")


if __name__ == "__main__":
     server.run(host='localhost',port=727,debug=True)
