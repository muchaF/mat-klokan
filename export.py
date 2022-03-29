import openpyxl as excel


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
    def __init__(self, results, name) -> None:
        self.workspace = excel.load_workbook("template.xlsx")
        self.results = results
        self.name = name
        self.fill()
        self.workspace.save("export/" + self.name + ".xlsx")

    def __str__(self) -> str:
        return "export/" + self.name + ".xlsx"

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