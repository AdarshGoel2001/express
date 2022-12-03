const CREDIT_SCORE = 742;
const SALARY = 25_00_000;

const kyc = (user) => {
  // basically we're imaging this to be the backend server of the
  // KYC Agent which fetches the Credit Score and Salary of the user
  const creditScore = CREDIT_SCORE;
  const salary = SALARY;

  return { creditScore, salary }
}

module.exports = kyc;