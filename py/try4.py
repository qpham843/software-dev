import sys

import os

import pandas as pd

# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
from newspaper import Article

import time
# path = "/Users/ugur/Dropbox/Synchronized/Projects/Nick/Webscraper"

path = r"c:\py\Webscraper"

os.chdir(path)

# file = "sample-articles.csv"

# fields = ['url']

# df_articles = pd.read_csv(file, skipinitialspace=True, usecols=fields)

os.makedirs("article-texts", exist_ok=True)

# url = sys.argv[1]
url = "https://www.washingtonpost.com/weather/2019/09/01/catastrophic-hurricane-dorian-unleashes-devastating-blow-northern-bahamas-takes-aim-southeast-us/"
    
article = Article(url)

article.download()

article.parse()

print("==============================")
print(url)
print("==============================")
print(os.path.join("article-texts"))
print("==============================")
print(article.text)


with open(os.path.join("article-texts", "article-text.txt"), "w", encoding="utf8") as outfile:
    outfile.write(article.text)