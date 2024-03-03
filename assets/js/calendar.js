const calendar = document.querySelector('.calendar'),
   date = document.querySelector('.date'),
   daysContainer = document.querySelector('.days'),
   prev = document.querySelector('.prev'),
   next = document.querySelector('.next'),
   todayBtn = document.querySelector('.today-btn'),
   gotoBtn = document.querySelector('.goto-btn'),
   dateInput = document.querySelector('.date-input'),
   eventDay = document.querySelector('.event-day'),
   eventDate = document.querySelector('.event-date'),
   eventsContainer = document.querySelector('.events')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()
export let diaryLists = []

const months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
]

const eventsArr = []
getEvents()
console.log(eventsArr)

// Initialize the calendar
// Initialize the calendar
function initCalendar() {
   const firstDay = new Date(year, month, 1)
   const lastDay = new Date(year, month + 1, 0)
   const prevLastDay = new Date(year, month, 0)
   const prevDays = prevLastDay.getDate()
   const lastDate = lastDay.getDate()
   const day = firstDay.getDay()
   const nextDays = 7 - lastDay.getDay() - 1

   date.innerHTML = months[month] + ' ' + year

   let days = ''

   for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`
   }

   for (let i = 1; i <= lastDate; i++) {
      // Check if event is present on that day
      let event = false
      eventsArr.forEach((eventObj) => {
         if (
            eventObj.day === i &&
            eventObj.month === month + 1 &&
            eventObj.year === year
         ) {
            event = true
         }
      })
      if (
         i === new Date().getDate() &&
         year === new Date().getFullYear() &&
         month === new Date().getMonth()
      ) {
         activeDay = i
         getActiveDay(i)
         updateEvents(i)
         if (event) {
            days += `<div class="day today active event">${i}</div>`
         } else {
            days += `<div class="day today active">${i}</div>`
         }
      } else {
         if (event) {
            days += `<div class="day event">${i}</div>`
         } else {
            days += `<div class="day ">${i}</div>`
         }
      }
   }

   for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`
   }
   daysContainer.innerHTML = days
   addListner()
}

// Function to add month and year on prev and next button
function prevMonth() {
   month--
   if (month < 0) {
      month = 11
      year--
   }
   initCalendar()
}

function nextMonth() {
   month++
   if (month > 11) {
      month = 0
      year++
   }
   initCalendar()
}

prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

initCalendar()

// Function to add active on day
// Function to add active on day
function addListner() {
   const days = document.querySelectorAll('.day')
   days.forEach((day) => {
      day.addEventListener('click', (e) => {
         getActiveDay(e.target.innerHTML)
         updateEvents(Number(e.target.innerHTML))
         activeDay = Number(e.target.innerHTML)
         // Remove active
         // Remove active
         days.forEach((day) => {
            day.classList.remove('active')
         })
         // If clicked prev-date or next-date switch to that month
         // If clicked prev-date or next-date switch to that month
         if (e.target.classList.contains('prev-date')) {
            prevMonth()
            // Add active to clicked day after month is changed
            // Add active to clicked day after month is changed
            setTimeout(() => {
               // Add active where no prev-date or next-date
               const days = document.querySelectorAll('.day')
               days.forEach((day) => {
                  if (
                     !day.classList.contains('prev-date') &&
                     day.innerHTML === e.target.innerHTML
                  ) {
                     day.classList.add('active')
                  }
               })
            }, 100)
         } else if (e.target.classList.contains('next-date')) {
            nextMonth()
            // Add active to clicked day after month is changed
            setTimeout(() => {
               const days = document.querySelectorAll('.day')
               days.forEach((day) => {
                  if (
                     !day.classList.contains('next-date') &&
                     day.innerHTML === e.target.innerHTML
                  ) {
                     day.classList.add('active')
                  }
               })
            }, 100)
         } else {
            e.target.classList.add('active')
         }
      })
   })
}

todayBtn.addEventListener('click', () => {
   today = new Date()
   month = today.getMonth()
   year = today.getFullYear()
   initCalendar()
})

dateInput.addEventListener('input', (e) => {
   dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
   if (dateInput.value.length === 2) {
      dateInput.value += '/'
   }
   if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7)
   }
   if (e.inputType === 'deleteContentBackward') {
      if (dateInput.value.length === 3) {
         dateInput.value = dateInput.value.slice(0, 2)
      }
   }
})

gotoBtn.addEventListener('click', gotoDate)

function gotoDate() {
   console.log('here')
   const dateArr = dateInput.value.split('/')
   if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
         month = dateArr[0] - 1
         year = dateArr[1]
         initCalendar()
         return
      }
   }
   alert('Invalid Date')
}

// Function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
   const day = new Date(year, month, date)
   const dayName = day.toString().split(' ')[0]
   eventDay.innerHTML = dayName
   eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
}

// Function update events when a day is active
function updateEvents(date) {
   let events = ''
   eventsArr.forEach((event) => {
      if (
         date === event.day &&
         month + 1 === event.month &&
         year === event.year
      ) {
         event.events.forEach((event) => {
            events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`
         })
      }
   })
   if (events === '') {
      events = ``
   }
   eventsContainer.innerHTML = events
   saveEvents()
}

function saveEvents() {
   localStorage.setItem('events', JSON.stringify(eventsArr))
}

// Function to get events from local storage
function getEvents() {
   //check if events are already saved in local storage then return event else nothing
   if (localStorage.getItem('events') === null) {
      return
   }
   eventsArr.push(...JSON.parse(localStorage.getItem('events')))
}

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('diary-form')
   const contentInput = document.getElementById('diary-content')
   const diaryList = document.getElementById('diary-list')
   const emotionButtons = document.querySelectorAll('.btn-light') // 이모지 버튼 선택

   let selectedEmojiSrc = '' // 선택된 이모지의 이미지 경로를 저장하는 변수

   //이모지 버튼 클릭 시 선택된 이모지의 이미지 경로를 저장합니다.
   emotionButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
         //이모지 버튼 클릭 시, 상태 계속해서 변경해줍니다. (클릭 시마다 디폴트 버튼, on 버튼으로 변경)
         if (button.classList.contains('on')) {
            // 이미 선택된 버튼을 다시 클릭하면 선택 해제합니다. (on 삭제)
            button.classList.remove('on')
            selectedEmojiSrc = ''
         } else {
            //선택한 버튼의 .on이 붙은 클래스로 가져옵니다.
            emotionButtons.forEach((btn) => btn.classList.remove('on'))
            button.classList.add('on')

            //가져온 클래스의 이미지 url로 Src 속성을 저장합니다.
            const buttonOnStyle = window.getComputedStyle(button)
            selectedEmojiSrc = buttonOnStyle
               .getPropertyValue('background-image')
               .slice(5, -2)
         }
      })
   })

   form.addEventListener('submit', function (event) {
      event.preventDefault()

      const content = contentInput.value.trim()
      if (content === '') {
         alert('일기 내용을 입력하세요.')
         return
      }

      // 날짜 기록
      const timesDate = new Date()
      const timesHour = timesDate.getHours()
      const timesMinutes = timesDate.getMinutes()
      const timestamp = `${timesHour} : ${timesMinutes}`

      saveDiary(content, timestamp, selectedEmojiSrc)
      contentInput.value = ''
      // 일기를 저장한 후, 선택한 이모지 초기화하도록 합니다.
      selectedEmojiSrc = ''
      emotionButtons.forEach((button) => button.classList.remove('on'))
   })

   function saveDiary(content, timestamp, selectedEmojiSrc) {
      // 저장된 일기를 어딘가에 저장하는 로직을 추가할 수 있습니다.
      const diaryItem = createDiaryItem(content, timestamp, selectedEmojiSrc)
      diaryList.appendChild(diaryItem)
   }

   function createDiaryItem(content, timestamp, selectedEmojiSrc) {
      // 이모지 예외 처리합니다. (선택된 이모지 없을 시(즉, 별도 지정된 src 없을 시) 이모지 제외 처리)
      let emojiContent = !selectedEmojiSrc
         ? ''
         : `<div class="diary-emoji"><img src="${selectedEmojiSrc}" alt="이모지" /></div>`

      const itemHTML = `
    <div class="diary-item">
      <div class="diary-itemBox">
        ${emojiContent}
        <div class="diary-contentWrap">
          <p class="diary-content">${content}</p>
          <p class="diary-timestamp">${timestamp}</p>
        </div>
      </div>
      <div class="diary-close"></div>
    </div>
  `

      diaryWrap.classList.remove('on')

      // 생성한 HTML 문자열을 DOM 요소로 변환
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = itemHTML.trim()

      // diary-close에 클릭 이벤트 리스너 추가
      tempDiv
         .querySelector('.diary-close')
         .addEventListener('click', diaryClose)

      // 첫 번째 자식 요소를 반환
      return tempDiv.firstChild
   }
})

//팝업으로 띄우기
let diaryWrap = document.querySelector('.diary-wrap')
let writingBtn = document.querySelector('.writing_btn')
let diaryWrapDim = document.querySelector('.diary-wrap .dim')

writingBtn.addEventListener('click', diaryWriteEvent)
diaryWrapDim.addEventListener('click', dimClose2)

function diaryWriteEvent() {
   if (diaryWrap.classList.contains('on')) {
      diaryWrap.classList.remove('on')
   } else {
      diaryWrap.classList.add('on')
   }
}

function dimClose2() {
   diaryWrap.classList.remove('on')
}

// diary-item을 삭제하는 함수
function diaryClose(e) {
   const diaryItem = e.target.closest('.diary-item')
   diaryItem.remove()
}
