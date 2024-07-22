const request = require("supertest");
const app = require("../src/app");
const { expect } = require("chai");

describe("GET /", () => {
    it("should return Hello, World!", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("Hello, World!");
                done();
            });
    });
});
