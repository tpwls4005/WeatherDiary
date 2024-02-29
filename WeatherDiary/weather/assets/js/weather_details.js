//1. 날씨 api 불러오기
// const LOCATION_KEY = '226081'
// //const API_KEY = 'nv6XTKu9utcGZSoAam5e2hKSAzUiHANi'
// const API_KEY = 'lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7'
let weatherDetails = null
let weatherHourlyDetails = []
let weatherDailyDetails = []

// let url = new URL(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${LOCATION_KEY}?apikey=${API_KEY}&language=ko-kr&details=true`)

const getWeather = async () => {
   let url = new URL(
      `http://dataservice.accuweather.com/currentconditions/v1/226081?apikey=lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7&language=ko-kr&details=true`
   )
   const response = await fetch(url)
   const data = await response.json()
   console.log(data)
   weatherDetails = data[0]
   console.log('weatherDetails', weatherDetails)

   currentRender()
}

getWeather()

const getHourlyWeather = async () => {
   let url2 = new URL(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/226081?apikey=lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7&language=ko-kr&details=true&metric=true`
   )
   const response = await fetch(url2)
   const data2 = await response.json()
   console.log(data2)
   weatherHourlyDetails = data2
   console.log('weatherHourlyDetails', weatherHourlyDetails)

   hourlyRender()
}

getHourlyWeather()

const getDailyWeather = async () => {
   let url3 = new URL(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/226081?apikey=lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7&language=ko-kr&details=true&metric=true`
   )
   const response = await fetch(url3)
   const data3 = await response.json()
   console.log(data3)
   weatherDailyDetails = data3
   console.log('weatherDailyDetails', weatherDailyDetails)

   dailyRender()
}

getDailyWeather()

// 2. 날씨 api 그려주기
const currentRender = () => {
   /*
   document.querySelector('.mb-3').innerHTML = `
   <div class="card-header">
   <i class="fa-solid fa-location-dot"></i>
   <div id="current_location">서울특별시</div>
   </div>
   <img src="https://developer.accuweather.com/sites/default/files/03-s.png" class="card-img-top" alt="." />
   <div class="card-body">
   <h6 class="card-text" id="current_date">${moment(weatherDetails.LocalObservationDateTime).format('LLL')}</h6>
   <div class="card-text" id="current_temperature"><h2>${weatherDetails.Temperature.Metric.Value}℃</h2></div>
   <ul class="list-group list-group-flush">
   <li class="list-group-item">
   <span>기상 &nbsp;</span>
   <span id="current_list1">${weatherDetails.WeatherText}</span>
   </li>
   <li class="list-group-item">
   <span>체감 &nbsp;</span>
   <span id="current_list2">${weatherDetails.RealFeelTemperature.Metric.Value}℃</span>
   </li>
   <li class="list-group-item">
   <span>습도 &nbsp;</span>
   <span id="current_list3">${weatherDetails.RelativeHumidity}%</span>
   </li>
   <li class="list-group-item">
   <span>풍속 &nbsp;</span>
   <span id="current_list4">${weatherDetails.Wind.Direction.Localized} ${weatherDetails.Wind.Speed.Metric.Value}km/h</span>
   </li>
   </ul>
   </div>`
   */

   document.querySelector('.card-img-top').src = `https://developer.accuweather.com/sites/default/files/${weatherDetails.WeatherIcon}-s.png`
   document.querySelector('#current_date').textContent = `${moment(weatherDetails.LocalObservationDateTime).format('LLL')}`
   document.querySelector('#current_temperature h2').textContent = `${weatherDetails.Temperature.Metric.Value}℃`
   document.querySelector('#current_list1').textContent = `${weatherDetails.WeatherText}`
   document.querySelector('#current_list2').textContent = `${weatherDetails.RealFeelTemperature.Metric.Value}℃`
   document.querySelector('#current_list3').textContent = `${weatherDetails.RelativeHumidity}%`
   document.querySelector('#current_list4').textContent = `${weatherDetails.Wind.Direction.Localized} ${weatherDetails.Wind.Speed.Metric.Value}km/h`
}

const hourlyRender = () => {
   for (let i = 0; i <= 5; i++) {
      document.querySelector('#hourly').innerHTML += `<div class="col-2">
                           <div class="card" style="min-width: 5rem">
                              <h3>${i + 1}시간후</h3>
                              <img src="https://developer.accuweather.com/sites/default/files/${
                                 weatherHourlyDetails[i].WeatherIcon
                              }-s.png" class="card-img-top" alt="." />
                              <div class="card-body">
                                 <h5 class="card-title">${weatherHourlyDetails[i].Temperature.Value}</h5>
                                 <p class="card-text">${weatherHourlyDetails[i].Rain.Value}</p>
                              </div>
                           </div>
                           </div>
   `
   }
}

const dailyRender = () => {
   document.querySelector('#daily_day').textContent = `${weatherDailyDetails.DailyForecasts[0].Day.IconPhrase}`

   document.querySelector('#daily_night').textContent = `${weatherDailyDetails.DailyForecasts[0].Night.IconPhrase}`
}

// 3. 유저는 현재위치를 볼 수 있다.
// 3-1. 그리고 수정버튼을 클릭 시 현재 위치를 변경할 수 있다.
// 4. 유저는 현재 날씨(온도 및 기상상활)을 확인 할 수 있다.
//4-1. 유저는 현재 기상상황을 배경이미지로 확인 할 수 있다.(구현가능시)
// 5. 유저는 시간대 별 예보를 볼 수 있다.
// 6. 유저는 일출 시간, 일몰 시간을 볼 수 있다.
// 7. 유저는 대기질을 확인 할 수 있다.
// 8. 유저는 알레르기에 관한 문구를 확인 할 수 있다.
