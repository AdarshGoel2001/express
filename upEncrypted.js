const { ethers } = require("ethers");
const lighthouse = require("@lighthouse-web3/sdk");

let hashValCID;
const sign_auth_message = async (publicKey, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/XU1AlAfY0g0HRHrfh7ykOGqOofGupyZm"
  );
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

const deployEncrypted = async () => {
  const path =
    "C:Users91897DocumentsCode repositories while learningSubprimeexpress-for-lighthouseImages/1.png"; //Give absolute path
  const apiKey = "acd55174-7003-4cd0-93b8-7cc7d3a5b3c1";
  const publicKey = "0xf6f1058c985572422b6ed0B5Fd4Af2Ba2704922B";
  const privateKey =
    "f80f8f01a2a34a6977d09f84ecf03eadcd4a4f73a52cee71218504964c6c33dc";
  const signed_message = await sign_auth_message(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signed_message
  );
  // Display response
  console.log(response);
  hashValCID = response.Hash;
  /*
    {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
    Note: Hash in response is CID.
  */
};

deployEncrypted();

modules.export = { hashValCID };
