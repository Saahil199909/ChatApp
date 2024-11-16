module.exports = function(io){

    const users = new Map();  
    const activeChats = new Map();
    const unreadNotifications = new Map();

    io.on('connection', (socket) => {
        console.log("A user connected to socket server: ", socket.id)

        socket.on('join', (userId) => {
            users.set(userId, socket.id);
            const onlineUsers = Object.fromEntries(users);
            io.emit('onlineUsers', onlineUsers)
            loggedInUserNotificationExist = unreadNotifications.get(userId)
            if(loggedInUserNotificationExist){
                io.to(socket.id).emit('clientUnreadNotifications', loggedInUserNotificationExist)
            }else{
                console.log('No notifications for LoggedIn user')
            }
            removeUserActiveChats = activeChats.delete(userId)
        })

        socket.on('createActiveChats', (userId, chatId) => {
            console.log("createActiveChat function has been called")
            activeChats.set(userId, chatId)
        })

        socket.on('serverTyping', (chatIdObj, userId) => {
            recipientId  = chatIdObj.members.filter(id => id != userId)[0];
            recipientIdChatId = activeChats.get(recipientId);
            if(recipientIdChatId !== undefined){
                if(recipientIdChatId === chatIdObj._id){
                    io.to(users.get(recipientId)).emit('clientTyping', userId)
                }else{
                    console.log('chatId do not match');
                }
            }else{
                console.error(`Key ${recipientId} not found in activeChats.`);
            }
        })

        socket.on('serverStopTyping', (chatIdObj, userId ) => {
            console.log('server Stop typing functionm has been called')
            recipientId  = chatIdObj.members.filter(id => id != userId)[0];
            io.to(users.get(recipientId)).emit('clientStopTyping', userId)
        })

        socket.on('serverPrivateMessage', ({senderId, chatIdValue, recipientId, message}) => {
            const recipientSocketId =  users.get(recipientId);
            const recipientChatId = activeChats.get(recipientId)
            if(recipientChatId === chatIdValue && recipientSocketId){
                console.log('MAIN if condition exceuted')
                console.log(users, "Users object before sending message")
                console.log(users.get(recipientId), "recipient socket id before sending message")
                io.to(users.get(recipientId)).emit('clientPrivateMessage', {message})
                io.to(socket.id).emit('clientPrivateMessage', {message})
            }else{
                if(!unreadNotifications.has(recipientId)){
                    unreadNotifications.set(recipientId, [])    
                }
                const value = unreadNotifications.get(recipientId)
                senderIdExist = value.filter(obj => senderId in obj)
                    if(senderIdExist.length > 0){
                        senderIdExist[0][senderId] = senderIdExist[0][senderId] + 1
                    }else{
                        value.push({[senderId]: 1})
                    }
                const notificationList = unreadNotifications.get(recipientId)
                if(recipientSocketId){
                    io.to(recipientSocketId).emit('clientUnreadNotifications', notificationList)
                    io.to(socket.id).emit('clientPrivateMessage', {message})
                }else{
                    io.to(socket.id).emit('clientPrivateMessage', {message})
                    console.log('RecipientID is not LoggedIN')
                }
            }
        })

        socket.on('markNotificationRead', (userId, recipientId) => {
            const notificationList = unreadNotifications.get(userId)
            if(notificationList != undefined){
                const index = notificationList.findIndex(obj => obj.hasOwnProperty(recipientId))
                if(index !== -1){
                    notificationList.splice(index, 1)
                    io.to(users.get(userId)).emit('clientUnreadNotifications', notificationList)
                }
                console.log(unreadNotifications, "unreadNotifications")
            }
        })

        socket.on('disconnect', () => {
            console.log("User disconnected", socket.id);
            let disconnectUserId = null
            for(const [userId, socketId] of users.entries()){
                if(socketId === socket.id){
                    disconnectUserId = userId;
                    break;
                }
            }
            if(disconnectUserId){
                users.delete(disconnectUserId)
                const onlineUsers = Object.fromEntries(users);
                io.emit('onlineUsers', onlineUsers)
            }
        });
    })
}