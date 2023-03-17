import os
import requests
from bs4 import BeautifulSoup

url = "https://www.idisglobal.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

images = soup.find_all("img")

if images:
    images = soup.find_all("img")
    for image in images:
        print(image.get("src"))
else:
    print("이미지를 찾을 수 없습니다.")


if images:
    # 이미지를 저장할 디렉토리 생성
    if not os.path.exists("images"):
        os.makedirs("images")

    for index, image in enumerate(images):
        img_src = image.get("src")

        # 이미지 다운로드
        img_response = requests.get(img_src)

        # 이미지를 저장할 파일명 설정
        img_name = f"bs4추출이미지_{index}.jpg"

        # 이미지를 디렉토리에 저장
        with open(os.path.join("images", img_name), "wb") as img_file:
            img_file.write(img_response.content)
        print(f"{img_name} 저장 완료.")
else:
    print("이미지를 찾을 수 없습니다.")
