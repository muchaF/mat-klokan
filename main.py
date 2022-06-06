from flask import *
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
import db_API
from export import userExport, finalExport
import hashlib

# text credentials
# export - x1fe2
# sklenar@gslapanice.cz - z8af2

server = Flask("mat klokan")

server.config["SECRET_KEY"] = "38gS4_hDd4bX_k"
server.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///session_db.sqlite3"
server.config["SESSION_TYPE"] = "sqlalchemy"

session_db = SQLAlchemy(server)
server.config["SESSION_SQLALCHEMY"] = session_db
sess = Session(server)

supportedBrowser = ["chrome", "firefox", "edge", "safari"]

all_categories = ["cvrcek", "benjamin", "junior", "kadet", "klokanek", "student"]


@server.before_request
def checkBrowser():
    browser = request.user_agent.browser
    if browser not in supportedBrowser:
        return render_template("support.html")


@server.route("/")
@server.route("/e<e_error>p<p_error>")
def login(e_error=0, p_error=0):
    if "permission" in session:
        return redirect("/dashboard")
    e_message = "zadny ucet s timto emailem" if e_error == "1" else ""
    p_message = "nespravne heslo" if p_error == "1" else ""
    return render_template("login.html", email=e_message, password=p_message)


@server.route("/dashboard")
def dashboard():
    if not "permission" in session:
        return redirect("/")
    if session["permission"] == 1:
        return render_template(
            "user.html", name=session["school"], email=session["email"]
        )
    elif session["permission"] == 2:
        return render_template("admin.html")
    else:
        return redirect("/")



@server.route("/API/login", methods=["POST", "GET"])
def API_login():
    if request.method == "GET":
        return redirect("/")
    elif request.method == "POST":
        form = request.form
        email = form["login"]
        password = form["password"]
        succes, output = db_API.userValiadtion(email=email, password=password)
        if succes:
            session["id"] = output["id"]
            session["school"] = output["school"]
            session["email"] = email
            session["permission"] = output["permission"]
            return redirect("/dashboard")
        else:
            return redirect(f"/e{output['email']}p{output['password']}")


@server.route("/API/logout", methods=["POST", "GET"])
def API_logout():
    session.pop("id")
    session.pop("school")
    session.pop("email")
    session.pop("permission")
    return redirect("/")


@server.route("/API/sync", methods=["GET"])
def API_load():
    if not "permission" in session:
        return redirect("/")
    args = request.args
    category = args["table"]
    data = {
        "category": category,
        "best": db_API.getBest(user_id=session["id"], categories=[category]),
        "table": db_API.getScore(user_id=session["id"], categories=[category]),
    }
    return data, 200


@server.route("/API/sync", methods=["POST"])
def API_upload():
    if not "permission" in session:
        return redirect("/")
    data = request.get_json()

    category = data["category"]

    db_API.setScore(user_id=session["id"], category=category, data=data["table"])
    db_API.setBest(user_id=session["id"], category=category, data=data["best"])

    return "OK", 200


@server.route("/API/export")
def API_export():
    if not "permission" in session:
        return redirect("/")
    data = {
        "address": "",
        "school": session["school"],
        "score": db_API.getScore(
            user_id=session["id"],
            categories=all_categories,
        ),
        "best": db_API.getBest(
            user_id=session["id"],
            categories=all_categories,
        ),
    }
    exportFile = userExport(data, session["school"])
    return send_file(str(exportFile), as_attachment=True)


@server.route("/API/full_export")
def API_full_export():
    if not "permission" in session:
        return redirect("/")
    data = {}
    for category in all_categories:
        data_range, score = db_API.scoreExport(category=category)
        data[f"{category}"] = {
            "range" : data_range,
            "score" : score,
            "best" : db_API.bestExport(category=category)
        }
    exportFile = finalExport(data)
    return send_file(str(exportFile), as_attachment=True)

@server.route("/admin")
def admin():
    if not "permission" in session:
        return redirect("/")
    return render_template("admin.html")


if __name__ == "__main__":
    server.run(host="localhost", port=5000, debug=True)
