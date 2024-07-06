class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = { Queue, PriorityQueue };