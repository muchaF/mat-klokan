# Matematický klokan
webová stránka pro jednoduché zadávání a vyhodnocování výsledků matematického klokana

# Roadmap
Vlastnosti projektu které bychom chtěly ve verzi 0.1
- příjemné uživatelské rozhraní
- ukládání výsledků na serveru 
- vyhodnocování výsledků
- export výsledků do .xlsx

# API
'''json
data = {
    "category":args["table"],
    "best":{
        "0":{
                "name":"jmeno",
                "surname":"prijmeni",
                "birthday":"datum narozeni ve formatu yyyy-mm-dd",
                "class":"trida",
                "score": "skore zaka"                
        }
    },
    "table":{},
}
'''

# Použíté knihovny
- [Flask](https://github.com/pallets/flask) - lightweight WSGI web application framework
- [Flask-login](https://github.com/maxcountryman/flask-login) - Flask-Login provides user session management for Flask