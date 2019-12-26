# coding: utf-8

# ### Import necessary libraries

# In[1]:


import os

import pandas as pd

# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
from newspaper import Article

import time


# ### Set directory

# In[2]:


# path = "/Users/ugur/Dropbox/Synchronized/Projects/Nick/Webscraper"
path = r"c:\users\admin\downloads\py\Webscraper"

os.chdir(path)


# ### Read in URLs

# In[3]:


file = "sample-articles.csv"

fields = ['url']

df_articles = pd.read_csv(file, skipinitialspace=True, usecols=fields)


# ### Get articles

# In[4]:


os.makedirs("article-texts", exist_ok=True)


# In[5]:


num_urls = 1

for num in range(num_urls):
    url = df_articles['url'][num]
    
    article = Article(url)
    article.download()
    article.parse()
    
    print("==============================")
    print(num)
    print("==============================")
    print(url)
    print("==============================")
    print(os.path.join("article-texts"))
    print("text_" + str(num) + ".txt")
    print("==============================")
    print(article.text)

    
    with open(os.path.join("article-texts", "text_" + str(num) + ".txt"), "w", encoding="utf8") as outfile:
        outfile.write(article.text)
    
    print("sleeping 3")
    time.sleep(3)

