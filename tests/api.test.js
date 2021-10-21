const request = require("supertest");
const app = require("../app");

const employee = {
    name:'Dzemil Sejdija',
    email:'voidbringer01@gmail.com',
    phone:'066060950',
    city:'Novi Pazar',
    zipcode:'36300',
    street:'Kraljevica Marka 2',
    date_of_birth:new Date(),
    id:50
}

describe("Testing the /employees path", () => {
it("should respond to the POST /employees method with 200", done => {
    request(app)
        .post("/employees")
        .send(employee)
        .then(response => {
            expect(response.statusCode).toBe(200);
            employee.id = response.body.userID
            done();
        });
    });
  it("should respond to the GET /employees method with 200", done => {
    request(app)
      .get("/employees")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it(`should respond to the GET /employees/50 method with 200`, done => {
    request(app)
      .get("/employees/50")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  
  it(" should respond to the GET /employees/99999 method with 404", done => {
    request(app)
      .get("/employees/99999")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  it(` should respond to the PUT /employees/50 method with 200`, done => {
    request(app)
        .put(`/employees/50`)
        .send({...employee,name:'Promenjeno'})
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

  it(`should respond to the DELETE /employees/${employee.id} method with 200`, done => {
    request(app)
        .delete(`/employees/50`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

 
  
});