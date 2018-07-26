function getMyPreviousMove(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    const previousMove = gamestate.rounds[lastRound].p1;
    return previousMove;
}

function counterMove(move) {
    switch (move) {
        case 'R': return 'P';
        case 'P': return 'S';
        case 'S': return 'R';
        case 'D': return 'W';
        case 'W': return 'P';
    }
}

class Bot {
    makeMove(gamestate) {
        
        if (gamestate.rounds[0]) {
            const myPreviousMove = getMyPreviousMove(gamestate);
            const theirPredictedMove = counterMove(myPreviousMove);
            return counterMove(theirPredictedMove);

        } else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();
