const { expect } = require("chai");
const request = require("supertest");

const app = require("../../app");
const {
  USER_JOIN_SUCCESS,
  ALREADY_JOINED_USER,
} = require("../../utils/constants");
const { validMockUserData } = require("../mockData");

describe("loginRouter TEST", () => {
  describe("POST /login", () => {
    const newSignIn = {
      email: "dinorun123@gmail.com",
      displayName: "김디노로스",
      imageURL:
        "https://lh3.googleusercontent.com/a/AATXAJy00YrSOHwxEZ4YAC0sLmkm0zDEjo...",
    };
    const alreadySignIn = validMockUserData;

    it("should respond with 200 and get join success message", async () => {
      const response = await request(app).post("/login").send(newSignIn);

      expect(response.status).to.equal(201);
      expect(response.body.result).to.equal(USER_JOIN_SUCCESS);
    });

    it("should respond with 200 and get already joined message", async () => {
      const response = await request(app).post("/login").send(alreadySignIn);

      expect(response.status).to.equal(201);
      expect(response.body.result).to.equal(ALREADY_JOINED_USER);
    });
  });
});
