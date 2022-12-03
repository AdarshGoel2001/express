const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage")

const getfileEncryptionKey = async () => {
  // Get key back after passing access control condition
  const cid = "QmXtLgrwUYq3GeCXX3pjDG76byRkr4dUbmhRe148YqHgTK";
  const publicKey = "0x969e19A952A9aeF004e4F711eE481D72A59470B1";
  const privateKey =
    "0xa74ba0e4cc2e9f0be6776509cdb1495d76ac8fdc727a8b93f60772d73893fe2e";

  const signedMessage = await signAuthMessage(publicKey, privateKey);
  /*
    fetchEncryptionKey(cid, publicKey, signedMessage)
      Parameters:
        cid: cid of file
        publicKey: your public key
        signedMessage: message signed by owner of public key
  */
  const key = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );
  console.log(key);
};

// getfileEncryptionKey()
module.exports = getfileEncryptionKey;