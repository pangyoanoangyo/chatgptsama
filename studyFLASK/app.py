import os
import requests
from flask import Flask, render_template, request,send_from_directory
from googleapiclient.discovery import build

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
# templates폴더를 만들어야 html을 불러올 수 있다.

@app.route("/search", methods=["POST"])
def search():
    query = request.form.get("query")
    api_key = "AIzaSyAurs7_CQXjWDiVSTp_VJQu0ZcPqMxEr6c"
    cx = "e02dd39715f6f41d0"

    # Google Custom Search API 호출
    service = build("customsearch", "v1", developerKey=api_key)
    result = service.cse().list(q=query, cx=cx, searchType="image").execute()
    items = result["items"]

    # 이미지를 저장할 디렉토리 생성
    if not os.path.exists("images"):
        os.makedirs("images")

    for index, item in enumerate(items):
        img_src = item["link"]

        # 이미지 다운로드
        img_response = requests.get(img_src)

        # 이미지를 저장할 파일명 설정
        img_name = f"image_{index}.jpg"

        # 이미지를 디렉토리에 저장
        with open(os.path.join("images", img_name), "wb") as img_file:
            img_file.write(img_response.content)
        print(f"{img_name} 저장 완료.")

    return "<p>이미지 검색이 완료되었습니다.</p><a href='/result'>결과보기</a>"


@app.route("/result")
def result():
    images = os.listdir("images")  # 이미지 파일 이름 목록을 가져옵니다.
    return render_template("result.html", images=images)

@app.route("/images/<image_name>")
def get_image(image_name):
    return send_from_directory("images", image_name)

if __name__ == "__main__":
    app.run(debug=True)





# cd studyFLASK
# python app.py