import { useEffect, useState } from 'react'
import Question from './Question'
import Start from './Start'

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [questionData, setQuestionData] = useState([]);
  const [numberOfCorrectAnswers, SetNumberOfCorrectAnswers] = useState([
    false,false,false,false,false
  ])
  const [total, setTotal] = useState(0)
  const [showResults, setShowResults] = useState(false)

  //function to start game
  const startGame = () => {
    setGameStart(prevGameStart => !prevGameStart)
  }

  
  //fetch data and set state
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986')
    .then(res => res.json())
    .then (data => {
        setQuestionData(data.results)
        console.log(data.results)
    })
  },[])

  //check Answers
  const checkAnswer = (choice, index) => {
    if(choice === decodeURIComponent(questionData[index].correct_answer)) {
      SetNumberOfCorrectAnswers(prev=>{
        prev[index] = true
        return prev
      })
      console.log(numberOfCorrectAnswers)
    }
    else{
      SetNumberOfCorrectAnswers(prev=>{
        prev[index] = false
        return prev
      })
      console.log(numberOfCorrectAnswers)
    }
  }

  //map data to Question elemets
  const questionElements = questionData.map((question, index) => {
    return (<Question 
              key={index}
              questionNumber = {index}
              question={question.question}
              correctAnswer={question.correct_answer}
              incorrectAnswers={question.incorrect_answers}
              checkAnswer={checkAnswer}
          />)
  })


  const displayResults = () => {
    numberOfCorrectAnswers.forEach(result => {
      if(result){
        setTotal(prevTotal => prevTotal+1)
      }
      setShowResults(true)
      
    });
  }


  return (
    <div className="App">
      {!gameStart && <Start startGame={startGame}/>}
      {gameStart && questionElements}
      {(gameStart && !showResults) && <button className="check--button" onClick={displayResults}>
        Check answers</button>}
      {showResults &&  
      <div className='results'>
        You scored {total}/5 correct answers 
        <button className='play--again'>Play again</button>
      </div>}
    </div>
  )
}

export default App
