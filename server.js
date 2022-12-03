const express = require("express");
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser')

const kycBackend = require("./kyc")
const polygonQRGenerator = require("./polygon")
const lighthouseCIDGenerator = require("./lighthouse")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello there")
});

app.post("/api/kyc", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const aadhaar = req.body.aadhaar;
  const dob = req.body.dob;
  const ethAddress = req.body.ethAddress;

  const user = {fname, lname, aadhaar, dob};

  // Get Credit Score and Salary of the requester
  const {creditScore, salary} = kycBackend(user);

  // Generate Polygon QR
  const qrLink = await polygonQRGenerator(creditScore,salary);
  // Generate CID from lighthouse
  const cid = await lighthouseCIDGenerator({...user,creditScore,salary},ethAddress);

  res.send({qrLink, cid})
});

app.listen(8000, function () {
  console.log("server started on port 8000");
});
