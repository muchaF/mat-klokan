from multiprocessing.sharedctypes import Value
import openpyxl as xl
import json


def exportForUser(results, name):
    book = xl.load_workbook("template.xlsx")
    templateSheet = book.active

    # for sub in category
    sheet = book.copy_worksheet(templateSheet)
    for i in range(120, -1, -1):
        sheet["A" + str(120 - i + 9)] = i
    del book['Sheet1']
    book.save("export/" + name + ".xlsx")
