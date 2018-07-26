const f = require('./functions.js');

class Bot {
    makeMove(gamestate) {
        
        if (gamestate.rounds[0]) {
            const myPreviousMove = f.getMyPreviousMove(gamestate);
            const theirPredictedMove = f.counterMove(myPreviousMove);
            const theyPredictMyMove = f.counterMove(theirPredictedMove);
            const whatIReallyPredict = f.counterMove(theyPredictMyMove);
            return f.counterMove(whatIReallyPredict);
        } else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}


module.exports = new Bot();