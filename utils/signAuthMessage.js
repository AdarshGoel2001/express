const { ethers } = require("ethers");
const lighthouse = require("@lighthouse-web3/sdk");

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/XU1AlAfY0g0HRHrfh7ykOGqOofGupyZm"
  );
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

module.exports = signAuthMessage;