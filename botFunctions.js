const f = require('./functions.js');

function randomRPSBot() {  
       const myArray = ['R','P','S'];
        let rand = myArray[Math.floor(Math.random() * myArray.length)];
        return rand;
}

function counterBot(gamestate) {
        const previousMove = f.getTheirPreviousMove(gamestate);
        return f.counterMove(previousMove);
}

function antiCounterBot(gamestate) {
        const myPreviousMove = f.getMyPreviousMove(gamestate);
        const theirPredictedMove = f.counterMove(myPreviousMove);
        return f.counterMove(theirPredictedMove);
}

function metaBot(gamestate) {
        const theirPreviousMove = f.getTheirPreviousMove(gamestate);
        const theyPredictMyMove = f.counterMove(theirPreviousMove);
        const theirPredictedMove = f.counterMove(theyPredictMyMove);
        return f.counterMove(theirPredictedMove);
}

function antiMetaBot(gamestate) {
        const myPreviousMove = f.getMyPreviousMove(gamestate);
        const theirPredictedMove = f.counterMove(myPreviousMove);
        const theyPredictMyMove = f.counterMove(theirPredictedMove);
        const whatIReallyPredict = f.counterMove(theyPredictMyMove);
        return f.counterMove(whatIReallyPredict);
}

function weirdBot(gamestate) {
        const myPreviousMove = f.getMyPreviousMove(gamestate);
        let predictedMove;
        switch (myPreviousMove) {
                case 'R': predictedMove = 'S'; break;
                case 'P': predictedMove = 'R'; break;
                case 'S': predictedMove = 'P'; break;
                case 'D': predictedMove = 'W'; break;
                case 'W': predictedMove = 'P'; break;
        }
        return f.counterMove(predictedMove);
}

module.exports = {randomRPSBot,counterBot,antiCounterBot,metaBot,antiMetaBot,weirdBot};