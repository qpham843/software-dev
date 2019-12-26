import requests

postTo = '157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/submit?url=https://thediplomat.com/2019/12/violent-extremism-in-the-maldives-the-saudi-factor/'
x = requests.post(postTo)

print(x.text)
