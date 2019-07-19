let app = require('../server');
let testServer = require('supertest')

// test('should ', () => {
    
// })

describe('Test the root path', () => {
    test('It should respond 200 to the LOGOUT route', async () => {
        const response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
    })
    test('It should return user info when logged in', async () => {
        //agent allows us to remember cookies, context and etc for all requests 
        let agent = testServer.agent(app)
        const response = await agent
                            .post('/api/user/login')
                            .send({username: 'dane', password : '1234'});
        expect(response.statusCode).toBe(200)
        const userResponse = await agent.get('/api/user/');
        expect(userResponse.statusCode).toBe(200);
        console.log(userResponse);
        
    })
})
 