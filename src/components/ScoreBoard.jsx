function ScoreBoard({
    score,
    highScore,
    level,
    timeLeft
}){
    return (
        <div style={{
            display: 'flex',
            justifyContent: "center",
            gap: '20px',
            padding: '10px',
            flexWrap:"wrap"
        }}>
            <h3>Score: {score}</h3>
            <h3>High Score: {highScore}</h3>
            <h3>Time Left: {timeLeft}</h3>
        </div>
    );
}

export default ScoreBoard;