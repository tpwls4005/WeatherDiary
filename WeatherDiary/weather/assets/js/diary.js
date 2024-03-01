// 일기를 작성하고, 감정 이모티콘을 선택하여 그 날의 기분을 선택할 수 있다.
// 등록하기 버튼을 눌러 해당 일자에 일기를 등록할 수 있다.

let diaryText = document.getElementById("exampleFormControlTextarea1")
let addButton = document.getElementById("submit_btn")
let deleteButton = document.getElementById("delete_btn")
let emotionContent = document.querySelector(".emotion_content")

// 등록한 {content, emotion} 캘린더에 넘겨줘야한다
// let diaryList = []
let myEmotion = ""
addButton.disabled = true


const addDiary = () => {
	const newDiary = { 
        content: diaryText.value, 
        emotion: myEmotion,
        id: randomId()
    }
	diaryList.push(newDiary)
	if (newDiary.content.value > 0) {
		addButton.disabled = false
	}
	diaryText.value = ""
	myEmotion = ""
	addButton.disabled = true
	diaryText.focus()

	document.querySelectorAll(".emotion_content button").forEach(btn => {
		btn.classList.remove("btn-clicked")
	})
	alert(`saved!`)
	console.log(`일기 내용 : ${newDiary.content}
    감정 : ${newDiary.emotion}
    id : ${randomId()}`)
}
addButton.addEventListener("click", addDiary)

const getSelectedEmotion = () => {
	emotionContent.addEventListener("click", event => {
		if (event.target.tagName === "BUTTON") {
			
            const clickedEmotion = event.target.textContent

			const isClicked = event.target.classList.contains("btn-clicked")

			document.querySelectorAll(".emotion_content button").forEach(btn => {
				btn.classList.remove("btn-clicked")
			})
			if (!isClicked) {
				myEmotion = clickedEmotion
				event.target.classList.add("btn-clicked")
                addButton.disabled = false
			} else {
				myEmotion = ""
                addButton.disabled = true
			}
		}
	})
}

getSelectedEmotion()


function randomId() {
    return '-' + Math.random().toString(36).substr(2, 9)
}