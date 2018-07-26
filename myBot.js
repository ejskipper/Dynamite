function getPreviousMove(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    const previousMove = gamestate.rounds[lastRound].p2;
    return previousMove;
}

function counterPreviousMove(gamestate) {
    const previousMove = getPreviousMove(gamestate);
    switch (previousMove) {
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
            return counterPreviousMove(gamestate);
        } else {
            return 'R';
        }
    }
}

module.exports = new Bot();
