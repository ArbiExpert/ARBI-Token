var ArbiToken = artifacts.require("./ARBI.sol");

contract('ArbiTokenTestJs', function(accounts) {

	it('should put initial balance in first account', function() {
		return ArbiToken.deployed().then(function(instance) {
			return instance.balanceOf.call(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.valueOf(), 5000000, "wrong initial balance in first account");
		});
	});

	it('should have total supply', function() {
		return ArbiToken.deployed().then(function(instance) {
			return instance.totalSupply.call();
		}).then(function(balance) {
			assert.equal(balance.valueOf(), 5000000, "wrong total supply");
		});
	});


	it('should transfer tokens', function() {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];
		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			return st.transfer(accountTwo, 5);
		}).then(function(result) {
			return st.balanceOf.call(accountTwo);
		}).then(function(balance) {
			assert.equal(5, balance.valueOf(), 'amount should be transferred')
		});
	});

});