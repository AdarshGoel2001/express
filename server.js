const express = require("express");
const app = express();

app.post("/api/kyc", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const aadhaar = req.body.aadhaar;
  const dob = req.body.dob;
  const ethAddress = req.body.ethAddress;

  // Using hardcoded values for now
  const CREDIT_SCORE = 742;
  const SALARY = 25_00_000;
});

app.listen(8000, function () {
  console.log("server started on port 8000");
});
