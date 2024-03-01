//1. 날씨 api 불러오기
//const API_KEY = 'nv6XTKu9utcGZSoAam5e2hKSAzUiHANi'
// const API_KEY = 'lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7'
let weatherDetails = null
let weatherHourlyDetails = []
let weatherDailyDetails = []

// let url = new URL()

const getWeather = async () => {
   // url = new URL(
   //    `http://dataservice.accuweather.com/currentconditions/v1/226081?apikey=${API_KEY}&language=ko-kr&details=true`
   // )
   const response = await fetch(url)
   const data = await response.json()
   console.log(data)
   weatherDetails = data[0]
   console.log('weatherDetails', weatherDetails)

   currentRender()
}

getWeather()

const getHourlyWeather = async () => {
   // let url2 = new URL(
   //    `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/226081?apikey=${API_KEY}&language=ko-kr&details=true&metric=true`
   // )
   const response = await fetch(url2)
   const data2 = await response.json()
   console.log(data2)
   weatherHourlyDetails = data2
   console.log('weatherHourlyDetails', weatherHourlyDetails)

   hourlyRender()
}

getHourlyWeather()

const getDailyWeather = async () => {
   // let url3 = new URL(
   //    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/226081?apikey=${API_KEY}&language=ko-kr&details=true&metric=true`
   // )
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

   const imageSrc = getImageSrc(`${weatherDetails.WeatherText}`)
   console.log(imageSrc)

   document.querySelector('.card-img-top').src = `${imageSrc}`
   document.querySelector('#current_date').textContent = `${moment(
      weatherDetails.LocalObservationDateTime
   ).format('LLL')}`
   document.querySelector(
      '#current_temperature'
   ).textContent = `${weatherDetails.Temperature.Metric.Value}℃`
   document.querySelector(
      '#current_list1'
   ).textContent = `${weatherDetails.WeatherText}`
   document.querySelector(
      '#current_list2'
   ).textContent = `${weatherDetails.RealFeelTemperature.Metric.Value}℃`
   document.querySelector(
      '#current_list3'
   ).textContent = `${weatherDetails.RelativeHumidity}%`
   document.querySelector(
      '#current_list4'
   ).textContent = `${weatherDetails.Wind.Direction.Localized} ${weatherDetails.Wind.Speed.Metric.Value}km/h`
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
                                 <h5 class="card-title">${
                                    weatherHourlyDetails[i].Temperature.Value
                                 }</h5>
                                 <p class="card-text">${
                                    weatherHourlyDetails[i].Rain.Value
                                 }</p>
                              </div>
                           </div>
                           </div>
   `
   }
}

const dailyRender = () => {
   document.querySelector(
      '#daily_day'
   ).textContent = `${weatherDailyDetails.DailyForecasts[0].Day.IconPhrase}`

   document.querySelector(
      '#daily_night'
   ).textContent = `${weatherDailyDetails.DailyForecasts[0].Night.IconPhrase}`
}

const getImageSrc = (text) => {
   if (text.includes('맑음') || text.includes('화창')) {
      return '../assets/image/icon_sun.svg'
   } else if (text.includes('흐림')) {
      return '../assets/image/icon_cloud.svg'
   } else if (text.includes('안개')) {
      return '../assets/image/icon_mist.svg'
   } else if (text.includes('비')) {
      return '../assets/image/icon_rain.svg'
   } else if (text.includes('눈')) {
      return '../assets/image/icon_snow.svg'
   } else if (text.includes('소나기')) {
      return '../assets/image/icon_shower.svg'
   } else if (text.includes('번개')) {
      return '../assets/image/icon_lightning.svg.svg'
   } else if (text.includes('짙은구름')) {
      return '../assets/image/icon_cloud2.svg'
   } else if (text.includes('추움') || text.includes('바람')) {
      return '../assets/image/icon_wind.svg'
   }
}
