const express = require('express');
const { Queue, PriorityQueue } = require('./queues');
const { handleRequest } = require('./requestHandler');
const config = require('../../config/config.json');

const app = express();
const port = config.queueManagerPort;

const fifoQueue = new Queue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new Queue();
let rrIndex = 0;

const enqueueRequest = (queueType, req) => {
    switch (queueType) {
        case 'FIFO':
            fifoQueue.enqueue(req);
            break;
        case 'Priority':
            priorityQueue.enqueue(req);
            break;
        case 'RoundRobin':
            roundRobinQueue.enqueue(req);
            break;
        default:
            fifoQueue.enqueue(req);
    }
};

const dequeueRequest = (queueType) => {
    switch (queueType) {
        case 'FIFO':
            return fifoQueue.dequeue();
        case 'Priority':
            return priorityQueue.dequeue();
        case 'RoundRobin':
            const req = roundRobinQueue.dequeue();
            roundRobinQueue.enqueue(req); // Re-enqueue for round robin
            return req;
        default:
            return fifoQueue.dequeue();
    }
};

app.get('/enqueue', (req, res) => {
    const queueType = req.query.type || 'FIFO';
    enqueueRequest(queueType, req);
    res.send('Request enqueued');
});

app.get('/dequeue', (req, res) => {
    const queueType = req.query.type || 'FIFO';
    handleRequest(req, res, queueType, dequeueRequest(queueType));
});

app.listen(port, () => {
    console.log(`Queue manager running on port ${port}`);
});