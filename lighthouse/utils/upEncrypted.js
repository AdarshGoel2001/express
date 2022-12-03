const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage");

const { apiKey, publicKey, privateKey } = require("../const");

const deployEncrypted = async (path) => {
  const signed_message = await signAuthMessage(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signed_message
  );
  return response.data.Hash; // CID of userInfo file
};

module.exports = deployEncrypted;
