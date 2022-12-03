const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage");

const { publicKey, privateKey } = require("../const");

const getfileEncryptionKey = async () => {
  // Get key back after passing access control condition
  const cid = "QmXtLgrwUYq3GeCXX3pjDG76byRkr4dUbmhRe148YqHgTK";
  const signedMessage = await signAuthMessage(publicKey, privateKey);

  const key = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );
  console.log(key);
  return key;
};

// getfileEncryptionKey()
module.exports = getfileEncryptionKey;