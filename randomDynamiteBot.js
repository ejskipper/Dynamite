class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds.length === 0) {
            Bot.dynamite = 100;
        }

        const rand = Math.random();
        if (rand > 0.9 && Bot.dynamite > 0) {
            Bot.dynamite--;
            return 'D';
        }

         else {
            const myArray = ['R','P','S'];
            let rand = myArray[Math.floor(Math.random() * myArray.length)];
            return rand;
        }
    }
}

module.exports = new Bot();

