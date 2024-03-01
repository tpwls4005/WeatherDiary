//1. 날씨 api 불러오기
// const API_KEY = 'nv6XTKu9utcGZSoAam5e2hKSAzUiHANi'
// const API_KEY = 'lkUpGdk78WKJTRMsf3vaKPFFQgImLsP7'
let weatherDetails = null
let weatherHourlyDetails = []
let weatherDailyDetails = []

// let url = new URL()

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
   const imageSrc = getImageSrc(`${weatherDetails.WeatherText}`)

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
      const imageSrc = getImageSrc(`${weatherHourlyDetails[i].IconPhrase}`)

      document.querySelector('#hourly').innerHTML += `<div class="col-2">
        <div class="card" style="min-width: 10%">
            <p>+ ${i + 1}시간</p>
            <img src="${imageSrc}" class="card-img-top" alt="." />
            <div class="card-body">
                <h5 class="card-title">${
                   weatherHourlyDetails[i].Temperature.Value
                }</h5>
                <p class="card-text">${weatherHourlyDetails[i].Rain.Value}</p>
            </div>
        </div>
        </div>
   `
   }
}

const dailyRender = () => {
   let imageSrc = getImageSrc(
      `${weatherDailyDetails.DailyForecasts[0].Day.IconPhrase}`
   )
   console.log(imageSrc)

   document.querySelector('#day_summary').innerHTML = `<img src="${imageSrc}" />
                                       <h5 class="card-title">${weatherDailyDetails.DailyForecasts[0].Day.IconPhrase}</h5>
                                       <p class="card-text"><i class="fa-solid fa-temperature-three-quarters"></i> ${weatherDailyDetails.DailyForecasts[0].Day.WetBulbTemperature.Minimum.Value}° / ${weatherDailyDetails.DailyForecasts[0].Day.WetBulbTemperature.Maximum.Value}°</p>
                                       <p class="card-text"><i class="fa-solid fa-droplet"></i> ${weatherDailyDetails.DailyForecasts[0].Day.RainProbability}%</p>
                                       <p class="card-text"><i class="fa-solid fa-wind"></i> ${weatherDailyDetails.DailyForecasts[0].Day.Wind.Speed.Value}</p>`

   imageSrc = getImageSrc(
      `${weatherDailyDetails.DailyForecasts[0].Night.IconPhrase}`
   )
   console.log(imageSrc)

   document.querySelector(
      '#night_summary'
   ).innerHTML = `<img src="${imageSrc}" />
                                       <h5 class="card-title">${weatherDailyDetails.DailyForecasts[0].Night.IconPhrase}</h5>
                                       <p class="card-text"><i class="fa-solid fa-temperature-three-quarters"></i> ${weatherDailyDetails.DailyForecasts[0].Night.WetBulbTemperature.Minimum.Value}° / ${weatherDailyDetails.DailyForecasts[0].Night.WetBulbTemperature.Maximum.Value}°</p>
                                       <p class="card-text"><i class="fa-solid fa-droplet"></i> ${weatherDailyDetails.DailyForecasts[0].Night.RainProbability}%</p>
                                       <p class="card-text"><i class="fa-solid fa-wind"></i> ${weatherDailyDetails.DailyForecasts[0].Night.Wind.Speed.Value}</p>`

   document.querySelector(
      '#etc_sun'
   ).innerHTML = `<img src="../assets/image/sun.png" alt="." />
                                       <h5 class="card-title">일출 / 일몰</h5>
                                       <p class="card-text"><i class="fa-solid fa-caret-up"></i> ${moment(
                                          weatherDailyDetails.DailyForecasts[0]
                                             .Sun.Rise
                                       ).format('LLL')}</p>
                                       <p class="card-text"><i class="fa-solid fa-caret-down"></i> ${moment(
                                          weatherDailyDetails.DailyForecasts[0]
                                             .Sun.Set
                                       ).format('LLL')}</p>`

   document.querySelector(
      '#etc_air'
   ).innerHTML = `<img src="../assets/image/air.png" alt="." />
                                       <h5 class="card-title">대기</h5>
                                       <p class="card-text"><i class="fa-solid fa-person-running"></i> ${weatherDailyDetails.DailyForecasts[0].AirAndPollen[0].Category}</p>
                                       <p class="card-text"><i class="fa-regular fa-sun"></i> ${weatherDailyDetails.DailyForecasts[0].AirAndPollen[5].Category}</p>`
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
      return '../assets/image/icon_lightning.svg'
   } else if (text.includes('짙은구름')) {
      return '../assets/image/icon_cloud2.svg'
   } else if (text.includes('추움') || text.includes('바람')) {
      return '../assets/image/icon_wind.svg'
   }
}

// 3. 유저는 현재위치를 볼 수 있다.
// 3-1. 그리고 수정버튼을 클릭 시 현재 위치를 변경할 수 있다.
// 4. 유저는 현재 날씨(온도 및 기상상활)을 확인 할 수 있다.
//4-1. 유저는 현재 기상상황을 배경이미지로 확인 할 수 있다.(구현가능시)
// 5. 유저는 시간대 별 예보를 볼 수 있다.
// 6. 유저는 일출 시간, 일몰 시간을 볼 수 있다.
// 7. 유저는 대기질을 확인 할 수 있다.
// 8. 유저는 알레르기에 관한 문구를 확인 할 수 있다.
