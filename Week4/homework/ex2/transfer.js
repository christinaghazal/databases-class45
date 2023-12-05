function transferMoney(fromAccount, toAccount, amount, remark) {

   
    if (fromAccount.balance < amount) {
      console.log("Insufficient funds for the transfer.");
      return;
    }
  
   
    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;
  
    
    fromAccount.balance -= amount;
    toAccount.balance += amount;
  
    
    fromAccount.account_changes.push({
      change_number: fromChangeNumber,
      amount: -amount,
      changed_date: new Date(),
      remark,
    });
  
    toAccount.account_changes.push({
      change_number: toChangeNumber,
      amount,
      changed_date: new Date(),
      remark,
    });
  
    console.log(`Transfer of ${amount} from account ${fromAccount.account_number} to account ${toAccount.account_number} successful.`);
  }
  
  module.exports = {
    transferMoney,
  };
  