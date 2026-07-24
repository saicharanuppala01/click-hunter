function Settings({
    circleColor,
    setCircleColor,
    startGame
}) {
    return (
        <div style={{padding:"20px"}}>
            <h1>Click Hunter</h1>
            <label>
                Select Circle Color:
                <input
                    type="color"
                    value={circleColor}
                    onChange={(e)=>setCircleColor(e.target.value)}
                />
            </label>
            
            <br/> <br/>

            <button onClick={startGame}>
                Start Game
            </button>
        </div>
    );
}
export default Settings;