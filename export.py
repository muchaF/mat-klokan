from unittest import result
import openpyxl as xl
import openpyxl.styles.alignment
import json


def exportForUser(results):
    book = xl.Workbook()
    del book["Sheet"]
    for category in results:
        print(category)
        sheet = book.create_sheet(category)
        sheet.title = category
        sheet.column_dimensions(bestFit=True)
        sheet["A1"] = "Výsledky pro kategorii " + category

        sheet["D2"] = "Nejlepší řešitelé"

        sheet["D3"] = "Jméno"
        sheet["E3"] = "Přijmení"
        sheet["F3"] = "Třída"
        sheet["G3"] = "Datum narození"
        sheet["H3"] = "Body"

        bestIndex = 4
        for best in results[category]["best"]:
            sheet["D" + str(bestIndex)] = results[category]["best"][best]["name"]
            sheet["E" + str(bestIndex)] = results[category]["best"][best]["surname"]
            sheet["F" + str(bestIndex)] = results[category]["best"][best]["grade"]
            sheet["G" + str(bestIndex)] = results[category]["best"][best]["date"]
            sheet["H" + str(bestIndex)] = results[category]["best"][best]["score"]
            bestIndex += 1

        sheet.merge_cells("A3:B3")
        sheet["A3"] = "Počet řešitelů dle získaných bodů"
        for score in results[category]["table"]:
            sheet["A" + str(int(score) + 4)] = score
            sheet["B" + str(int(score) + 4)] = results[category]["table"][score]

    book.save("export/Mat-klokan.xlsx")


with open("testing.json", "r", encoding="utf8") as testingData:
    exportForUser(json.load(testingData))
