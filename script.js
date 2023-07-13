let questions = [
    {
       "question" : "Welche der folgenden Sprachen ist KEINE Frontend-Sprache?",
       "answer_1" : "HTML",
       "answer_2" : "CSS",
       "answer_3" : "JavaScript",
       "answer_4" : "PHP",
       "right_answer" : 4
    },

    {
        "question" : "Welche Methode wird verwendet, um ein Element mit JavaScript zu selektieren?",
        "answer_1" : "getElementById()",
        "answer_2" : "selectElement()",
        "answer_3" : "querySelector()",
        "answer_4" : "findElement()",
        "right_answer" : 1
     },

     {
        "question" : "Welche der folgenden Aussagen über Responsive Webdesign ist korrekt?",
        "answer_1" : "Es bezieht sich auf die Entwicklung von mobilen Apps.",
        "answer_2" : "Es ermöglicht die Anpassung einer Website an verschiedene Geräte und Bildschirmgrößen.",
        "answer_3" : "Es ist nur relevant für Backend-Entwickler",
        "answer_4" : "Es beinhaltet die Verwendung von Tabellenlayouts.",
        "right_answer" : 2
     },

     {
        "question" : "Welches Protokoll wird verwendet, um Daten zwischen dem Webbrowser und dem Webserver zu übertragen?",
        "answer_1" : "HTTP",
        "answer_2" : "HTML",
        "answer_3" : "HTTPS",
        "answer_4" : "FTP",
        "right_answer" : 1
     },

     {
        "question" : "Welches der folgenden Tools wird zur Versionskontrolle in der Webentwicklung verwendet?",
        "answer_1" : "HTML",
        "answer_2" : "Photoshop",
        "answer_3" : "GIT",
        "answer_4" : "jQuery",
        "right_answer" : 3
     },

     {
        "question" : "Welche der folgenden CSS-Eigenschaften wird verwendet, um den Abstand zwischen Elementen zu kontrollieren?",
        "answer_1" : "position",
        "answer_2" : "border",
        "answer_3" : "margin",
        "answer_4" : "padding",
        "right_answer" : 4
     },

     {
        "question" : "Welche der folgenden Funktionen wird verwendet, um eine API-Anfrage mit JavaScript zu senden?",
        "answer_1" : "fetch()",
        "answer_2" : "sendRequest()",
        "answer_3" : "httpRequest()",
        "answer_4" : "ajax()",
        "right_answer" : 1
     },

     {
        "question" : "Welche der folgenden Aussagen über Cookies ist korrekt?",
        "answer_1" : "Sie werden zur Verschlüsselung von Daten verwendet.",
        "answer_2" : "Sie dienen zur Speicherung von Benutzerinformationen auf dem Client",
        "answer_3" : "Sie werden verwendet, um JavaScript-Code auszuführen.",
        "answer_4" : "Sie sind veraltet und werden nicht mehr verwendet.",
        "right_answer" : 2
     },

     {
        "question" : "Welches der folgenden Frameworks wird für die Entwicklung von Single-Page-Anwendungen verwendet?",
        "answer_1" : "Django",
        "answer_2" : "Bootstrap",
        "answer_3" : "Angular",
        "answer_4" : "Laravel",
        "right_answer" : 3
     },

     {
        "question" : "Welche der folgenden Dateitypen wird für animierte Grafiken im Web verwendet?",
        "answer_1" : "GIF",
        "answer_2" : "JPG",
        "answer_3" : "PNG",
        "answer_4" : "SVG",
        "right_answer" : 1
     }

];

let correctAnswers = 0;
let currentQuestion = 0;

let commentToRightAsnwers = [
'Richtig!',
'Perfekt!',
'Ausgezeichnet!',
'Du hast es geschafft!',
'Das ist korrekt!',
'Bravo!',
'Gut gemacht!',
'Fantastisch!',
'Genau richtig!',
'Du bist auf dem richtigen Weg!'
];


let commentToFalseAnswers = [  
'Leider falsch.',
'Das ist nicht korrekt.',
'Nicht ganz richtig.',
'Falsche Antwort.',
'Versuche es noch einmal.',
'Das war leider nicht richtig.',
'Das ist nicht die richtige Antwort.',
'Falsch geraten.',
'Nicht die richtige Lösung.',
'Leider nicht richtig.'
];

let widthOfProgress = 0;

let succesSound = new Audio('/audio/success.mp3');
let wrongSound = new Audio('/audio/wrong.mp3');

// intialize the content
function init(){
    document.getElementById('question-length').innerHTML = questions.length;
    document.getElementById('card-body').style.display = 'none';
    ShowCurrentQuestion();
}

// Showing the questions and the answers to the users 

function ShowCurrentQuestion(){
   
    document.getElementById('current-question-length').innerHTML = currentQuestion + 1;
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('progress-bar').innerHTML = `${widthOfProgress}%`;
    document.getElementById('progress-bar').style.width = `${widthOfProgress}%`;
    document.getElementById('feed-back').innerHTML= ``;

}



//checking if the answer is correct or false
function answer(answerValue){
    let random = Math.floor(Math.random() * 10);
    let question = questions[currentQuestion];
    let selectedQuestNum = answerValue.slice(-1);
    let answer = question['right_answer'];
    let rightAnswer = `answer_${answer}`;
    let btn = document.getElementById('my-btn');

    if(selectedQuestNum == answer){
        succesSound.play()
        document.getElementById('feed-back').innerHTML = commentToRightAsnwers[random];
        document.getElementById(answerValue).parentNode.classList.add('bg-success');
        correctAnswers++;
    } else{
      wrongSound.play();
      document.getElementById('feed-back').innerHTML = commentToFalseAnswers[random];
      document.getElementById(answerValue).parentNode.classList.add('bg-danger');

      //   if the answer is false, show the right answer
        document.getElementById(rightAnswer).parentNode.classList.add('bg-success');

    }

   //  when the answer has been answered, the Button to the next Question should be enabled.
    btn.disabled = false;
    saveQuiz();
    
}


function nextQuestion() {
    currentQuestion++;
    widthOfProgress = currentQuestion / questions.length * 100;
    if(currentQuestion >= 10){
      endScreen();
    } else{
    document.getElementById('my-btn').disabled = true;
    resetAnswerButton();
    ShowCurrentQuestion();
}
saveQuiz();

}


function resetAnswerButton(){
   document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}


function endScreen(){
   if(correctAnswers >= 5){
      document.getElementById('end-comment').innerHTML = 'Du hast es bestanden!';
   } else{
      document.getElementById('end-comment').innerHTML = 'Versuch es nochmal!';
      document.getElementById('tropy').style.display = 'none';
   }
   endSeceenTmeplate();
}


function endSeceenTmeplate(){
   document.getElementById('card-body').style.display = 'none';
   document.getElementById('end-screen').classList.remove('d-none');
   document.getElementById('end-result').innerHTML= correctAnswers;
   document.getElementById('all-questions').innerHTML = questions.length;
   document.getElementById('logo').src = './Quizapp/brain-result.png';
}


function reply(){
    correctAnswers = 0;
    currentQuestion = 0;
    widthOfProgress = 0;
    document.getElementById('card-body').style.display = '';
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('logo').src = './Quizapp/logo.png';
    init();
    ShowCurrentQuestion();
    resetAnswerButton();
    start();    

}


function start(){
   startBody = document.getElementById('start-quiz');
   startBody.style.display = 'none';
   document.getElementById('card-body').style.display = '';
}


