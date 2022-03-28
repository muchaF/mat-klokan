from re import L
import sqlite3
import json


def connect(database_path):
    def decorator(func):
        def wrapper(*args, **kwargs):
            con = sqlite3.connect(database_path)
            cur = con.cursor()
            
            output = func(cursor=cur, *args, **kwargs)
            
            con.commit()

            return output

        return wrapper
    return decorator


db_path = "data_test.sqlite3"


@connect(database_path=db_path)
def userValiadtion(cursor, email, password):
    r = cursor.execute(f"SELECT id, password, school FROM user WHERE email='{email}';")
    r = r.fetchall()
    if len(r) == 0:
        # email neni v databazi
        return False, {"email" : 1, "password" : 0}
    else:
        user_id = r[0][0]
        user_pwd = r[0][1]
        school = r[0][2]
        if password == user_pwd:
            # uspesne prihlaseni
            return True, {"id" : user_id, "school" : school}
        else:
            # hesla se neshoduji
            return False, {"email" : 0, "password" : 1}


@connect(db_path)
def addUser(cursor, email, password, school):
    cursor.execute(
        f"INSERT INTO user (email, password, school) VALUES ('{email}','{password}', '{school}')")

@connect(db_path)
def getScore(cursor, user_id, categories):
    data = {}
    for category in categories:
        category_data = {}
        r = cursor.execute(f"SELECT * FROM {category}Score WHERE id={user_id};")
        keys = [i[0] for i in r.description[1:]]
        r = r.fetchall()
        if len(r) == 0:
            for key in keys:
                category_data[key] = 0
        else:
            r = r[0][1:]
            for i, key in enumerate(keys):
                category_data[key] = r[i]
        data[category] = category_data

    if len(categories) == 1:
        data = data[list(data.keys())[0]]

    return data


@connect(db_path)
def getBest(cursor, user_id, categories):
    data = {}

    for category in categories:
        data_category = {}
        r = cursor.execute(
            f"SELECT name, surname, birthdate, grade, score \
                FROM {category}Best WHERE id={user_id};")
        r = r.fetchall()
        for i, row in enumerate(r):
            data_category[f"{i+1}"] = {
                "name" : row[0],
                "surname" : row[1],
                "date" : row[2],
                "grade" : row[3],
                "score" : row[4]            
            }
        data[category] = data_category

    if len(categories) == 1:
        data = data[list(data.keys())[0]]

    return data


@connect(db_path)
def setScore(cursor, user_id, category, data):
    r = cursor.execute(f"SELECT * FROM {category}Score WHERE id={user_id};")
    columns = [r.description[i][0] for i in range(len(r.description))][1:]

    exists = bool(len(r.fetchall()))
    if not exists:
        cursor.execute(f"INSERT INTO {category}Score ('id') VALUES ({user_id});")

    for key in [i for i in data.keys()]:
        if not key in columns:
            data.pop(key)

    keys = data.keys()
    values = data.values()

    set_string = ", ".join(
        f"'{key}' = {value}" for key, value in zip(keys, values))
    update_score = f"UPDATE {category}Score SET {set_string} WHERE id={user_id};"
    
    cursor.execute(update_score)

@connect(db_path)
def setBest(cursor, user_id, category, data):
    cursor.execute(f"DELETE FROM {category}Best WHERE id={user_id};")
    for student in data.values():
        try:
            name = student["name"]
            surname = student["surname"]
            birthdate = student["date"]
            score = student["score"]
            grade = student["grade"]
            cursor.execute(
    f"INSERT INTO {category}Best ('id', 'name', 'surname', 'birthdate', 'score', 'grade') \
    VALUES ({user_id}, '{name}', '{surname}', '{birthdate}', {score}, '{grade}');")
        except KeyError:
            pass

# ------------------------------------------------------------------------------------------------

@connect(db_path)
def updateDb(cursor, json_file):
    cursor.execute(f"")


@connect(db_path)
def addRow(cursor, user_id):
    cursor.execute(f"INSERT INTO cvrcekScore ('id') VALUES ({user_id})")


@connect(db_path)
def test(cursor):
    r = cursor.execute(f"SELECT * FROM cvrcekScore WHERE id=0;")
    print(len(r.fetchall()))


@connect(db_path)
def removeScoreRow(cursor):
    cursor.execute(f"DELETE FROM cvrcekScore WHERE id=0;")

@connect(db_path)
def addBest(cursor, user_id, name, surname, birthdate, score, grade):
    r = cursor.execute(f"INSERT INTO cvrcekBest \
('id', 'name', 'surname', 'birthdate', 'score', 'grade') \
VALUES ({user_id}, '{name}', '{surname}', '{birthdate}', {score}, '{grade}');")