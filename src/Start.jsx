function Start({startGame}) {
    return ( 
        <div className="start--screen">
            <h1 className="title">Quizzical</h1>
            <p>Answer five question to test your trivia knowledge!</p>
            <button 
                className="start--button"
                onClick={startGame}
            >Start Quiz
            </button>
        </div> 
    );
}

export default Start;