//counter the antiCounterBot :O

const f = require('./functions.js');

class Bot {
    makeMove(gamestate) {
        
        if (gamestate.rounds[0]) {
            const theirPreviousMove = f.getTheirPreviousMove(gamestate);
            const theyPredictMyMove = f.counterMove(theirPreviousMove);
            const theirPredictedMove = f.counterMove(theyPredictMyMove);
            return f.counterMove(theirPredictedMove);

        } else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();
