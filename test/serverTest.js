import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server.js";
import fs from "fs";
const should = chai.should();

chai.use(chaiHttp);

let token;

// acceptable login details
describe("/POST login", () => {
  it("it should return a token for valid inputs", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({ username: "u", password: "p" })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.token.should.be.a("string");
        done();
      });
  });
});

// login undefined
describe("/POST login", () => {
  it("it should return a message for invalid inputs", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.be
          .a("string")
          .eq("Please input a valid username/password");
        done();
      });
  });
});

// test patch endpoint with valid authentication and inputs

describe("/POST patch", () => {
  it("it should return a patched document for valid inputs and authorization", (done) => {
    chai
      .request(app)
      .post("/api/patch")
      .send({
        data: { baz: "qux", foo: "bar" },
        patch: [{ op: "replace", path: "/baz", value: "boo" }],
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.baz.should.be.eq("boo");
        res.body.foo.should.be.eq("bar");
        done();
      });
  });
});

// test patch endpoint with invalid Authorization and inputs

describe("/POST patch", () => {
  it("it should return 403 for unauthoized access", (done) => {
    chai
      .request(app)
      .post("/api/patch")
      .send({
        data: { baz: "qux", foo: "bar" },
        patch: [{ op: "replace", path: "/baz", value: "boo" }],
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// test patch endpoint with invalid Authorization and inputs

describe("/POST patch", () => {
  it("it should return a message data object is empty", (done) => {
    chai
      .request(app)
      .post("/api/patch")
      .send({
        data: {},
        patch: [{ op: "replace", path: "/baz", value: "boo" }],
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq(
          "an error occured while patching the document please ensure that the format is correct"
        );
        done();
      });
  });
});

// test patch endpoint with valid Authorization and empty patch input

describe("/POST patch", () => {
  it("it should return a back original data object if the patch array is empty", (done) => {
    chai
      .request(app)
      .post("/api/patch")
      .send({
        data: { baz: "qux", foo: "bar" },
        patch: [],
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.baz.should.be.eq("qux");
        res.body.foo.should.be.eq("bar");
        done();
      });
  });
});

// test thumbnail endpoint with valid authentication and input

describe("/POST thumbnail", () => {
  it("it should return a resized image valid inputs and authorization", (done) => {
    chai
      .request(app)
      .post("/api/thumbnail")
      .send({
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        res.header["content-type"].should.be.eq("image/png");
        let size = Buffer.byteLength(res.body).toString();
        res.header["content-length"].should.be.eq(size);
        done();
      });
  });
});

// test thumbnail endpoint with invalid authentication

describe("/POST thumbnail", () => {
  it("it should return a status code of 403 for invalid authorization", (done) => {
    chai
      .request(app)
      .post("/api/thumbnail")
      .send({
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// test thumbnail endpoint with valid authentication but empty url string

describe("/POST thumbnail", () => {
  it("it should return a message for empty url strings ", (done) => {
    chai
      .request(app)
      .post("/api/thumbnail")
      .send({
        url: "",
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("please send a valid url");
        done();
      });
  });
});

// test thumbnail endpoint with valid authentication but incomplete url string

describe("/POST thumbnail", () => {
  it("it should return a message for incomplete url strings ", (done) => {
    chai
      .request(app)
      .post("/api/thumbnail")
      .send({
        url: "cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      })
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("please send a valid url");
        done();
      });
  });
});

// test thumbnail endpoint with valid authentication but missing url string

describe("/POST thumbnail", () => {
  it("it should return a message for incomplete url strings ", (done) => {
    chai
      .request(app)
      .post("/api/thumbnail")
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("please send a valid url");
        done();
      });
  });
});
