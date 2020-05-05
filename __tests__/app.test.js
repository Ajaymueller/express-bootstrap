/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const mockResponse = require('../src/mocks');
const mockRandomJokeResponse = require('../src/mocks');
const mockPersonalJokeResponse = require('../src/mocks');

describe('GET / - Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Hello, Welcome to My jokes API');
        done(); // pass done callback and invoke it when all asynchronous operations completed;
      });
  });
});

describe('GET /jokes', () => {
  it('should respond with a list of jokes', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual(mockResponse.value);
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});

describe('GET/ joke/random', () => {
  it('should respond with a random joke message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockRandomJokeResponse);

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.randomJoke).toEqual(mockRandomJokeResponse.value);
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Unknown resource' });

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Unknown resource');
  });
});

describe('GET joke/random/personal', () => {
  it('should respond with a personal joke message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockPersonalJokeResponse);

    const res = await request(app).get('/jokes/random/manchester/codes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockPersonalJokeResponse.value);
  });
  it('should respond with an error if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'Bad request' });

    const res = await request(app).get('/jokes/random/manchester/codes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Bad request');
  });
});
