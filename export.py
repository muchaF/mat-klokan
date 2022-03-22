import openpyxl as xl
sample = {
     "Cvrček":{
          "1":"a",
          "2":"aa",
          "3":"aaa",
          "4":"aaaa",
          "5":"aaaaa",
          "6":"aaaaaa",
          "7":"aaaaaaa",
     },
     "Klokánek":{
          "1":"a"
     },
     "Benjamín":{
          "1":"a"
     },
     "Student":{
          "1":"a"
     }
}

def export(json):
     book = xl.Workbook()
     del book["Sheet"]

     for category in json:
          sheet = book.create_sheet(category)
          sheet.title = category
          for score in json[category]:
               sheet['A' + score] = json[category][score]

     
     book.save("export/Mat-klokan.xlsx")
export(sample)