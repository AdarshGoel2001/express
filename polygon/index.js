const axios = require("axios");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzAxNDMzMDYsImp0aSI6ImNmZGVlYzQyLTQ1YTUtNDlhNC05ZGExLWE0NmNhNzQ3M2UxZCIsImlhdCI6MTY3MDA1NjkwNiwibmJmIjoxNjcwMDU2OTA2LCJzdWIiOiJjMGNkNTE5Mi05MGY0LTRkMTgtYWYxMC0zNjUzNjM0NWZmZjUiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6IjI1NDIzYzM2LWRkMmQtNDNmZS05YTQ2LTIzZGViM2U0MGRjMCIsInJvbGUiOiJPV05FUiIsImVtYWlsIjoiYWRhcnNoZ29lbEBnbWFpbC5jb20ifX0.s9bFtoRCPu4tgRD1Isxl-em_YgxRWa_YgU_mSOoJA4Y`;

const generateBody = (creditScore,salary) => {
  const body = {
    "attributes": [
      {
        "attributeKey": "Salary", 
        "attributeValue": salary
      },
      {
        "attributeKey": "CScore", 
        "attributeValue": creditScore
      }
    ]  
  }
  return body;
}

const qrGenerator = async (creditScore,salary) => {
  const body = generateBody(creditScore,salary)
  
  const claimResponse = await axios.post(
    "https://api-staging.polygonid.com/v1/issuers/25423c36-dd2d-43fe-9a46-23deb3e40dc0/schemas/cd31917a-f429-4852-ac98-cc56395cb18c/offers",
    body,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const claimId = claimResponse.data.id;

  const sessionResponse = await axios.post(`https://api-staging.polygonid.com/v1/offers-qrcode/${claimId}`);
  const sessionId = sessionResponse.data.sessionID;

  const qrLink = `https://api-staging.polygonid.com/v1/offers-qrcode/${claimId}/download?sessionID=${sessionId}`;

  return qrLink;
}

qrGenerator(769, 420000);
module.exports = qrGenerator;