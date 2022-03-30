import random
import openpyxl as excel
from openpyxl.utils import get_column_letter

column = ["D", "E", "F", "G", "H"]
categoryDict = {
    "cvrcek": "Cvrček",
    "benjamin": "Benamín",
    "junior": "Junior",
    "kadet": "Kadet",
    "klokanek": "Klokánek",
    "student": "Student",
}

class file:
    def __str__(self) -> str:
        return "export/" + self.name + ".xlsx"


class userExport(file):
    def __init__(self, results, name) -> None:
        self.workspace = excel.load_workbook("template.xlsx")
        self.results = results
        self.name = name
        self.fill()
        self.workspace.save("export/" + self.name + ".xlsx")


    def fill(self) -> None:
        for category in self.results["score"]:
            templateSheet = self.workspace.active
            sheet = self.workspace.copy_worksheet(templateSheet)
            sheet.title = categoryDict[category]

            # filling template
            sheet["B2"] = self.results["school"]
            sheet["B3"] = self.results["address"]
            sheet["B4"] = categoryDict[category]

            # filling points
            score = len(self.results["score"][category])
            for i in range(score - 1, -1, -1):
                sheet["A" + str(score - i + 8)] = i
                sheet["B" + str(score - i + 8)] = self.results["score"][category][str(i)]

            # filling solvers
            for index, x in enumerate(self.results["best"][category]):
                solver = self.results["best"][category][x]
                for dataIndex, dataPoint in enumerate(solver):
                    sheet[column[dataIndex] + str(index + 9)] = solver[dataPoint]

        del self.workspace["Sheet1"]

class finalExport(file):
    def __init__(self,results) -> None:
        self.workspace = excel.load_workbook("final.xlsx")
        self.name = "MatKlokan"
        self.results = results
        self.fill()
        self.workspace.save("export/" + self.name + ".xlsx")
    
    def fill(self) -> None:
        for category in self.results:
            templateSheet = self.workspace.active
            sheet = self.workspace.copy_worksheet(templateSheet)
            sheet.title = categoryDict[category]

            maxScore = self.results[category]["max-score"]
            for index, school in enumerate(self.results[category]["school"]):
                letter = get_column_letter(index + 8)
                sheet[letter + "5"] = school

                for row in range(maxScore, -1, -1):
                    sheet["G" + str(maxScore - row + 6)] = row

                for row in range(maxScore, -1, -1):
                    sheet[letter + str(maxScore - row + 6)] = self.results[category]["school"][school][str(row)]
                
        del self.workspace["Sheet1"]


test = {
    "klokanek":{
        "max-score":120,
        "school":{
            "Kalnica":{
            },
            "Brno":{
            },
            "SSP Purkynova":{
            },
        },
        "best":{
            "0":{
                "user":{
                    "name":"Filip"
                }
            }
        }
    }
}

for a in test["klokanek"]["school"]:
    for x in range(121):
        test["klokanek"]["school"][a][str(x)] = random.randrange(10)
finalExport(test)