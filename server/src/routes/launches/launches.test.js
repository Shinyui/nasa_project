const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { getLatestFlightNumber } = require("../../models/launches.model");

let server;

beforeAll( async () => {
    server = request(app);
    await mongoConnect();
});

afterAll( async () => {
    await mongoDisconnect();
})

describe("Test GET /launches", () => {
    it("should respond with 200 success", async () => {
        await server
            .get("/v1/launches")
            .expect(200);
    });
});


describe("Test POST /launch", () => {
    const completeLaunchDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-62 f",
        launchDate: "January 4, 2028",
    }

    const completeLaunchWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-62 f",
    }

    const launchDataWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-62 f",
        launchDate: "invalid date",
    }

    it("should respond with 201 created", async () => {
        const response = await server
            .post("/v1/launches")
            .send(completeLaunchDate)
            .expect(201);

        const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(requestDate).toBe(responseDate);

        expect(response.body).toMatchObject(completeLaunchWithoutDate);
    });

    it("should respond catch missing required properties", async () => {
        const response = await server
            .post("/v1/launches")
            .send(completeLaunchWithoutDate)
            .expect(400)
            
        expect(response.body).toStrictEqual({
            error: "Missing required launch property"
        })
    });

    it("should catch invalid dates", async () => {
        const response = await server
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: "Invalid launch date"
        })
    })
});