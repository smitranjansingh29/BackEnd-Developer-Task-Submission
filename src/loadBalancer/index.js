const express = require('express');
const { routeRequest } = require('./routes');
const config = require('../../config/config.json');

const app = express();
const port = config.loadBalancerPort;

app.get('/route', routeRequest);

app.listen(port, () => {
    console.log(`Load balancer running on port ${port}`);
});