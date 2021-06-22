import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";

let should = chai.should();

chai.use(chaiHttp);
