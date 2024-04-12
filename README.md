# Incheon Public Data App &#x1F6B6;

공공데이터 API를 활용하여 리액트로 뷰를 개발하는 그룹 프로젝트입니다.


#### [목차]
###### 1. [Incheon Public Data App 바로가기](#-incheon-public-data-app-바로가기)
###### 2. [프로젝트 소개](#-프로젝트-소개)
###### 3. [기술 스택 및 라이브러리](#-기술-스택-및-라이브러리)
###### 4. [개발 기간](#-개발-기간)
###### 5. [주요 기능](#-주요-기능)
###### 6. [느낀점](#-느낀점)

<br>


## &#128310; Incheon Public Data App 바로가기

[<img src="./public/public_data_logo.ico" width="40" height="40">](https://soyeon1221.github.io/Incheon-public-data) 아이콘 클릭!

<br>


## &#128310; 프로젝트 소개

App을 통해 지역과 연도별로 인천광역시 어린이사고 통계를 조회할 수 있습니다. 

Tailwind CSS를 사용하여 디자인하였습니다.

카카오 지도 API와 Chart 라이브러리를 활용하여 데이터를 시각적으로 표현합니다.

<br>


## &#128310; 기술 스택 및 라이브러리

- <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
- <img src="https://img.shields.io/badge/JavaScript-ECD53F?style=flat-square&logo=JavaScript&logoColor=white"/>
- <img src="https://img.shields.io/badge/HTML5-F46D01?style=flat-square&logo=HTML5&logoColor=white"/>
- <img src="https://img.shields.io/badge/CSS3-2490D7?style=flat-square&logo=CSS3&logoColor=white"/>

<br>


## &#128310; 개발 기간

- 23.07.14 - 23.07.24 (총 11일)

<br>


## &#128310; 주요 기능

### 1. 메인
<img src="https://github.com/soyeon1221/Incheon-public-data/assets/121142418/bf6f1310-d1a0-422e-947a-4350457a2a9c" width="700px" height="348px">

- 공공데이터 포털 API를 활용하여 제작하였습니다.
- 연도와 지역별로 지도, 막대차트를 확인할 수 있도록 구현하였습니다.


### 2. 목록
<img src="https://github.com/soyeon1221/Incheon-public-data/assets/121142418/a8c35536-4563-40d3-8acd-91610437c194" width="700px" height="348px">

- select 태그를 사용해서 드롭다운 목록을 구현하였습니다.
- 해당 연도와 지역을 선택하면 해당 내용이 차트와 지도에 나타나도록 구현하였습니다.


### 3. 차트
<img src="https://github.com/soyeon1221/Incheon-public-data/assets/121142418/77843960-dd53-4d7c-95c3-be5f60f4104b" width="700px" height="348px">

- Recharts 라이브러리를 사용하여 구현하였습니다.
- 어린이 사고 종류에 대한 사고 건수를 막대차트로 한눈에 파악할 수 있습니다.
- 차트를 호버하면 사고 종류에 대한 사고 건수를 숫자로 파악할 수 있습니다.
- 원하는 항목만 차트로 표현하기 위해 map과 filter 메서드를 사용하였습니다.


### 4. 지도
<img src="https://github.com/soyeon1221/Incheon-public-data/assets/121142418/9e983dfd-56fb-4478-af9c-6757189c7058" width="700px" height="348px">

- kakao map API를 활용한 위치정보 컴포넌트 구현하였습니다.
- 지도에서 특정 지역을 선택하면 해당 지역의 어린이 사고 통계를 차트로 시각화하여 확인할 수 있습니다.


### 5. 모바일
<img src="https://github.com/soyeon1221/Incheon-public-data/assets/121142418/1ff783c0-b7a0-4bbb-99d1-c3b9e6cb693f" width="650px" height="553px">

- 반응형으로 제작되어 모바일 기기에서도 편리하게 사용할 수 있도록 구현하였습니다.

<br>


## &#128310; 느낀점

#### [배운점]
##### 1. Tailwind CSS
- 다운로드 방법 : npm install tailwindcss (package.json 파일에서 확인)
- 파일 생성 방법 : npx tailwindcss init (tailwind.config.js 파일 생성)
- tailwind.config.js 파일에 작성
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- src 폴더 / index.css 파일에 작성
```
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #eee;
}
```
##### 2. Kakao Developers
- Kakao map API 불러오기 (public 폴더 / index.html 파일에 작성)
  인증키 안에 본인 JavaScript 키 코드 넣기
```
<script 
  type="text/javascript"
  src="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=인증키"
>
</script>
```
- 다운로드 방법 : npm install react-kakao-maps-sdk
- npm install kakao.map.d.ts --save-dev