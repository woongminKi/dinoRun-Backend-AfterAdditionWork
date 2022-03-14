const mongoose = require("mongoose");

const Room = require("../models/Room");
const User = require("../models/User");
const { validMockRoomData, validMockUserData } = require("./mockData");

exports.mochaHooks = {
  async beforeAll() {
    mongoose.connect(process.env.TEST_DB_LOCAL_URL);

    await Room.create(validMockRoomData);
    await User.create(validMockUserData);
  },
  async afterEach() {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
      if (collectionName === "rooms") {
        await Room.deleteMany({ _id: { $ne: validMockRoomData._id } });
      } else if (collectionName === "users") {
        await User.deleteMany({ _id: { $ne: validMockUserData._id } });
      }
    }
  },
  async afterAll() {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }

    Object.keys(mongoose.connection.models).forEach((modelName) => {
      delete mongoose.connection.models[modelName];
    });
  },
};
