const request = require('supertest');
const {app} = require('../../server');

describe('Integration Tests', () => {
    let server;

    beforeAll( () => {
        server = app.listen();
    });

    afterAll((done) => {
        server.close(() => {
            console.log('Server closed');
            done();
        });
    });

    it('should return a 200 OK status code for GET request to /health', async () => {
        const response = await request(server).get('/health');
        expect(response.status).toBe(200);
    });

});