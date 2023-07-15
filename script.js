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

// starting the game at the beginning

function start(){
   startBody = document.getElementById('start-quiz');
   startBody.style.display = 'none';
   document.getElementById('card-body').style.display = '';
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

    ifTmeplatesForTheAnswerFuncion(answer, answerValue, random, rightAnswer, selectedQuestNum);
   

   //  when the answer has been answered, the Button to the next Question should be enabled.
    btn.disabled = false;

   //  run this function so that the answers are clickable
    disabledAnswerTOTrue();
}



function ifTmeplatesForTheAnswerFuncion(answer, answerValue, random, rightAnswer, selectedQuestNum){
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
}

// switch to the next Question

function nextQuestion() {
    currentQuestion++;
    widthOfProgress = currentQuestion / questions.length * 100;
    if(currentQuestion >= 10){
      endScreen();
    } else{
    document.getElementById('my-btn').disabled = true;
    disabledAnswerTOFalse();
    resetAnswerButton();
    ShowCurrentQuestion();
}
}


// When the user has clicked on 'Next Question', the b-g's of the answers should remove
function resetAnswerButton(){
   document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}

// every time when an answer is clicked, the answers should not be cklickable any more

function disabledAnswerTOTrue(){
   document.getElementById('answer_1').parentNode.classList.add('disabled-answers');
   document.getElementById('answer_2').parentNode.classList.add('disabled-answers');
   document.getElementById('answer_3').parentNode.classList.add('disabled-answers');
   document.getElementById('answer_4').parentNode.classList.add('disabled-answers');
}

// making the answers clickable th the new Question

function disabledAnswerTOFalse(){
   document.getElementById('answer_1').parentNode.classList.remove('disabled-answers');
   document.getElementById('answer_2').parentNode.classList.remove('disabled-answers');
   document.getElementById('answer_3').parentNode.classList.remove('disabled-answers');
   document.getElementById('answer_4').parentNode.classList.remove('disabled-answers');
}


//Showing the end screen, when the user is done

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


// restarting the Quiz if the 'reply' button is clicked

function reply(){
    correctAnswers = 0;
    currentQuestion = 0;
    widthOfProgress = 0;
    document.getElementById('card-body').style.display = '';
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('logo').src = './Quizapp/logo.png';
    init();
    disabledAnswerTOFalse();
    ShowCurrentQuestion();
    resetAnswerButton();
    start(); 
}






