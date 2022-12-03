const lighthouse = require("@lighthouse-web3/sdk");
const signAuthMessage = require("./signAuthMessage");

const { publicKey, privateKey } = require("../const");

const accessControl = async (cid) => {
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

  const aggregator = "([1])"; // used to be: "([1] and [2])"
  const signedMessage = await signAuthMessage(publicKey, privateKey);
  const response = await lighthouse.accessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );
  console.log(response);
  return response.data.cid;
};

// accessControl();
module.exports = accessControl;