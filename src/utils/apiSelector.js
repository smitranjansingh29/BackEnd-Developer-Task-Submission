const selectApi = (type, endpoints) => {
    switch (type) {
        case 'REST':
            return endpoints[0];
        case 'GraphQL':
            return endpoints[1];
        default:
            return endpoints[Math.floor(Math.random() * endpoints.length)];
    }
};

module.exports = { selectApi };