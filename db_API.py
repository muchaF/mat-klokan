from re import L
import sqlite3
import json

from flask import template_rendered


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
    r = cursor.execute(f"SELECT id, password, school, permission FROM user WHERE email='{email}';")
    r = r.fetchall()
    if len(r) == 0:
        # email neni v databazi
        return False, {"email" : 1, "password" : 0}
    else:
        user_id = r[0][0]
        user_pwd = r[0][1]
        school = r[0][2]
        permission = r[0][3]
        if password == user_pwd:
            # uspesne prihlaseni
            return True, {"id" : user_id, "school" : school, "permission" : permission }
        else:
            # hesla se neshoduji
            return False, {"email" : 0, "password" : 1}


@connect(db_path)
def addUser(cursor, email, password, permission):
    cursor.execute(
        f"INSERT INTO user (email, password, permission) VALUES ('{email}','{password}', {permission})")

#addUser(email="export", password="x1fe2", permission="2")

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
def bestExport(cursor, category):
    data = []
    data_return = {}
    r = cursor.execute(f"SELECT * FROM {category}Best ORDER BY score")
    columns = [r.description[i][0] for i in range(len(r.description))]
    students = r.fetchall()
    for student in students:
        temp_student = {}
        for i, key in enumerate(columns):
            temp_student[key] = student[i]
        if temp_student["name"] != '' and temp_student["surname"] != '' and \
            temp_student["score"] != 0:
            if temp_student["birthdate"] != '':
                temp_student["year"], temp_student["month"], temp_student["day"] = temp_student["birthdate"].split("-")
            else:
                temp_student["year"], temp_student["month"], temp_student["day"] = 0, 0, 0
            data.append(temp_student)
    
    data = sorted(data, key=lambda x:(x["score"], int(x["year"]), int(x["month"]), int(x["day"])))
    data.reverse()

    for i, student in enumerate(data):
        student.pop("month")
        student.pop("day")
        student.pop("year")
        student_id = student.pop("id")
        address, school = cursor.execute(f"SELECT address, school FROM user WHERE id={student_id}").fetchall()[0]
        student["address"] = address if address != None else ''
        student["school"] = school if school != None else ''
        data_return[f"{i}"] = student

    return data_return


@connect(db_path)
def scoreExport(cursor, category):
    data = {}
    schools = cursor.execute(f"SELECT school FROM user").fetchall()
    for school in schools:
        data[f"{school[0]}"] = {}
    r = cursor.execute(f"SELECT * FROM {category}Score")
    columns = [r.description[i][0] for i in range(len(r.description))]
    for row in r.fetchall():
        temp_row = {}
        for key, value in zip(columns, row):
            if key == "id" or value != 0:
                temp_row[key] = value
        row_id = temp_row.pop("id")
        school = cursor.execute(f"SELECT school FROM user WHERE id={row_id}").fetchall()[0][0]
        data[school] = temp_row

    data_range = {"lowest" : columns[1], "biggest" : columns[-1]}

    return data_range, data


# x = bestExport(category="cvrcek")
# for key, value in zip(x.keys(), x.values()):
#     print(key, value)

# y, x = scoreExport(category="cvrcek")
# print(y)
# for key, value in zip(x.keys(), x.values()):
#     print(key, value)


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


