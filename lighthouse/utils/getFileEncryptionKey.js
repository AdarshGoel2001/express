const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage");

const { publicKey, privateKey } = require("../const");

const getfileEncryptionKey = async (cid) => {
  // Get key back after passing access control condition
  const signedMessage = await signAuthMessage(publicKey, privateKey);

  const response = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );
  return response.data.key;
};

// getfileEncryptionKey()
module.exports = getfileEncryptionKey;