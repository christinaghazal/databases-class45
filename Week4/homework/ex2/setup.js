function initializeAccounts() {
    
    //empty array
    const accounts = [];
  
    
    const account1 = {
      account_number: 101,
      balance: 5000,
      account_changes: [],
    };
  
    const account2 = {
      account_number: 102,
      balance: 3000,
      account_changes: [],
    };
  
    accounts.push(account1, account2);
  
    return accounts;
  }
  
  module.exports = {
    initializeAccounts,
  };