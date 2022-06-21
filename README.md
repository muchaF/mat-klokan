# Matematický klokan
webová stránka pro jednoduché zadávání a vyhodnocování výsledků matematického klokana

Petr Šebela, Filip Mucha, Filip Nyahay

# Roadmap
Vlastnosti projektu které bychom chtěli ve verzi 0.1
- příjemné uživatelské rozhraní
- ukládání výsledků na serveru 
- vyhodnocování výsledků
- export výsledků do .xlsx

- lidi s top 3 bodama

# Design
## Login page
![login](https://cdn.discordapp.com/attachments/687780138359848963/988784224452636732/unknown.png)

## User interface
- intuitivní a jednoduché na používání

![UI](https://cdn.discordapp.com/attachments/687780138359848963/988816636029050881/unknown.png)


# API dokumentace
## Endpoints
- /API/login [POST]
    - slouží k autentizaci a autorizaci uživatele
    - přesměruje na /dashboard

- /API/logout [POST, GET]
    - POST / GET - je jedno jaka metoda se pouzije (jsou definovany kvuli kompatibilite)
    - odhlasi aktualne prislaseneho uzivatele a opsle redirect na prihlasovani stranku
- /API/sync [POST, GET]
    - POST - nahravani dat na server
    - GET - ziskani dat ze serveru
- /API/export
    - chranena permisemi uzivatele
- /API/full_export
    - chranena permisemi uzivatela

## Format dat posilany pres API
```json
{
    "category":"Cvrček",
    "best":{
        "0":{
                "name":"Marek",
                "surname":"Polívka",
                "birthday":"2003-09-24",
                "class":"V3B",
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
