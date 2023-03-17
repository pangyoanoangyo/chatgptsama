import os  
# os 모듈을 가져온다.
import requests
# requests 모듈을 가져온다.
from bs4 import BeautifulSoup


# 일단 아래에 url로 해당 웹페이지를 가져온다.
url = "https://www.idisglobal.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")


# # 웹페이지에서 모든 링크 가져오기
# links = soup.find_all("a")

# for link in links:
#     print("a링크는 아래와 같습니다."+link.get("href"))



# 웹페이지에서 모든 태그 가져오기
heading = soup.find("h1")

if heading:
    heading.text
    print(heading.text)

else:
    print("H1태그가 없어용")


# 클래스로 필터링된 요소 가져오기
items = soup.find_all("div", class_="item")

if items:
    class_="item"
    for item in items:
        print(item.text)
else:
    print("item이 없어용")


# 테이블에서 데이터 추출하기
table = soup.find("table")

if table:
    rows = table.find_all("tr")
    for row in rows:
        columns = row.find_all("td")
        data = [column.text for column in columns]
        print(data)
else:
    print("테이블을 찾을 수 없습니다.")

