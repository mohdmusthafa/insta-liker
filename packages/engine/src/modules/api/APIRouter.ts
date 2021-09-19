import express from 'express';
import PubSub from 'pubsub-js';
import nconf from 'nconf';

const router = express.Router();

router.route('/login')
    .delete((req, res) => {
        PubSub.publish('LOGOUT');
        res.sendStatus(200);
    })

router.get('/stop-server', (req, res) => {
    PubSub.publish('STOP_SERVER');
    res.sendStatus(200);
})

router.route('/sleep-delay')
    .get((req, res) => {
        const likeDelay:number = nconf.get('sleep');
        res.send({
            delay: likeDelay
        })
    })
    .put((req, res) => {
        const likeDelay = req.query.delay;
        nconf.set('sleep', likeDelay);
        res.status(200).end()
    })


export default router;