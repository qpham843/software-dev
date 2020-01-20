#!python3
import sys
import os
import pandas as pd
import time
# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
from newspaper import Article

print(os.getcwd())
path = r"/var/article"
os.chdir(path)
url = sys.argv[1]

article = Article(url)
article.download()
article.parse()

outfile = open(os.path.join("article.txt"), "w", encoding="utf8")
outfile.write(article.text)
outfile.close
