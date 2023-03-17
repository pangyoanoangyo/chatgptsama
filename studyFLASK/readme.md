구글 API를 사용하는 방법

@app.route("/search", methods=["POST"])
def search():
    query = request.form.get("query")
    api_key = "YOUR_GOOGLE_API_KEY"
    cx = "YOUR_CUSTOM_SEARCH_ENGINE_ID"

에서 ID랑 키는 아래와 같이 받아야한다.

우선 ID는 
사용자 정의 검색 엔진 ID를 다시 확인하고 올바른 값으로 대체해야 합니다. 
사용자 정의 검색 엔진 ID를 찾으려면 다음 단계를 수행하십시오:

Google Custom Search 페이지로 이동합니다.
사용자 정의 검색 엔진 목록에서 원하는 검색 엔진을 선택합니다.
"사용자 정의 검색 엔진 ID" 또는 "검색 엔진 ID" 값을 찾습니다.
이 값을 코드의 cx 변수에 할당하십시오:




#아래코드는 구글 검색API 임 내꺼임

    <script async src="https://cse.google.com/cse.js?cx=e02dd39715f6f41d0">
    </script>
    <div class="gcse-search"></div>