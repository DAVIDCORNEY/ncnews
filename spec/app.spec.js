process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
  describe("/api/topics", () => {
    it("GET status: 200", () => {
      return request(app)
        .get("/api/topics")
        .expect(200);
    });
    it("GET status: 200 responds with an array of topics objects ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.have.keys("description", "slug");
          expect(res.body.topics[0].description).to.be.a("string");
          expect(res.body.topics[0].slug).to.be.a("string");
        });
    });
  });
  describe.only("/api/articles", () => {
    it("GET status: 200", () => {
      return request(app)
        .get("/api/articles")
        .expect(200);
    });
  });
});
