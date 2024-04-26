import { request } from 'supertest';
import app from './app';
describe("given a username and password",()=>{
test("should respond with a 200 status code", async () => {
  const response = await request(app).post("/users").send({
    username: "user1",
    password: "password1",
  });
  expect(response.statuscode).toBe(200);
});
})

