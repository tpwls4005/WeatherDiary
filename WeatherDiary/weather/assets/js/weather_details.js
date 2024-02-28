// 1. 날씨 api 불러오기
const LOCATION_KEY = '226081'
//const API_KEY = 'nv6XTKu9utcGZSoAam5e2hKSAzUiHANi'
const API_KEY = 'lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7'
let weatherDetails = []

let url = new URL(
   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${LOCATION_KEY}?apikey=${API_KEY}&language=ko-kr&details=true&metric=true` // 5day
   //`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATION_KEY}?apikey=${API_KEY}&language=ko-kr&details=true&metric=true` //1day
   //`http://dataservice.accuweather.com/currentconditions/v1/${LOCATION_KEY}?apikey=${API_KEY}&language=ko-kr&details=true` //Current Conditions
)

const getWeather = async () => {
   const response = await fetch(url)
   const data = await response.json()
   console.log(data)
   weatherDetails = data.DailyForecasts
   console.log('weatherDetails', weatherDetails)

   render()
}

getWeather()

// 2. 날씨 api 그려주기

const render = () => {
   document.querySelector('#current_weather').innerHTML = `
   <div class="col">${weatherDetails[0].Temperature}</div>
   <div class="col">${weatherDetails[0].Day.IconPhrase}</div>
   `
}

// 3. 유저는 현재위치를 볼 수 있다.
// 3-1. 그리고 수정버튼을 클릭 시 현재 위치를 변경할 수 있다.
const getLocation = async () => {
   url = new URL()
   const response = await fetch(url)
   const data = await response.json()
   console.log(data)
   weatherDetails = data.DailyForecasts
   console.log('weatherDetails', weatherDetails)

   render()
}

// 4. 유저는 현재 날씨(온도 및 기상상활)을 확인 할 수 있다.
//4-1. 유저는 현재 기상상황을 배경이미지로 확인 할 수 있다.(구현가능시)
// 5. 유저는 시간대 별 예보를 볼 수 있다.
// 6. 유저는 일출 시간, 일몰 시간을 볼 수 있다.
// 7. 유저는 대기질을 확인 할 수 있다.
// 8. 유저는 알레르기에 관한 문구를 확인 할 수 있다.
