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

class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds.length === 0) {                //Set dynamite counter
            Bot.dynamite = 100;
        }

        const testSequence = ['R','R','S','R','R','R','P','P','S','P','P','P','S','R','S'];     //Define the test sequence
        
        if (gamestate.rounds.length < 15) {                             //Play the test sequence first
            return testSequence[gamestate.rounds.length];
        }

        if (gamestate.rounds.length === 15) {                           //Play dynamite while getting last element of test response
            Bot.dynamite--;
            return 'D';
        }
        
        if (gamestate.rounds.length === 16) {
            Bot.testResponse = getTestResponse(gamestate);              //Get the test response
        }
        
        if (Bot.testResponse === 
        [ 'P', 'P', 'R', 'P', 'P', 'P', 'S', 'S', 'R', 'S', 'S', 'S', 'R', 'P', 'R' ]) {    //If they're playing counterBot...
            const myPreviousMove = getMyPreviousMove(gamestate);
            const theirPredictedMove = counterMove(myPreviousMove);
            return counterMove(theirPredictedMove);
        }

        if (Bot.testResponse ===
        [ 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R' ]       //If they're playing antiCounterBot...
        || Bot.testResponse ===
        [ 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P' ]
        || Bot.testResponse ===
        [ 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S', 'P', 'R', 'S' ]) {
            const theirPreviousMove = getTheirPreviousMove(gamestate);
            const theyPredictMyMove = counterMove(theirPreviousMove);
            const theirPredictedMove = counterMove(theyPredictMyMove);
            return counterMove(theirPredictedMove);
        }


        const rand = Math.random();                             //Randomly play dynamite
        if (rand > 0.9 && Bot.dynamite > 0) {
            Bot.dynamite--;
            return 'D';
        }

         else {                                                                     //Play a random move
            const myArray = ['R','P','S']; 
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();

