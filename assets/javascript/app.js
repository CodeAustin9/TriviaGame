var tenQuestions = [{
  question: "Normal adult dogs have how many teeth?",
  multipleChoice: ["24", "38", "42", "32"],
  answer: 2
}, {
  question: "Through which part of the body do dogs breathe?",
  multipleChoice: ["Mouth", "Ears", "Nose", "Paws"],
  answer: 3

}, {
  question: "What is a dog's most highly developed sense?",
  multipleChoice: ["Taste", "Smell", "Sight", "Touch"],
  answer: 1
}, {
  question: "Which dog breed is the smallest of them all?",
  multipleChoice: ["Dachshund", "Shih Tzu", "Pomeranian", "Chihuahua"],
  answer: 3
}, {
  question: "Which dog breed was once known as St. John's Newfoundland?",
  multipleChoice: ["Newfoundland", "Golden Retriever", "Labrador", "Puli"],
  answer: 2
}, {
  question: "The first dogs registered in the American Kennel Club belonged to what group?",
  multipleChoice: ["Herding", "Sporting", "Working", "Hound"],
  answer: 1
}, {
  question: "Which dog breed has a black tongue?",
  multipleChoice: ["Husky", "Labrador", "Weimaraner", "Chow chow"],
  answer: 3
}, {
  question: "Which dog yodels instead of barks?",
  multipleChoice: ["Komondor", "Otterhound", "Basenji", "Basset hound"],
  answer: 2
}, {
  question: "How old is the world's olders dog, an Australian cattle hound named Bluey, in human years?",
  multipleChoice: ["32", "27", "30", "29"],
  answer: 3
}, {
  question: "Which command is the most taught command to dogs?",
  multipleChoice: ["Stay", "Beg", "Sit", "Dance"],
  answer: 2
}
];


var tenArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userGuess;

var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	end: "This is how you did:"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & multiple choices
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+ tenQuestions.length);
	$('.question').html('<h2>' + tenQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(tenQuestions[currentQuestion].multipleChoice[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.multipleChoice').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userGuess = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1500);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = tenQuestions[currentQuestion].multipleChoice[tenQuestions[currentQuestion].answer];
	var rightAnswerIndex = tenQuestions[currentQuestion].answer;

	//checks to see correct, incorrect, or unanswered
	if((userGuess == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userGuess != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (tenQuestions.length-1)){
		setTimeout(scoreboard, 1500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 1500);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.end);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}










  




 


