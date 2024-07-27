import request from "supertest";
import { expect } from "chai";
import app from "../app.mjs";

let server;

before((done) => {
    server = app.listen(0, () => {
        console.log(`Test server running on port ${server.address().port}`);
        done();
    });
});

after((done) => {
    server.close(() => {
        console.log("Test server stopped");
        done();
    });
});

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

describe("GET /add", () => {
    it("should return the sum of two numbers", (done) => {
        request(app)
            .get("/add")
            .query({ a: 1, b: 2 })
            .expect("Content-Type", /text/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("The sum of 1 and 2 is 3");
                done();
            });
    });

    it("should return an error if parameters are missing", (done) => {
        request(app)
            .get("/add")
            .query({ a: 1 })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("Missing parameters a or b");
                done();
            });
    });
});

// Force process to exit after tests are done
after(() => {
    process.exit();
});
