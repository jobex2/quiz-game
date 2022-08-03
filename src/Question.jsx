import { useEffect, useState } from 'react'

function Question({question, correctAnswer, incorrectAnswers, checkAnswer, questionNumber}) {
    //combine answers into one array
    const [answers, setAnswers] = useState([correctAnswer, ...incorrectAnswers])

    // ranodmize array
    useEffect(() => {
        setAnswers(prev => {
            return (prev.sort(() => Math.random()-.5))
        })
    },[])

    //map answers to buttons
    const mapedAnswers = answers.map((answer, index) => {
            return <button 
                        key={index}
                        value={decodeURIComponent(answer)}
                        onClick={(e) => checkAnswer(e.target.value, questionNumber)}
                        >
                        
                        {decodeURIComponent(answer)} 
                    </button>
        })
    
   
    return ( 
        <div className="question">
            <h1 className="question--text">{decodeURIComponent(question)}</h1>
            <div className="answer--buttons">
                {mapedAnswers}
            </div>
        </div>
     );
}

export default Question;