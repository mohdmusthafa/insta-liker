import express from 'express';
import PubSub from 'pubsub-js';
import middlewares from './middlewares';

const app = express();
const PORT = process.env.DASHBOARD_PORT || 3000;

//Initialize middlewares
middlewares(app);

export default function () {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/pages/index.html');
    })

    app.get('/logs', (req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache"
        });

        PubSub.subscribe("LOGGER", (msg: any, data: any) => {
            res.write('data: ' + data + "\n\n");
        })
    })

    app.get('/config', (req, res) => {
        const responseBody = {
            API_ENABLED: process.env.API_ENABLED,
            API_PORT: process.env.API_PORT
        }

        res.json(responseBody);
    })
    app.listen(PORT, () => {
        console.log(`Open dashboard http://localhost:${PORT} 🔥`)
    })
}