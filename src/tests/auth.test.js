"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../src/app");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const faker_1 = require("@faker-js/faker");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe("Auth", () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://localhost:27017/podopolo");
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    const user = {
        name: faker_1.faker.name.fullName(),
        userName: faker_1.faker.internet.userName(),
        password: faker_1.faker.internet.password(),
        email: faker_1.faker.internet.email(),
        age: faker_1.faker.random.numeric(),
    };
    it("should register a user successfully", (done) => {
        chai_1.default
            .request(app_1.app)
            .post("/v1/auth/register")
            .send(user)
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("user created successfully");
            done();
        });
    });
    it("should login a user successfully", (done) => {
        chai_1.default
            .request(app_1.app)
            .post("/v1/auth/login")
            .send({
            email: user.email,
            password: user.password,
        })
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("login successful");
            done();
        });
    });
});
