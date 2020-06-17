module.exports = function makeSocketAdapter(io, eventname, callback) {
    return (socketData) => {
        callback(socketData).then(d => {
            io.emit(eventname, d);
        });
    }
}