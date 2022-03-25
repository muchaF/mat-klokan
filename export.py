from multiprocessing.sharedctypes import Value
import openpyxl as xl
import json


def exportForUser(results, name):
    book = xl.load_workbook("template.xlsx")
    templateSheet = book.active

    # for sub in category
    for category in results:
        sheet = book.copy_worksheet(templateSheet)
        sheet.title = category
        sheet["B2"] = results[category]["school"]
        sheet["B3"] = results[category]["adress"]
        sheet["B4"] = category
        
        for i in range(120, -1, -1):
            sheet["A" + str(120 - i + 9)] = i
            sheet["B" + str(120 - i + 9)] = int(results[category]["table"][str(i)])
        
        xIndex = 8
        for x in results[category]['best']:
            solver = results[category]["best"][x]
            sheet["D" + str(xIndex)] =      solver["name"]
            sheet["E" + str(xIndex)] =      solver["surname"]
            sheet["F" + str(xIndex)] =      solver["grade"]
            sheet["G" + str(xIndex)] =      solver["date"]
            sheet["H" + str(xIndex)] = int( solver["score"])
            xIndex += 1

    del book['Sheet1']
    book.save("export/" + name + ".xlsx")
