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
  });
  describe.only("/api/articles/:article_id/comments", () => {
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
  });
});
