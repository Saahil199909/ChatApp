module.exports = function(io){

    const users = new Map();    

    io.on('connection', (socket) => {
        console.log("A user connected to socket server: ", socket.id)

        socket.on('join', (userId) => {
            users.set(userId, socket.id);
            console.log(`user with ID::  ${userId} associated with this socketId ${socket.id} added in MAP`);
        })

        socket.on('serverPrivateMessage', ({recipientId, message}) => {
            console.log("serverPrivateMesage function got hitted", recipientId, message)
            const recipientSocketId =  users.get(recipientId);

            if(recipientSocketId){
                io.to(recipientSocketId).emit('clientPrivateMessage', {message})
                console.log(users, "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
                console.log(socket.id, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
                io.to(socket.id).emit('clientPrivateMessage', {message})
            }else{
                console.log("recipientId is not online")
            }
        })

        socket.on('disconnect', () => {
            console.log("User disconnected", socket.id);
        });
    })
}