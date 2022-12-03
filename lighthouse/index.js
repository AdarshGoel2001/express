const deployEncrypted = require("./utils/upEncrypted");

const cidGenerator = (userInfo, ethAddress) => {
  // generate txt file with user details
  // userInfo-<timestamp>.txt
  deployEncrypted("../txts/userinfo.txt");
  // delete file;
}

module.exports = cidGenerator;