import io from 'socket.io-client';

export const createSocket = () => {
    try {
        const serviceUrl = global.config.SOCKET_URL;

        global.config.socketInstance = io(serviceUrl,{transports:['websocket']});
        console.log('socket', global.config.socketInstance);
        global.config.socketInstance.on('connect', () => {
            console.log('connected to server');   
        });
       
        global.config.socketInstance.on('onMongoDBServiceDown', async (error) => {
            console.log('Mongo Service is down', error);
            
        });
        global.config.socketInstance.on('onMongoDBServiceUp', async (error) => {
            console.log('Mongo Service is down', error);
            
        });

        global.config.socketInstance.on('disconnect', async () => {
            console.log('disconnected from server');
             
        });
        global.config.socketInstance.on('connect_error', async (a) => {
            console.log("connect_error",a);
             
        });
    } catch (error) {
        console.log('error', error);
    }
}