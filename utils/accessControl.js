const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage")

const accessControl = async (hashValCID) => {
  const cid = hashValCID;
  const publicKey = "0xf6f1058c985572422b6ed0B5Fd4Af2Ba2704922B";
  const privateKey =
    "f80f8f01a2a34a6977d09f84ecf03eadcd4a4f73a52cee71218504964c6c33dc";

  // Conditions to add
  const conditions = [
    {
      id: 1,
      chain: "wallaby",
      method: "balanceOf",
      standardContractType: "ERC20",
      contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
      returnValueTest: { comparator: ">=", value: "1" },
      parameters: [":userAddress"],
    },
  ];

  const aggregator = "([1] and [2])";
  const signedMessage = await signAuthMessage(publicKey, privateKey);
  /*
    accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
      Parameters:
        publicKey: owners public key
        CID: CID of file to decrypt
        signedMessage: message signed by owner of publicKey
        conditions: should be in format like above
        aggregator: aggregator to apply on conditions, in this example we used and
  */
  const response = await lighthouse.accessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );

  // Display response
  console.log(response);
  /*
    {
      data: {
        cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
        conditions: [ [Object] ],
        aggregator: '([1])'
      }
    }
  */
};

// accessControl();
module.exports = accessControl;