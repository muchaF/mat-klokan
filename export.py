import openpyxl as excel

solverCollum = ["D", "E", "F", "G", "H"]


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
        for category in self.results:
            sheet = self.workspace.copy_worksheet(templateSheet)
            sheet.title = category

            # filling template
            sheet["B2"] = self.results[category]["school"]
            sheet["B3"] = self.results[category]["adress"]
            sheet["B4"] = category

            # filling points
            score = len(self.results[category]["table"])
            for i in range(score - 1, -1, -1):   
                sheet["A" + str(score - i + 9)] = i
                sheet["B" + str(score - i + 9)] = self.results[category]["table"][str(i)]

            # filling solvers
            xIndex = 8
            for x in self.results[category]["best"]:
                solver = self.results[category]["best"][x]
                dataIndex = 0
                for dataPoint in solver:
                    sheet[solverCollum[dataIndex] + str(xIndex)] = solver[dataPoint]
                    dataIndex += 1
                xIndex += 1

        del self.workspace["Sheet1"]

# @server.route("/API/export/<type>")
# def export(type):
#     exportFile = file(json.loads(session["result"]), session["user"])
#     return send_file(str(exportFile), as_attachment=True)