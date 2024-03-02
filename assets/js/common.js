window.addEventListener('scroll', function () {
   var scrollPosition = window.scrollY || document.documentElement.scrollTop
   var weatherLogo = document.querySelector('.weather_logo')
   var header = document.querySelector('header')
   var topCategory = document.querySelector('.top_category')

   if (scrollPosition > 0) {
      header.classList.add('scroll')
      topCategory.classList.add('scroll')
   } else {
      // 그 외의 경우
      header.classList.remove('scroll')
      topCategory.classList.remove('scroll')
   }
})
let inputWrap = document.querySelector('.alarm_popup_wrap')
let dim = document.querySelector('.dim')

const openAlarmBox = () => {
   if (inputWrap.classList.contains('on')) {
      inputWrap.classList.remove('on')
   } else {
      inputWrap.classList.add('on')
   }
}
const dimClose = () => {
   inputWrap.classList.remove('on')
}

// 시간 선택 셀렉트 박스
const hourSelect = document.getElementById('hourSelect')
const minuteSelect = document.getElementById('minuteSelect')

// 시간 선택 박스 생성
for (let i = 0; i < 24; i++) {
   let hour = i < 10 ? '0' + i : i
   let hourOption = document.createElement('option')
   hourOption.text = hour
   hourOption.value = hour
   hourSelect.add(hourOption)
}

// 분 선택 박스 생성
for (let j = 0; j < 60; j += 5) {
   let minute = j < 10 ? '0' + j : j
   let minuteOption = document.createElement('option')
   minuteOption.text = minute
   minuteOption.value = minute
   minuteSelect.add(minuteOption)
}

const confirmAlarmBox = () => {
   alert(
      '알림이 설정되었어요!! 설정한 시간: ' +
         hourSelect.value +
         '시 ' +
         minuteSelect.value +
         '분'
   )
   inputWrap.classList.remove('on')
}
const closeAlarmBox = () => {
   alert('알림 설정을 취소하시겠습니까?')
   inputWrap.classList.remove('on')
}
