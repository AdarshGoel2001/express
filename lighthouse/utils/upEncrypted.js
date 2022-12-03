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
  console.log(response);
  return response.data.Hash; // CID of userInfo file
};

deployEncrypted("/Users/im-adithya/Desktop/img.png");
module.exports = deployEncrypted;
