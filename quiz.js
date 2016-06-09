/* global $*/

var questions = new Array()
questions[0] = ['Where do the Simpsons live?']
questions[1] = ['Who founded the Simpson hometown?']
questions[2] = ['What is the name of the Simpsons neighbour?']
questions[3] = ['Who is the most famous clown in town?']
questions[4] = ['Who is the assistant to Mr Burns?']
questions[5] = ['What is the name of the school bus driver?']
questions[6] = ['What is the first name of Chief Wiggum?']
questions[7] = ['Who runs the Kwik-E-Mart?']
//
var choices = new Array()
choices[0] = ['Shelbyville', 'Springfield', 'Honeyville', 'Dunkintown']
choices[1] = ['Chester Shelby', 'Jebadiah Springfield', 'Sonny Hoolahan', 'Bud Gringe']
choices[2] = ['Ned Flanders', 'Mr Burns', 'Principal Skinner', 'Barney Gumble']
choices[3] = ['Bongo', 'Krusty', 'Gabbo', 'Sideshow Bob']
choices[4] = ['Ned Flanders', 'Bernard Gumble', 'Seymour Skinner', 'Waylon Smithers']
choices[5] = ['Blotto', 'Bernie', 'Otto', 'Scotto']
choices[6] = ['Clancey', 'Charley', 'Cletus', 'Clay']
choices[7] = ['Apu', 'Ali', 'Muthu', 'Jeb']

var answers = new Array()
answers[0] = 1
answers[1] = 1
answers[2] = 0
answers[3] = 1
answers[4] = 3
answers[5] = 2
answers[6] = 0
answers[7] = 0

var player = 1
var player1Score = 0
var player2Score = 0
var currentQn = 0

var currentQuestion = function () {
  return currentQn
}
var numberOfQuestions = function () {
  return questions.length
}

function isGameOver () {
  if (whoWon() === 0) {
    return false
  } else {
    return true
  }
}

function whoWon () {
  if (currentQn === numberOfQuestions()) {
    if (player1Score > player2Score) {
      return 1
    } else if (player2Score > player1Score) {
      return 2
    } else if (player1Score === player2Score) {
      return 3
    }
  }
  return 0
}

function restart () {
  currentQn = 0
  player1Score = 0
  player2Score = 0
  player = 1
}
// Function to declare winner in game
var winner = function () {
  if (whoWon() === 1) {
    return 'Player 1 wins!'
  } else if (whoWon() === 2) {
    return 'Player 2 wins!'
  }
    else return 'It is a Draw!'
}
//
// var numberOfAnswers = function () {
//   return choices.length
// }
//
// var correctAnswer = function () {
//   return answers[currentQuestion()]
// }

var playTurn = function (choice) {
  if (isGameOver() === true) {
    return
  } else if (choice === answers[currentQuestion()]) {
    if (player === 1) {
      $('#player1Score').effect('highlight', 1000)
      player1Score++
      player = 2
      currentQn++
    } else {
      $('#player2Score').effect('highlight', 1000)
      player2Score++
      player = 1
      currentQn++
    }
    return true
  }
  if (choice !== answers[currentQuestion()]) {
    if (player === 1) {
      $('#player1Score').effect('highlight', {color: '#d0350e'}, 1000)
      player = 2
      currentQn++
    } else {
      if (player === 2) {
        $('#player2Score').effect('highlight', {color: '#d0350e'}, 1000)
        player = 1
        currentQn++
      }
    } return false
  }
}
// Function to update the display, and added effects if game is over
$(function () {
  function updateDisplay () {
    if (isGameOver()) {
      $('.question').toggleClass('hidden')
      $('.end').toggleClass('hidden')
      $('.end').effect('bounce', 2000)
      $('.end').html(' <div id="gameover">Game Over. ' + winner() + ' <br><p>RESTART</p></div>')
      $('.end').append('<img src="http://bestanimations.com/Cartoons/Simpsons/the-simpsons-animated-gif-4.gif" style="width:250px;height:250px;">')
      $('p').click(function () {
        restart()
        updateDisplay()
        $('.gameover').toggleClass('hidden')
        $('.end').toggleClass('hidden')
        $('.question').toggleClass('hidden')
        $('.question').effect('bounce', 2000)
      }
// Alternative effects if the game isn't over
    ) } else {
      $('.question').text(questions[currentQuestion()])
      $('button').eq(0).text(choices[currentQuestion()][0])
      $('button').eq(1).text(choices[currentQuestion()][1])
      $('button').eq(2).text(choices[currentQuestion()][2])
      $('button').eq(3).text(choices[currentQuestion()][3])

      if (player === 1) {
        setTimeout(function () {
          $('#player1Score').effect('bounce', 2000)
        }, 1000)
      } else {
        setTimeout(function () {
          $('#player2Score').effect('bounce', 2000)
        }, 1000)
      }
    }
    $('#player1Score').html('Player 1 <br>' + player1Score)
    $('#player2Score').html('Player 2 <br>' + player2Score)
    $('#title').html('THE SIMPSONS <br>QUIZ')
  }

  $('button').mouseover(function () {
    $(this).css('background-color', '#ff807b', 'font-style', 'underline')
  })
  $('button').mouseout(function () {
    $(this).css('background-color', '#fcd14e')
  })
  $('button').click(function () {
    if (isGameOver()) {
      restart()
    } else {
      playTurn($(this).index())
    }
    updateDisplay()
  })
  updateDisplay()
})
