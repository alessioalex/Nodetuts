var Account = require('../../lib/account');
    assert = require('assert');

require('should');

module.exports = {

  "initial balance should be 0": function() {
    var account = Account.create();
    account.should.have.property('balance');
    account.balance.should.eql(0);
  },

  "credit should increase the balance": function() {
    var account = Account.create();
    account.credit(10);
    account.balance.should.eql(10);
  },
  
  "debit should increase the balance": function() {
    var account = Account.create();
    account.debit(10);
    account.balance.should.eql(-10);
  },
  
  "transfer should credit one account and debit the other": function() {
    var accountA = Account.create();
    accountA.credit(20);
    var accountB = Account.create();
    accountA.transferTo(accountB, 5);
    accountA.balance.should.eql(15);
    accountB.balance.should.eql(5);
  },
  
  "transfer should throw error if not enough funds": function() {
    var accountA = Account.create();
    accountA.credit(5);
    var accountB = Account.create();
    assert.throws(function() {
      accountA.transferTo(accountB, 10);    
    });
  }


};
