import React, { useState, useContext, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

const guGuns=  [
  {guGun : 2309, name :'강화군'},
  {guGun : 2308, name :'계양구'},
  {guGun : 2303, name :'미추홀구'},
  {guGun : 2305, name :'남동구'},
  {guGun : 2302, name :'동구'},
  {guGun : 2304, name :'부평구'},
  {guGun : 2306, name :'서구'},
  {guGun : 2307, name :'연수구'},
  {guGun : 2310, name :'옹진군'},
  {guGun : 2301, name :'중구'},
];

const years = [2018, 2019, 2020, 2021];

// 서버에 데이터를 요청하는 함수
function fetchData(guGuns, year){
  const endPoint = 'https://apis.data.go.kr/B552061/lgStat/getRestLgStat'
  const serviceKey = 'R6ebLrer5O%2BcT1LE4rnaa4mpAQyQ%2F2Fu5DmoDKKbevTv%2FmJyKxQfO2DH0e8D3MJvRzj5rVSACjnkZ8HKab0R3g%3D%3D'
  const type = 'json';
  const numOfRows = 10;
  const pageNo = 1;
  const siDo = 2300;  //인천광역시의 시도 코드
  console.log('year: '+ year);
  console.log('군코드: '+ guGuns.guGun);

  const promise = fetch(`${endPoint}?serviceKey=${serviceKey}&searchYearCd=${year}&siDo=${siDo}&guGun=${guGuns.guGun}&type=${type}&numOfRows=${numOfRows}&pageNo=${pageNo}`)
  .then(res => {
    if (!res.ok) { 
      throw res;
    }
    return res.json();
  })

  return promise; 
}

// 메인 컴포넌트
export default function App() {
  //마커 및 guGun 클릭시 JSON에 접근하기 위한 id 선언
  const pooint = [
    {
      id:"0",
      title: "강화군",
      latlng: { lat: 37.7474156763281, lng: 126.48812680588904 },
     
    },
    {
      id:"1",
      title: "계양구",
      latlng: { lat: 37.559098086964376, lng: 126.73614631803191 },
    },
    {
      id:"2",
      title: "미추홀구",
      latlng: { lat: 37.45757174442662, lng: 126.66452892135241 },
    },
    {
      id:"3",
      title: "남동구",
      latlng: { lat: 37.447075680440726, lng: 126.73183904553885 },
    },
    {
      id:"4",
      title: "동구",
      latlng: { lat: 37.4739078775476, lng: 126.64329300493141 },
    },
    {
      id:"5",
      title: "부평구",
      latlng: { lat: 37.507046141988425, lng: 126.72185851265603 },
    },
    {
      id:"6",
      title: "서구",
      latlng: { lat: 37.55685430414796, lng: 126.64718731632973 },
    },
    {
      id:"7",
      title: "연수구",
      latlng: { lat: 37.41018708061023, lng: 126.67814797552523 },
    },
    {
      id:"8",
      title: "옹진군",
      latlng: { lat: 37.44636010668163, lng: 126.63681285514171 },
    },
    {
      id:"9",
      title: "중구",
      latlng: { lat: 37.471318238628406, lng: 126.48425025563662 },
     
    }
  ];

  const [year, setYear] = useState(years[0]);
  const [gugun , setGugun] = useState(guGuns[0]);
  const default_map_center = { lat: 37.7474156763281, lng: 126.48812680588904 }
  const default_map_level = 7;
  const [map_center_change, setMapCenter] = useState(default_map_center);
  const [map_level_change, setMapLeve] = useState(default_map_level);


  return (
    <>
      <div className=" xl bg-sky-50 h-[969px] ">
        <header className=" bg-gray-700 flex justify-center p-5 font-semibold text-white ">
          <p className=" text-center sm:text-4xl text-xl border-4 border-white p-3 ">
            인천광역시 <br className='block sm:hidden'/> 어린이사고 통계 조회
          </p>
        </header>

        <nav className=" md:text-base text-sm sm:justify-end flex justify-center py-3 font-semibold w-11/12 mx-auto ">
          <div id="select-year" className=" border-2 ml-3 p-3 rounded-xl bg-white ">
            <select className=" outline-none " onChange={(e)=>setYear(e.target.value)}>
              <option disabled className=" ml-7 ">년도</option>
              {years.map(year => (
                <option key={year} value={year} className=" ml-8 ">{year}년</option>
              ))}
            </select> 
          </div>   
        
          <div id="select-location" className=" border-2 ml-3 p-3 rounded-xl bg-white ">
            <select 
              key={pooint.id} 
              defaultValue={pooint.id} 
              onChange={(e) => {
                setGugun(guGuns[e.target.value]); 
                setMapCenter(pooint[e.target.value].latlng);
                setMapLeve(7);
              }} 
              className=" outline-none "
            >
              <option disabled className=" text-center ">지역이름</option>
              {pooint.map(pooint => (
                <option 
                  key={pooint.id} 
                  value={pooint.id} 
                  selected={gugun.name==pooint.title}
                  className=" text-center "
                >
                  {pooint.title}
                </option>
              ))}
            </select> 
          </div>
        </nav>
        
        <main className=" 2xl:flex 2xl:p-10 flex-nowarp flex-row-reverse justify-between bg-gray-700 rounded-xl mx-auto my-0 block m-0 ">
          {/* 대시보드에 gugun과 year변수를 전달한다 */}
          <Dashboard guGun={gugun} year={year}/>
          <div className=" 2xl:w-[30%] 2xl:pr-10 mx-auto w-[80%] object-cover ml-0 py-10 ">
            <Map // 지도를 표시할 Container
              center={map_center_change}
              style={{ width:"100%", height: "450px", marginLeft: "10%" }}
              level={map_level_change}
              className='lg:ml-0'
              // aspect={2.0}
            >
              {pooint.map((value) => (
                <MapMarker
                  key={value.id}
                  position={value.latlng}
                  image={{
                  src: "https://cdn.icon-icons.com/icons2/1283/PNG/512/1497620001-jd22_85165.png",
                  size: {
                    width: 50,
                    height: 50,
                  }, // 마커이미지의 크기입니다
                  }}
                  onClick={() => {
                    setGugun(guGuns[value.id]);
                    setMapCenter(value.latlng);
                    setMapLeve(7);
                  }}
                >
                  <p className="w-[150px] text-center opacity-50 cursor-pointer" 
                    onClick={ ()=>{
                      setGugun(guGuns[value.id]);
                      setMapCenter(value.latlng);
                      setMapLeve(7);
                    }
                    }
                  >
                    {value.title}
                  </p>
                </MapMarker>              
              ))}
            </Map>  
          </div>
        </main>
      </div>
    </>
  )
}

function Dashboard({guGun, year}){
  const [ data, setData ] = useState(null);
  const [ isLoaded, setIsLoaded ] = useState(null);
  const [ error,setError ] = useState(null);

  useEffect(()=>{
    //서버에 요청하기 전 사용자에게 대기 상태를 먼저 보여주어야 한다
    setIsLoaded(false);
    setError(null);

    //fethData 함수에 guGun 과 year 변수를 전달한다
    fetchData(guGun, year)
      .then(data=>{
        setData(data);
        console.log(data)
      })
      .catch(error =>{
        setError(error);
      })
      .finally(()=> setIsLoaded(true)); //성공 실패와 관계없이 서버가 응답하면 대기상태를 해제한다    

  },[guGun,year]) //guGun 또는 year 변수가 업데이트되면 서버에 다시데이터를 요청한다.

  if(error){
    return <p className='text-white text-sm pl-20 pt-20 sm:text-5xl sm:pr-56'>자료를 불러오는데 실패하였습니다.</p>
  }
  if(!isLoaded){
    return <p className='text-white text-sm pl-20 pt-20 sm:text-5xl sm:pr-56'>데이터 불러오는중 입니다. <br /> 잠시만 기다려주세요.</p>
  }

  return (
    <>
      <div className=" 2xl:w-1/2 sm: mx-auto  m-0 object-cover ">
        {data.totalCount > 0 ? (
          <div>
            <div className=" mx-auto ">
              <h1 className=" 2xl:text-4xl lg:m-0 text-base text-white py-3 font-semibold text-center mx-auto ">
                {year}년 {guGun.name}사고조회 결과
              </h1>
            </div>
            <Rechart gpt= {data.items.item}/>
          </div>
          ) : (
            //데이터가 없으면 사용자에게 자료가 없다는 것을 알려야한다
            <p>자료가 없습니다.</p>
          )}
      </div>
    </>
  )
}

function Rechart({ gpt }) {
  //원하는 항목만 차트로 표현하기 위해 필터로 한번 걸러줌
  const res = gpt.filter(item => {
    if (item.acc_cl_nm === "어린이사고" || item.acc_cl_nm === "어린이보행사고" || item.acc_cl_nm === "스쿨존내어린이사고") {
      return item
    }
  })

  const chartData = res.map(res=> {
    return{
      name: res.acc_cl_nm,
      사고건수: res.acc_cnt,
      사망자수: res.dth_dnv_cnt,
      부상자수: res.injpsn_cnt
    }
  })

  return(
    <>
      <div className='ml-[-35px] mr-[15px]'>
        <ResponsiveContainer width="100%" minWidth="280px" height={400}>
          <BarChart width={400} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#fff' }}  />
          {/* dy={10} */}
          <YAxis domain={[0, 90]} /> 
          {/* domain: Y축 값의 범위 */}
          <Tooltip />
          <Legend />
          <Bar dataKey="사고건수" fill="#9DB2BF" /> 
          <Bar dataKey="사망자수" fill="rgb(110, 184, 249)" />
          <Bar dataKey="부상자수" fill="#DDE6ED" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}