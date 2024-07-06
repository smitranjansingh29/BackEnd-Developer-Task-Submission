const { selectApi } = require('../utils/apiSelector');
const { logger } = require('../utils/logger');
const axios = require('axios');
const config = require('../../config/config.json');

const handleRequest = async(req, res, queueType, queue) => {
    const dequeuedReq = queue.dequeue();

    if (dequeuedReq) {
        const apiType = dequeuedReq.query.type || 'REST';
        const selectedApi = selectApi(apiType, config.apiEndpoints);

        const startTime = Date.now();
        try {
            const response = await axios.get(selectedApi);
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            logger.info({
                endpoint: selectedApi,
                responseTime,
                timestamp: new Date()
            });

            res.send(response.data);
        } catch (error) {
            logger.error({
                message: 'Error fetching API',
                error: error.message,
                timestamp: new Date()
            });

            res.status(500).send('Error fetching API');
        }
    } else {
        res.send('No requests in queue');
    }
};

module.exports = { handleRequest };