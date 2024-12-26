import {Server} from 'socket.io';
import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redisPort = Number(process.env.REDIS_PORT);
if (isNaN(redisPort)) {
    throw new Error(`Invalid REDIS_PORT: ${process.env.REDIS_PORT}`);
}

const pub = new Redis({
    host: String(process.env.REDIS_HOST) ,
    port: Number(redisPort),
    username: String(process.env.REDIS_USERNAME),
    password: String(process.env.REDIS_PASSWORD)
});
const sub = new Redis({
    host: String(process.env.REDIS_HOST) ,
    port: Number(redisPort),
    username: String(process.env.REDIS_USERNAME),
    password: String(process.env.REDIS_PASSWORD)
});

class SocketService {
    private _io: Server;
    constructor() {
        console.log('Socket service initialized');
        this._io = new Server({
            cors: {
                origin: '*',
                methods: ['*'],
            },
        });
        sub.subscribe('MESSAGES');
        console.log("PORT : ", process.env.REDIS_PORT);
    }
    public initListeners(){
        const io = this._io;
        console.log('Socket listeners initialized');
        io.on('connection', (socket) => {
            console.log(`new connection: ${socket.id}`);
            socket.on('event:message', async ({message}:{ message : string}) => {
                console.log("New message Rec: ", message);

                //publish the message to redis
                await pub.publish('MESSAGES',JSON.stringify({message}));
            });
        });
        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGES'){
                try {
                    const parsedMessage = JSON.parse(message);
                    console.log('New message from redis: ', parsedMessage);
                    io.emit('message', parsedMessage);
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            }
        });
    }
    get io() {
        return this._io;
    }
}

export default SocketService;