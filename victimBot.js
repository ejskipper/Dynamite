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

function randomRPSBot() {  
    const myArray = ['R','P','S'];
     let rand = myArray[Math.floor(Math.random() * myArray.length)];
     return rand;
}

function counterBot(gamestate) {
     const previousMove = getTheirPreviousMove(gamestate);
     return counterMove(previousMove);
}

function antiCounterBot(gamestate) {
     const myPreviousMove = getMyPreviousMove(gamestate);
     const theirPredictedMove = counterMove(myPreviousMove);
     return counterMove(theirPredictedMove);
}

function metaBot(gamestate) {
     const theirPreviousMove = getTheirPreviousMove(gamestate);
     const theyPredictMyMove = counterMove(theirPreviousMove);
     const theirPredictedMove = counterMove(theyPredictMyMove);
     return counterMove(theirPredictedMove);
}

function antiMetaBot(gamestate) {
     const myPreviousMove = getMyPreviousMove(gamestate);
     const theirPredictedMove = counterMove(myPreviousMove);
     const theyPredictMyMove = counterMove(theirPredictedMove);
     const whatIReallyPredict = counterMove(theyPredictMyMove);
     return counterMove(whatIReallyPredict);
}

function weirdBot(gamestate) {
     const myPreviousMove = getMyPreviousMove(gamestate);
     let predictedMove;
     switch (myPreviousMove) {
             case 'R': predictedMove = 'S'; break;
             case 'P': predictedMove = 'R'; break;
             case 'S': predictedMove = 'P'; break;
             case 'D': predictedMove = 'W'; break;
             case 'W': predictedMove = 'P'; break;
     }
     return counterMove(predictedMove);
}

function countDraws(gamestate) {
    const lastRound = gamestate.rounds.length-1;
    let drawsNumber = 0;
    for (i=0; i<10; i++) {
        if (gamestate.rounds[lastRound-i].p1 === gamestate.rounds[lastRound-i].p2) {
            drawsNumber ++;
        } else {
            return drawsNumber;
        }
    }
}

class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds.length === 0) {                //Set dynamite counter
            this.dynamite = 100;
        }

        const testSequence = ['R','R','S','R','R','R','P','P','S','P','P','P','S','R','S'];     //Define the test sequence
        
        if (gamestate.rounds.length < 15) {                             //Play the test sequence first
            return testSequence[gamestate.rounds.length];
        }

        if (gamestate.rounds.length === 15) {                           //Play dynamite while getting last element of test response
            this.dynamite--;
            return 'D';
        }
        
        if (gamestate.rounds.length === 16) {
            this.testResponse = getTestResponse(gamestate);              //Get the test response
        }


        if (this.doTheyWater === 'testing') {
            const testMove = getTheirPreviousMove(gamestate);
            if (testMove === 'W') {
                this.doTheyWater = 'probs';
            } else {
                this.doTheyWater = 'no';
            }
        }

        if (this.doTheyWater === 'doubleCheck') {
            const testMove = getTheirPreviousMove(gamestate);
            if (testMove === 'W') {
                this.doTheyWater = 'yes';
            } else {
                this.doTheyWater = 'no';
            }
        }
        
        if (countDraws(gamestate) > 1) {
            if (this.doTheyWater === 'yes') {
                this.doTheyWater = 'doubleCheck';
                return randomRPSBot();
            }
            if (this.doTheyWater === 'probs') {
                this.doTheyWater = 'doubleCheck';
            }
            else {
                this.doTheyWater = 'testing';
            }
        }
    

        if (this.doTheyDynamite === 'testing') {
            const testMove = getTheirPreviousMove(gamestate);
            if (testMove === 'D') {
                this.doTheyDynamite = 'probs';
            } else {
                this.doTheyDynamite = 'no';
            }
        }

        if (this.doTheyDynamite === 'doubleCheck') {
            const testMove = getTheirPreviousMove(gamestate);
            if (testMove === 'D') {
                this.doTheyDynamite = 'yes';
            } else {
                this.doTheyDynamite = 'no';
            }
        }
        
        if (countDraws(gamestate) > 1) {
            if (this.doTheyDynamite === 'yes') {
                this.doTheyDynamite = 'doubleCheck';
                console.log('WATERTRIBE')
                return 'W';
            }
            if (this.doTheyDynamite === 'probs') {
                this.doTheyDynamite = 'doubleCheck';
            }
            else {
                this.doTheyDynamite = 'testing';
                if (this.dynamite>0) {
                    this.dynamite--;
                    return 'D';
                }
            }
        }
        
        
        // console.log(this.testResponse.toString());             //To identify the response pattern of different bots

        const rand = Math.random();                             //Randomly play dynamite
        if (rand > 0.9 && this.dynamite > 0) {
            this.dynamite--;
            return 'D';
        }
                                            
        if (this.testResponse.toString() === 'P,P,R,P,P,P,S,S,R,S,S,S,R,P,R') {    //If they're playing counterthis...
            const nextMove = antiCounterBot(gamestate);
            return nextMove;
        }

        if (this.testResponse.toString() === 'S,P,R,S,P,R,S,P,R,S,P,R,S,P,R' ||       // If they're playing antiCounterthis...
        this.testResponse.toString() === 'R,S,P,R,S,P,R,S,P,R,S,P,R,S,P'||
        this.testResponse.toString() === 'P,R,S,P,R,S,P,R,S,P,R,S,P,R,S') {
            const nextMove = metaBot(gamestate);
            return nextMove;
        }

        if (this.testResponse.toString() === 'R,R,S,R,R,R,P,P,S,P,P,P,S,R,S') {       //If they're playing metathis...
            const nextMove = antiMetaBot(gamestate);
            return nextMove;
        }

        if (this.testResponse.toString() === 'S,S,P,S,S,S,R,R,P,R,R,R,P,S,P') {      //Honestly idk why their bot would do this
            const nextMove = weirdBot(gamestate);
            return nextMove; 
        }

        if (areTheirLastFourSame(gamestate) === true) {
            this.theyAreSpamming = getTheirPreviousMove(gamestate);
            this.spammingRound = gamestate.rounds.length;
            return counterMove(getTheirPreviousMove(gamestate));
        }

        if (this.spammingRound > gamestate.rounds.length-2) {
            return counterMove(this.theyAreSpamming);
        }

         else {                                                                     //Play a random move
            const myArray = ['R','P','S']; 
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();

