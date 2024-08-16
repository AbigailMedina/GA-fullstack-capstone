const request = require("supertest");
const { app, server } = require("../index.js");

// describe("Test the root path", () => {
//   test('It should respond with "Hi There"', async () => {
//     const response = await request(app).get("/");
//     expect(response.text).toBe("Hi There, reader");
//     expect(response.statusCode).toBe(200);
//   });  
// });

describe("/api/expenses",()=>{
  it("GET all should retrieve a list of expenses", async()=>{
    const response = await request(app)
    .get("/api/expenses")
    .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  })
  it("POST should create an expenses", async()=>{
    const newExpense = {"description":"Cat Scratching Post","amount":85.99,"category":"Pet", "date":"08/15/2024"}
    const response = await request(app)
    .post("/api/expenses")
    .send(newExpense)
    .expect(201);
    expect(response.body.id).not.toBeNull();
  })
  
})

describe("/api/goals",()=>{
  it("GET all should retrieve a list of goals", async()=>{
    const response = await request(app)
    .get("/api/goals")
    .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  })
  it("GET by ID should retrieve a single goal", async()=>{
    const response = await request(app)
    .get("/api/goals/1")
    .expect(200);
    expect(response.body.length).toBe(1);
  })
  it("POST should create a goal", async()=>{
    const newGoal = {"description":"Honeymoon","amount":10000.00,"deadline":'2025-05-31', "progress":50.00}
    const response = await request(app)
    .post("/api/goals")
    .send(newGoal)
    .expect(200);
    expect(response.body.id).not.toBeNull();
  })
})
// afterAll((done) => {
//   // Closing the connection allows Jest to exit successfully.
//   server.close();
//   done();
// });
