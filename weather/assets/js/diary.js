// 유저가 캘린더에서 날짜를 선택하면 해당하는 날짜에 등록된 일기를 볼 수 있다.
// 일기를 작성하고, 감정 이모티콘을 선택하여 그 날의 기분을 선택할 수 있다.
// 등록하기 버튼을 눌러 해당 일자에 일기를 등록할 수 있다.
// 등록이 완료된 일기는 삭제하기 버튼을 눌러 삭제할 수 있다.
// 일기의 내용이나 감정 이모티콘이 입력되지 않았을 땐 등록하기, 삭제하기 버튼이 비활성화 된다.
// 일기의 내용이나 감정 이모티콘이 입력되었으나 등록되지 않은 상태에서는 삭제하기 버튼만 비활성화 된다.

let diaryText = document.getElementById("exampleFormControlTextarea1")
let addButton = document.getElementById("submit_btn")
let deleteButton = document.getElementById("delete_btn")
let emotionContent = document.querySelector(".emotion_content")

let diaryList = []
let myEmotion = ""

const addDiary = () => {
    let diaryObject = diaryText.value
    diaryList.push({ content: diaryObject, emotion: myEmotion })
    
    console.log(`일기 내용 : ${diaryObject}`)
    console.log(`감정 : ${myEmotion}`)
}
addButton.addEventListener("click", addDiary)

const getSelectedEmotion = () => {
    emotionContent.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            myEmotion = event.target.textContent
        }
    })
}
getSelectedEmotion()

function render(diary, emotion) {
    let resultHTML = " "
    resultHTML += `${diaryObject},${myEmotion}`
    document.getElementById("renderArea").innerHTML =resultHTML
}