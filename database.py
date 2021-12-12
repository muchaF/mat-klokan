import json,time

STRUCTURE = "database/structure.json"
class database():
     def __init__(self,config) -> None:
          self.configFile = config
          self.config = json.load(open(config))
          self.path = self.config["path"]
          self.collection = self.config["collection"]

     def write(self,name,data=None):
          start = time.time()
          if not name in self.collection:
               with open(self.configFile,"w") as file:
                    self.config["collection"][name] = name + ".json"
                    file.seek(0)
                    json.dump(self.config,file,indent=5)
                    file.truncate()
                    print('\033[92m' + '#', name + ".json added to collection"+ '\033[0m')

          filtered = {}
          if data != None: 
               with open(self.path + name + '.json',"w") as file:
                    #removing empty keys note: possible to add other filters
                    for each in data:
                         if not data[each] == '':
                              filtered[each] = data[each]
                              
                    file.seek(0)
                    json.dump(filtered,file,indent=5)
                    file.truncate()
          print(time.time()-start)
          print('\033[92m' + "# Finished writing to",name+".json in",str(time.time()-start) + '\033[0m')

     def get(self,name) -> dict:
          if name in self.collection:
               with open(self.path + name + '.json',"r") as file:
                    return json.load(file)

          else: 
               raise Exception(name + " is not in database")
