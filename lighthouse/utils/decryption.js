const fs = require("fs");
const lighthouse = require('@lighthouse-web3/sdk');
const signAuthMessage = require("./signAuthMessage");

const { publicKey, privateKey } = require("../const");

const decrypt = async(cid) =>{
  // Get file encryption key
  const signed_message = await signAuthMessage(publicKey, privateKey);
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signed_message
  );

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key
  );

  // Save File
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))  
}

decrypt()