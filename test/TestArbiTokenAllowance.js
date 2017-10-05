var ArbiToken = artifacts.require("./ARBI.sol");

contract('ArbiTokenAllowanceTestJs', function(accounts) {

	it('should allow to spend tokens', () => {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			return instance.balanceOf.call(accountOne);
		}).then(balance => {
			assert.equal(balance.valueOf(), 5000000, "wrong initial balance in first account");
			return st.approve(accountTwo, 5, {from: accountOne});
		}).then(() => {
			return st.transferFrom(accountOne, accountTwo, 5, {from: accountTwo});
		}).then(() => {
			return st.balanceOf(accountOne);
		}).then(balance => {
			assert.equal(4999995, balance.valueOf());
		});
	}); 

	it('should not allow to spend tokens without approval', () => {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			return instance.balanceOf.call(accountOne);
		}).then(() => {
			return st.transferFrom(accountOne, accountTwo, 5, {from: accountTwo});
		}).then(success => {
			assert.equal(false, success, "result should be false");
			return st.balanceOf(accountOne);
		}).then(balance => {
			assert.equal(4999995, balance.valueOf());
		}).catch(ex => {
			//ok
		});
	}); 

});