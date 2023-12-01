# -*- coding: utf-8 -*-
from tkinter import filedialog as fd
from datetime import date as dt
import json
from commit_it import git_push

weekdays = ['월', '화', '수', '목', '금', '토', '일']
ok = True
try:
    # BASE_PATH = fd.askdirectory()
    BASE_PATH = "C:/Users/hyose/Documents/Programming/hyoseo837.github.io"
except:
    ok = False

try:
    path = fd.askopenfile(filetypes=[('text file', '*.txt')]).name
except:
    ok = False
title = input('enter the title : ')
if title == '':
    ok = False
date = dt.today().__str__()
dow = weekdays[dt.today().weekday()]

if ok:
    jsonPath = BASE_PATH +"/notepad/blogData.json"

    in_f = open(jsonPath,'r',encoding='utf-8')
    data = json.load(in_f)
    in_f.close()

    new_data = {'date':date, 'title':title}

    data.append(new_data)

    out_f=open(jsonPath,'w',encoding='utf-8')
    json.dump(data,out_f,indent=4,ensure_ascii=False)
    out_f.close()

    paragraphs = []

    f = open(path,'r',encoding='utf-8')
    texts = f.readlines()
    para = ""
    for line in texts:
        if line == '\n':
            paragraphs.append(para)
            para = ""
        else:
            para += "\t\t\t"
            para += line

    paragraphs.append(para)
    para = ""

    tmp = ""

    for i in paragraphs:
        tmp += f"\t\t<p>\n{i}\t\t</p>\n\t\t<br>\n"

    content = f'''<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="blog.css">
        </head>
        <body>
            <H1>{title}</H1>
            <p id="date">{date} ({dow})</p>
    {tmp}
            <br>
            <br>
        </body>
    </html>
    '''

    html_folder_path = BASE_PATH+"/notepad/texts"
    html_f = open(f"{html_folder_path}/{date}.html",'w',encoding="utf-8")
    html_f.write(content)
    html_f.close()

    git_push(date,BASE_PATH)

else:
    print("post failed")