// let diaryText = document.getElementById("exampleFormControlTextarea1")
// let addButton = document.getElementById("submit_btn")
// let deleteButton = document.getElementById("delete_btn")
// let emotionButton = document.getElementById("emotionButton")
// let emotionContent = document.getElementById("emotionButton")

// if (emotionContent) {
//     emotionContent.addEventListener("click", event => {
//     })
// } else {
//     console.error("Cannot find the element with class 'btn.btn-outline-secondary.dropdown-toggle'");
// }

// console.log("나와요?")

// let diaryLists = []
// let myEmotion = ""
// addButton.disabled = true


// const addDiary = () => {
// 	const newDiary = { 
//         content: diaryText.value, 
//         emotion: myEmotion,
//         id: randomId()
//     }

// 		if (newDiary.content.length > 0) {
// 			diaryLists.push(newDiary)
// 			addButton.disabled = false
// 			diaryText.value = ""
// 			myEmotion = ""
// 			diaryText.focus()
// 			alert(`saved!`)
// 			renderDiary(diaryLists)
// 		}
	
// 	document.querySelectorAll(".emotion_content button").forEach(btn => {
// 		btn.classList.remove("btn-clicked")
// 	})
// 	console.log(`일기 내용 : ${newDiary.content}
//     감정 : ${newDiary.emotion}
//     id : ${randomId()}`)
// }
// addButton.addEventListener("click", addDiary)

// const selectEmotion = (imagePath) => {
// 	emotionButton.style.backgroundImage =`url(${imagePath})`
// }
// const getSelectedEmotion = () => {
// 	emotionContent.addEventListener("click", event => {
// 		if (event.target.tagName === "A") {
//             const clickedEmotion = event.target.textContent
// 			const isClicked = event.target.classList.contains("btn-clicked")

// 			document.querySelectorAll(".emotion_content button").forEach(btn => {
// 				btn.classList.remove("btn-clicked")
// 			})
// 			if (!isClicked) {
// 				myEmotion = clickedEmotion
// 				event.target.classList.add("btn-clicked")
   
// 			} else {
// 				myEmotion = ""
    
// 			}
// 		}
// 	})
// }

// getSelectedEmotion()

// function renderDiary (listOfDiary){
// 	let resultHTML  = " "
// 	// let newDiaryList = []
// 	for(let i = 0; i < listOfDiary.length; i++){
// 		if (listOfDiary[i].content.length > 0){
// 			resultHTML += `<div class="diary_list_box" id="diary_list">
// 			<div>${listOfDiary[i].content}</div>
// 			<button class="delete_diary_btn" onclick="diaryDelete('${listOfDiary[i].id}')"></button>
// 		  </div>`
// 		}
// 	}
// 	document.getElementById("diary_board").innerHTML = resultHTML
// }

// function diaryDelete (id) {
// 	let newDeleteList = []
// 	for (let i = 0; i < diaryLists.length; i++){
// 		let currentDiary = diaryLists[i]

// 		if (id != currentDiary.id) {
// 			newDeleteList.push(currentDiary)
// 		}
// 	}
// 	diaryLists = newDeleteList
// 	renderDiary(diaryLists)
// }

// function randomId() {
//     return '-' + Math.random().toString(36).substr(2, 9)
// }