
# coding: utf-8

# ### Import necessary libraries
import os

import pandas as pd

# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
# QM: Make sure to have newspaper3k installed first!
from newspaper import Article
from newspaper import Config

import time


# ### Set directory

#QM: Set this to whatever path you want to download the .txt files to.
path = "/Users/PhamDell/Downloads/WebScraper"

os.chdir(path)


# ### Read in URLs

file = "sample-articles.csv"

fields = ['url']

df_articles = pd.read_csv(file, skipinitialspace=True, usecols=fields)


# ### Get articles

os.makedirs("article-texts", exist_ok=True)

#QM: Added these three lines to access some URLs that denied download access.
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
config = Config()
config.browser_user_agent = user_agent

#Change this number to however many URLs you want to read in.
num_urls = 10

for num in range(num_urls):
    url = df_articles['url'][num]
    
    article = Article(url, config=config)
    article.download()
    article.parse()
    
    with open(os.path.join("article-texts", "text_" + str(num) + ".txt"), "w", encoding="utf8") as outfile:
        outfile.write(article.text)
print("Done!")

