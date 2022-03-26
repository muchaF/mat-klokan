from flask import Flask, render_template, redirect, request, send_file, session
import json, random
from datetime import datetime
import pprint
from export import file

users = {"admin": {"password": "wysi"}}

server = Flask("Mat Klokan")
server.secret_key = "jf_73j_CER"
server.config["JSON_AS_ASCII"] = False


@server.route("/admin")
def admin():
    return render_template("admin.html")


@server.route("/API/export/<type>")
def export(type):
    exportFile = file(json.loads(session["result"]), session["user"])
    return send_file(str(exportFile), as_attachment=True)


@server.route("/")
def home():
    return redirect("/login")


@server.route("/login")
@server.route("/login/<state>")
def login(state=""):
    email, password = "", ""
    args = state.split("-")
    if "email" in args:
        email = "Špatný email"
    if "password" in args:
        password = "Špatné heslo"
    return render_template("login.html", email=email, password=password)


@server.route("/dashboard/<user>")
def dashboad(user):
    if "user" in session and session["user"] == user:
        return render_template("user.html", name="bim", email="bam@bum.com")
    else:
        return redirect("/login")


@server.route("/API/login", methods=["POST"])
def userValidation():
    requestData = request.form
    if (
        requestData["login"] in users
        and requestData["password"] == users[requestData["login"]]["password"]
    ):
        session["user"] = requestData["login"]
        session.permanent = True
        return redirect("/dashboard/" + requestData["login"])
    return redirect("/login/password-email")


@server.route("/API/sync", methods=["POST", "GET"])
def sync():
    print("\33[33m" + "# API call" + "\033[0m")
    print("| time: " + str(datetime.now()))
    print("| user: " + session["user"])
    print("| type: " + request.method)

    if request.method == "POST":
        data = request.get_json()
        structure = {}
        structure[data["category"]] = data

        structure[data["category"]]["school"] = session["user"]
        structure[data["category"]]["adress"] = "adresa 72727"

        session["result"] = json.dumps(structure)
        with open("export.json", "w+") as file:
            json.dump(data, file)
        print("| data content: json")
        print("| category: " + data["category"])
        pprint.pprint(data)

    if request.method == "GET":
        args = request.args
        print("| args: " + str(args.to_dict()))
        data = {
            "category": args["table"],
            "best": {
                "0": {
                    "name": "Petr",
                    "surname": "Peroutka",
                    "date": "2003-02-13",
                    "grade": "septima",
                    "score": random.randint(0, 120),
                },
                "1": {
                    "name": "Marek",
                    "surname": "Peroutka",
                    "date": "2003-02-13",
                    "grade": "septima",
                    "score": random.randint(0, 120),
                },
            },
            "table": {},
        }
        for x in range(121):
            data["table"][x] = random.randint(0, 150)

        return data, 200
    return "OK", 200


if __name__ == "__main__":
    server.run(host="localhost", port=2000, debug=True)
