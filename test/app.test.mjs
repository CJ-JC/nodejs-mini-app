import request from "supertest";
import { expect } from "chai";
import app from "../src/app";

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
