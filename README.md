# Matematický klokan
webová stránka pro jednoduché zadávání a vyhodnocování výsledků matematického klokana

# Roadmap
Vlastnosti projektu které bychom chtěly ve verzi 0.1
- příjemné uživatelské rozhraní
- ukládání výsledků na serveru 
- vyhodnocování výsledků
- export výsledků do .xlsx

# API

template pro json
```json
{
    "category":"Cvrček",
    "best":{
        "0":{
                "name":"Marek",
                "surname":"Polívka",
                "birthday":"2003-09-24",
                "class":"V2B",
                "score": "102"                
        }
    },
    "table":{
        "0":"12",
    },
}
```

# Použíté knihovny
- [Flask](https://github.com/pallets/flask) - lightweight WSGI web application framework
- [Flask-login](https://github.com/maxcountryman/flask-login) - Flask-Login provides user session management for Flask
