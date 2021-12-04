import json
from os import path, write

STRUCTURE = "database/structure.json"
class database():
    def __init__(self,config) -> None:
        self.config = json.load(open(config))
        self.path = self.config["path"]
        self.files = self.config["files"]

    def write(self,name,data=None):
        file = open(self.path + name + '.json',"w")

database = database("config.json")
database.write("zstgm")
