let object = {};
process.on('message', (cant) => {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    for (let index = 0; index < cant; index++) {
        let randomNum = getRandomInt(1, 1001);
        if (object.hasOwnProperty(randomNum)) {
            object[randomNum]++;

        } else {
            object[randomNum] = 1
        }
    }
    process.send(object);
    process.exit();

})
process.send('ready');