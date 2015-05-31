function sleep(number) {
    
    setTimeout(function () {
        process.send(number);
    }, 1000 * number)
}
process.on('message', sleep);