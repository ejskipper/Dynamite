const f = require('./functions.js');

function response(move) {
    switch (move) {
        case 'R': return 'S';
        case 'P': return 'R';
        case 'S': return 'P';
        case 'D': return 'W';
        case 'W': return 'P';
    }
}

class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds[0]) {
            const previousMove = f.getTheirPreviousMove(gamestate);
            return response(previousMove);
        } else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();
