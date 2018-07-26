function getMyPreviousMove(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    const previousMove = gamestate.rounds[lastRound].p1;
    return previousMove;
}

function getTheirPreviousMove(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    const previousMove = gamestate.rounds[lastRound].p2;
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

function getTestResponse(gamestate) {
    let testResponse = [];
    for (i=1; i<16; i++) {
        testResponse.push(gamestate.rounds[i].p2);
    }
    return testResponse;
}

function areTheirLastFourSame(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    const lastFour = [ gamestate.rounds[lastRound].p2, gamestate.rounds[lastRound-1].p2, gamestate.rounds[lastRound-2].p2, gamestate.rounds[lastRound-3].p2 ];
    const allEqual = !!lastFour.reduce(function(a, b){ return (a === b) ? a : NaN; });
    return allEqual;
}

module.exports = {getMyPreviousMove,getTheirPreviousMove,counterMove,getTestResponse,areTheirLastFourSame};