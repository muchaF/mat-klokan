from unittest import result
import openpyxl as excel
import pprint

column = ["D", "E", "F", "G", "H"]
categoryDict = {
    "cvrcek":'Cvrček',
    "benjamin":'Benamín',
    "junior":'Junior',
    "kadet":'Kadet',
    "klokanek":"Klokánek",
    "student":'Student',
}

class file:
    def __init__(self, results, name) -> None:
        self.workspace = excel.load_workbook("template.xlsx")
        self.results = results
        self.name = name
        self.fill()
        self.workspace.save("export/" + name + ".xlsx")

    def __str__(self) -> str:
        return "export/" + self.name + ".xlsx"

    def fill(self):
        templateSheet = self.workspace.active
        for category in self.results["score"]:
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
            xIndex = 9
            for x in self.results["best"][category]:
                solver = self.results["best"][category][x]
                dataIndex = 0
                for dataPoint in solver:
                    sheet[column[dataIndex] + str(xIndex)] = solver[dataPoint]
                    dataIndex += 1
                xIndex += 1

        del self.workspace["Sheet1"]

# @server.route("/API/export/<type>")
# def export(type):
#     exportFile = file(json.loads(session["result"]), session["user"])
#     return send_file(str(exportFile), as_attachment=True)