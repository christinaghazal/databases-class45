const { initializeAccounts } = require('./setup');
const { transferMoney } = require('./transfer');

////////////////
const accounts = initializeAccounts();

/////////////////////
console.log("Initial Account Information:");
console.log(accounts);

//////////////
const fromAccount = accounts.find(account => account.account_number === 101);
const toAccount = accounts.find(account => account.account_number === 102);

transferMoney(fromAccount, toAccount, 1000, "Transfer from account 101 to account 102");

//updated information after transfer
console.log("\nUpdated Account Information:");
console.log(accounts);
