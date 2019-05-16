process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);

const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/not_a_route", () => {
    it("ANY status:404 - responds with a 'Route Not Found' error", () => {
      return request(app)
        .get("/not_a_route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found");
        });
    });
  });

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
    describe("Errors,/api/topics", () => {
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/api/articles", () => {
    it("GET status: 200", () => {
      return request(app)
        .get("/api/articles")
        .expect(200);
    });
    it("GET status: 200 responds with an array of articles objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles.length).to.equal(12);
        });
    });
    it("GET status:200 responds with an array with a comment_count key", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.have.keys(
            "article_id",
            "title",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
        });
    });
    it("GET status:200 responds with an array of articles sorted by date in descending order by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET status:200 responds with an array of articles sorted by any valid column (article_id)", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("article_id", {
            descending: true
          });
        });
    });
    it("GET status:200 responds with an array of articles sorted by any valid column (votes)", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("votes", {
            descending: true
          });
        });
    });
    it("GET status:200 responds with an array of articles sorted by any valid column (article_id) with the order as sent in the query", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("article_id", {
            descending: false
          });
        });
    });
    it("GET status:200 responds with an array of articles filtered by author in the given query", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.eql("icellusedkars");
          const allAuthors = body.articles.every(
            article => article.author === "icellusedkars"
          );
          expect(allAuthors).to.be.true;
        });
    });
    it("GET status:200 responds with an array of articles filtered by topic in the given query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.eql("mitch");
          const allTopics = body.articles.every(
            article => article.topic === "mitch"
          );
          expect(allTopics).to.be.true;
        });
    });
    describe("Errors /api/articles", () => {
      it("GET status:400 responds with an error when given an invalid sort by query", () => {
        return request(app)
          .get("/api/articles?sort_by=no_a_column")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad request: Column does not exist");
          });
      });
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    it("GET status: 200 when passed a valid id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200);
    });
    it("GET status:200 responds with an array with a comment_count key", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0]).to.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
        });
    });
    it("PATCH status:200 accepts a body of inc_votes and increases the vote property by a number", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0].votes).to.equal(101);
        });
    });
    it("PATCH status:200 accepts a body of inc_votes and decreases the vote property by a number", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0].votes).to.equal(99);
          expect(body.article[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 99,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T00:00:00.000Z"
          });
        });
    });
    describe("Errors /api/articles/:article_id", () => {
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("GET status:200 when passed a valid id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200);
    });
    it("GET status: 200 responds with an array of comments for the given id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments.length).to.equal(13);
        });
    });
    it("GET status: 200 responds with an array of comments with the following properties", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).to.have.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
    });
    it("GET status:200 responds with an array of comments sorted by date in descending order by default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET status:200 responds with an array of comments sorted by any valid column (votes)", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("votes", {
            descending: true
          });
        });
    });
    it("GET status:200 responds with an array of comments sorted by any valid column (comment_id) with the order as sent in the query", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id&&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("comment_id", {
            descending: false
          });
        });
    });
    describe("Errors /api/articles/:article_id/comments", () => {
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("POST status:201 and a comment object containing the new comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "lurker",
          body: "test"
        })
        .expect(201)
        .then(({ body }) => {
          console.log(body);
          expect(body.comment[0].author).to.be.a("string");
          expect(body.comment[0]).to.have.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
          expect(body.comment[0].comment_id).to.be.a("number");
          expect(body.comment[0].body).to.be.a("string");
        });
    });
    describe("Errors on POST /api/articles/:article_id/comments", () => {
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/api/comments/:comment_id", () => {
    it("PATCH status:200 when passed a valid comment id", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(200);
    });
    it("PATCH status:200 accepts a body of inc_votes and increases the vote property by a number", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment[0].votes).to.equal(17);
        });
    });
    it("PATCH status:200 accepts a body of inc_votes and decreases the vote property by a number", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment[0].votes).to.equal(15);
          expect(body.comment[0]).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 15,
            created_at: "2017-11-22T00:00:00.000Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    describe("Errors on /api/comments/:comment_id", () => {
      it("GET status 405 responds with an error when given an invalid method", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
  describe("/api/users/:username", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200);
    });
    it("GET status:200 responds with a user object", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          expect(body.user[0]).to.have.keys("username", "avatar_url", "name");
          expect(body.user[0].avatar_url).to.be.a("string");
          expect(body.user[0].name).to.be.a("string");
        });
    });
  });
  describe("/api/comments/:comment_id", () => {
    it("DELETE /:comment_id status: 204 deletes the specified comment", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
  });
});
