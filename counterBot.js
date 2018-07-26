const f = require('./functions.js');

class Bot {
    makeMove(gamestate) {
        
        if (gamestate.rounds[0]) {
            const previousMove = f.getTheirPreviousMove(gamestate);
            return f.counterMove(previousMove);
        } else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();
