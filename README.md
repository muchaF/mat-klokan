# Organizace soutěže matematický klokan - 9B
webová stránka pro jednoduché zadávání a vyhodnocování výsledků soutěže matematický klokana

## Složení týmu
Petr Šebela - frontend/backend programátor

Filip Mucha - backend programátor

Filip Nyahay - grafik a designer

# Roadmap
Vlastnosti projektu které bychom chtěli ve verzi 0.1
- příjemné uživatelské rozhraní
- ukládání výsledků na serveru 
- vyhodnocení a export výsledků do .xlsx v požadováném formátu

# Design
## Login page
- jednodchá, čistá a bez rušivých prvků
![login](https://cdn.discordapp.com/attachments/687780138359848963/988784224452636732/unknown.png)

## User interface
- intuitivní a jednoduché na používání

![UI](https://cdn.discordapp.com/attachments/687780138359848963/988816636029050881/unknown.png)

## Barvy
Vybraly jsme kombinaci odstínů bílé a světle zelené
### Proč tyto barvy?
- __Odstíny bíle__ - působí čistě a přesně
- __Světle zelená__ - uklidňující a spojená s matematikou jako barva jejích sešitů

# API dokumentace
## Endpoints
- __/API/login [POST]__
    - slouží k autentizaci a autorizaci uživatele
    - přesměruje na /dashboard

- __/API/logout [POST, GET]__
    - POST / GET - je jedno jaka metoda se pouzije (jsou definovany kvuli kompatibilite)
    - odhlasi aktualne prislaseneho uzivatele a opsle redirect na prihlasovani stranku
- __/API/sync [POST, GET]__
    - POST - nahravani dat na server
    - GET - ziskani dat ze serveru
- __/API/export__ - chranena permisemi uzivatele
- __/API/full_export__ - chranena permisemi uzivatela

## Format dat posilany pres API
json formát byl zvolek kvůly jeho skvělé implementaci a spolupráci s JavaScriptem
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

do projektu bude pozdeji přidána možnost automatické instalace knihoven
