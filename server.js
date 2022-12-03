const express = require("express");
const app = express();

const kycBackend = require("./kyc")
const polygonQRGenerator = require("./polygon")
const lighthouseCIDGenerator = require("./lighthouse")

app.post("/api/kyc", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const aadhaar = req.body.aadhaar;
  const dob = req.body.dob;
  const ethAddress = req.body.ethAddress;

  const user = {fname, lname, aadhaar, dob, ethAddress};

  // Get Credit Score and Salary of the requester
  const {creditScore, salary} = kycBackend(user);

  // Generate Polygon QR
  const qrLink = polygonQRGenerator(creditScore,salary);
  // Generate CID from lighthouse
  const cid = lighthouseCIDGenerator({...user,creditScore,salary});

  res.send({qrLink, cid})
});

app.listen(8000, function () {
  console.log("server started on port 8000");
});
