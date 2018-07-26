const f = require('./functions');
const behaviour = require('./botFunctions');

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
            Bot.testResponse = f.getTestResponse(gamestate);              //Get the test response
        }
        
        // console.log(Bot.testResponse.toString());             //To identify the response pattern of different bots

        const rand = Math.random();                             //Randomly play dynamite
        if (rand > 0.9 && Bot.dynamite > 0) {
            Bot.dynamite--;
            return 'D';
        }
                                            
        if (Bot.testResponse.toString() === 'P,P,R,P,P,P,S,S,R,S,S,S,R,P,R') {    //If they're playing counterBot...
            const nextMove = behaviour.antiCounterBot(gamestate);
            return nextMove;
        }

        if (Bot.testResponse.toString() === 'S,P,R,S,P,R,S,P,R,S,P,R,S,P,R' ||       // If they're playing antiCounterBot...
        Bot.testResponse.toString() === 'R,S,P,R,S,P,R,S,P,R,S,P,R,S,P'||
        Bot.testResponse.toString() === 'P,R,S,P,R,S,P,R,S,P,R,S,P,R,S') {
            const nextMove = behaviour.metaBot(gamestate);
            return nextMove;
        }

        if (Bot.testResponse.toString() === 'R,R,S,R,R,R,P,P,S,P,P,P,S,R,S') {       //If they're playing metaBot...
            const nextMove = behaviour.antiMetaBot(gamestate);
            return nextMove;
        }

        if (Bot.testResponse.toString() === 'S,S,P,S,S,S,R,R,P,R,R,R,P,S,P') {      //Honestly idk why their bot would do this
            const nextMove = behaviour.weirdBot(gamestate);
            return nextMove;
        }

        if (f.areTheirLastFourSame(gamestate) === true) {
            Bot.theyAreSpamming = f.getTheirPreviousMove(gamestate);
            Bot.spammingRound = gamestate.rounds.length;
            return f.counterMove(f.getTheirPreviousMove(gamestate));
        }

        if (Bot.spammingRound > gamestate.rounds.length-4) {
            return f.counterMove(Bot.theyAreSpamming);
        }

         else {                                                                     //Play a random move
            const myArray = ['R','P','S']; 
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();

