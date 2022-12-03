const fs = require("fs");

const deployEncrypted = require("./utils/upEncrypted");
const accessControl = require("./utils/accessControl");
const getfileEncryptionKey = require("./utils/getfileEncryptionKey");

const cidGenerator = async (userInfo, ethAddress) => {
  // generate txt file with user details
  const time_now = Date.now();
  await fs.writeFile(`userInfo-${time_now}.txt`, JSON.stringify(userInfo), function (err) {
    if (err) return console.log(err);
  });

  const cid = await deployEncrypted(`/Users/im-adithya/Coding/opensource/express/userInfo-${time_now}.txt`);
  await accessControl(cid);
  const key = await getfileEncryptionKey(cid);

  // delete file;
  await fs.unlink(`userInfo-${time_now}.txt`, (err) => {
    if (err) return console.log(err);
  });

  // TODO: Should we return key?
  return cid;
}

cidGenerator({name: "adithya"})
module.exports = cidGenerator;