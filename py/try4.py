import sys
import os
import pandas as pd
import time
# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
from newspaper import Article

print(os.getcwd())
path = r"c:\temp"
os.chdir(path)
url = sys.argv[1]
# url = "https://www.washingtonpost.com/weather/2019/09/01/catastrophic-hurricane-dorian-unleashes-devastating-blow-northern-bahamas-takes-aim-southeast-us/"

article = Article(url)
article.download()
article.parse()

outfile = open(os.path.join("article.txt"), "w", encoding="utf8")
outfile.write(article.text)
outfile.close
#print("==============================")
#print(url)
#print("==============================")
#print(path)
#print("==============================")
#print(article.text)


# with open(os.path.join("article.txt"), "w", encoding="utf8") as outfile:
#    outfile.write(article.text)