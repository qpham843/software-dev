import csv
import json
import pandas as pd
import numpy as np
import pprint
import os
from pathlib import Path

def index_to_phrase(csv_file, txt_file):
    csv = pd.read_csv(Path(csv_file))
    csv['Phrase'] = ""
    csv['Before'] = ""
    csv['After'] = ""
    csv['ID'] = ""
    with open(txt_file, 'r') as file:
        data = file.read().replace('\n', ' ')
    highlights = []
    befores = []
    afters = []
    ids = []
    for index, row in csv.iterrows():
        if np.isnan(row['Start']) or np.isnan(row['End']):
            csv['Phrase'][index] = ""
            csv['Before'][index] = ""
            csv['After'][index] = ""
            csv['ID'][index] = ""
            continue

        start = int(row['Start'])
        end = int(row['End'])

        if start == end or start == -1 or end == -1:
            continue

        before = data[start-12:start]
        after = data[end+1:end+12]
        phrase = data[start:end+1]
        highlights.append(phrase)
        befores.append(before)
        afters.append(after)
        csv['Phrase'][index] = phrase
        csv['Before'][index] = before
        csv['After'][index] = after

        id = csv['Credibility Indicator Name'][index].replace(" ", "").lower()
        print(id)
        csv['ID'][index] = id

#     csv.to_csv(r'/Users/johnwsha/Documents/School/Organizations/Goodly Labs/' + 'test' + csv_file)
    cwd = os.getcwd()
    csv.to_json(csv_file[:-4] + "_test"+ '.json')
    return highlights

def read_json(json_file):
    with open(json_file) as j_file:
        data = json.load(j_file)
    # pp.pprint(data)
    return data

def send_data_to_js(data):
    before = data["Before"]
    after = data["After"]
    highlights = data["Phrase"]
    pp.pprint(before)
    pp.pprint(after)
    pp.pprint(highlights)

highlights = index_to_phrase('VisualizationData_17120 - Sheet1.csv', '17120SSSArticle.txt')
# print(highlights)

pp = pprint.PrettyPrinter(indent=4)
data = read_json('VisualizationData_17120 - Sheet1_test.json')
# send_data_to_js(data)
