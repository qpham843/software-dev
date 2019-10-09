import csv
import sys
import shutil
import fileinput
import os.path

arg_list = sys.argv
print(arg_list)
articleID = arg_list[1]

shutil.copy("Visualization.html", os.getcwd() + "/TestBed")
curName = "TestBed/Visualization" + articleID + ".html"
os.rename("TestBed/Visualization.html", curName)

text = ""

with open(articleID + "SSSArticle.txt", 'r', encoding='utf8') as file:
    text = file.read()

with fileinput.FileInput(curName, inplace=True) as file:
    for line in file:
        print(line.replace("ARTICLEIDHERE", articleID, 1), end='')

with fileinput.FileInput(curName, inplace=True) as file:
    for line in file:
        print(line.replace("ARTICLETEXTHERE", text, 1), end='')
