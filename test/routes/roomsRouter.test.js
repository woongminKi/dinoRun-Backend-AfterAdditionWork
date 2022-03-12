const { expect } = require("chai");
const request = require("supertest");

const app = require("../../app");
const {
  REGISTER_ROOM_INFO_SUCCESS,
  NOT_FOUND,
  GET_ROOM_INFO_FAIL,
} = require("../../utils/constants");
const { validMockRoomData, validMockRoomArray } = require("../mockData");

describe("roomsRouter TEST", () => {
  describe("GET /rooms", () => {
    it("should respond with 200 and get array", (done) => {
      request(app)
        .get("/rooms")
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          let accessToken = null;
          let refreshToken = null;

          if (res.body.headers) {
            accessToken = res.body.headers.accessAuthorization;
            refreshToken = res.body.headers.refreshAuthorization;
          } else {
            accessToken = res.headers.accessauthorization;
            refreshToken = res.headers.refreshauthorization;
          }

          expect(validMockRoomArray).to.exist;
          done();
        });
    });

    it("should respond with 404 and get failed message", (done) => {
      const testArray = [];
      request(app)
        .get("/rooms")
        .expect(404)
        .end(async (err, res) => {
          if (err) return done(err);

          let accessToken = null;
          let refreshToken = null;

          if (res.body.headers) {
            accessToken = res.body.headers.accessAuthorization;
            refreshToken = res.body.headers.refreshAuthorization;
          } else {
            accessToken = res.headers.accessauthorization;
            refreshToken = res.headers.refreshauthorization;
          }

          const { message } = res.body;

          expect(message).to.eql(GET_ROOM_INFO_FAIL);
          expect(testArray).to.not.exist;
          done();
        });
    });
  });

  describe("POST /rooms", () => {
    it("should respond with 200 and get success message", (done) => {
      request(app)
        .post("/rooms")
        .send(validMockRoomData)
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          let accessToken = null;
          let refreshToken = null;

          if (res.body.headers) {
            accessToken = res.body.headers.accessAuthorization;
            refreshToken = res.body.headers.refreshAuthorization;
          } else {
            accessToken = res.headers.accessauthorization;
            refreshToken = res.headers.refreshauthorization;
          }

          const { message } = res.body;
          expect(message).to.eql(REGISTER_ROOM_INFO_SUCCESS);
          done();
        });
    });

    it("should respond with 404 and get failed message", (done) => {
      request(app)
        .post("/rooms")
        .send(validMockRoomData)
        .expect(404)
        .end(async (err, res) => {
          if (err) return done(err);

          let accessToken = null;
          let refreshToken = null;

          if (res.body.headers) {
            accessToken = res.body.headers.accessAuthorization;
            refreshToken = res.body.headers.refreshAuthorization;
          } else {
            accessToken = res.headers.accessauthorization;
            refreshToken = res.headers.refreshauthorization;
          }

          const { message } = res.body;
          expect(message).to.eql(NOT_FOUND);
          done();
        });
    });
  });
});
