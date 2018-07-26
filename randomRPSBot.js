class Bot {
    makeMove(gamestate) {
        const myArray = ['R','P','S'];
        let rand = myArray[Math.floor(Math.random() * myArray.length)];
        return rand;
    }
}

module.exports = new Bot();
