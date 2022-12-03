const express = require("express");
const app = express();

app.post("/api/kyc", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const aadhaar = req.body.aadhaar;
  const dob = req.body.dob;
  const ethAddress = req.body.ethAddress;
  const creditScore = req.body.creditScore;
  const salary = req.body.salary;
});

app.listen(8000, function () {
  console.log("server started on port 8000");
});
