from multiprocessing.sharedctypes import Value
import openpyxl as xl
import json

def exportForUser(results,name):
    book = xl.Workbook()
    del book["Sheet"]
    # for category in results:
        # print(category)
        # sheet = book.create_sheet(category)
        # sheet.title = category
        # sheet["A1"] = "Výsledky pro kategorii " + category

        # sheet["D3"] = "Nejlepší řešitelé"

        # sheet["D4"] = "Jméno"
        # sheet["E4"] = "Přijmení"
        # sheet["F4"] = "Třída"
        # sheet["G4"] = "Datum narození"
        # sheet["H4"] = "Body"

        # bestIndex = 5
        # for best in results[category]["best"]:
        #     sheet["D" + str(bestIndex)] = results[category]["best"][best]["name"]
        #     sheet["E" + str(bestIndex)] = results[category]["best"][best]["surname"]
        #     sheet["F" + str(bestIndex)] = results[category]["best"][best]["grade"]
        #     sheet["G" + str(bestIndex)] = results[category]["best"][best]["date"]
        #     sheet["H" + str(bestIndex)] = results[category]["best"][best]["score"]
        #     bestIndex += 1

        # sheet.merge_cells("A3:B3")
        # sheet.merge_cells("A1:B1")
        # sheet["A3"] = "Počet řešitelů dle získaných bodů"
        # sheet["A4"] = "Body"
        # sheet["B4"] = "Řešitelé"

        # print(len(results[category]["table"].items()))
        # for key, value in results[category]["table"].items():
        #     row = len(results[category]["table"].items()) - int(key) + 4
        #     sheet["A" + str(row)] = str(key)
        #     sheet["B" + str(row)] = str(value)


    sheet = book.create_sheet("test")
    sheet.title = "test"
    sheet["A1"] = "Výsledky pro kategorii " + "test"

    sheet["D3"] = "Nejlepší řešitelé"

    sheet["D4"] = "Jméno"
    sheet["E4"] = "Přijmení"
    sheet["F4"] = "Třída"
    sheet["G4"] = "Datum narození"
    sheet["H4"] = "Body"

    bestIndex = 5
    for best in results["best"]:
        sheet["D" + str(bestIndex)] = results["best"][best]["name"]
        sheet["E" + str(bestIndex)] = results["best"][best]["surname"]
        sheet["F" + str(bestIndex)] = results["best"][best]["grade"]
        sheet["G" + str(bestIndex)] = results["best"][best]["date"]
        sheet["H" + str(bestIndex)] = results["best"][best]["score"]
        bestIndex += 1

    sheet.merge_cells("A3:B3")
    sheet.merge_cells("A1:B1")
    sheet["A3"] = "Počet řešitelů dle získaných bodů"
    sheet["A4"] = "Body"
    sheet["B4"] = "Řešitelé"

    print(len(results["table"].items()))
    for key, value in results["table"].items():
        row = len(results["table"].items()) - int(key) + 4
        sheet["A" + str(row)] = str(key)
        sheet["B" + str(row)] = str(value)
    book.save("export/" + name + ".xlsx")


# with open("testing.json", "r", encoding="utf8") as testingData:
#     exportForUser(json.load(testingData))

