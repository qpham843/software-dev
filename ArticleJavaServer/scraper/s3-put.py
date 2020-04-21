#!/usr/bin/python3
import boto3
import sys

filename = sys.argv[1]
print("in s3-put.py sending " + filename)
result = boto3.client('s3').upload_file(filename,'articles.publiceditor.io', 'articles' + filename)
print("s3-put.py finished")