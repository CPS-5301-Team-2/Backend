const mongoose = require("mongoose");
const { findById } = require("../model/users");

describe('insert', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    it('should insert doc into collection', async ()=>{

        const users = require("../model/users");
        const mock = new users({
            name: "Testy McTestFace",
            username: "jestTests",
            password: "password",
            email: "test@testing.com",
            position: "Test"
        });

        mock.save();
        var insertedUser = await users.findById(mock._id);
        expect(insertedUser).toEqual(mock);

    });
});