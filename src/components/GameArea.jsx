function GameArea({
    circlePosition,
    circleSize,
    circleColor,
    handleCircleClick,
    handleMissClick
}) {
    return (
        <div className="game-area"
            onClick={handleMissClick}
        >
            <div 
                className="circle"
                onClick={(e)=>{
                    e.stopPropagation();
                    handleCircleClick();
                }}
                style={{
                    width: circleSize,
                    height: circleSize,
                    backgroundColor: circleColor,
                    left: circlePosition.x,
                    top: circlePosition.y
                }}
            />
        </div>
    );
}

export default GameArea;