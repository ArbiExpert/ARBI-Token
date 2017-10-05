var ArbiToken = artifacts.require("./ARBI.sol");

contract('TestEmissionAndBurn', function(accounts) {

	it('should burn tokens', function() {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			st.transfer(accountTwo, 5);
		}).then(success => {
			return st.balanceOf.call(accountTwo);
		}).then(function(balance) {
			assert.equal(5, balance.valueOf(), "account two should have 5 tokens");
			return st.burn(accountTwo, 3);
		}).then(function(isSuccess) {
			return st.totalSupply.call();
		}).then(function(balance) {
			assert.equal(4999997, balance.valueOf(), "tokens should be burned");
			return st.balanceOf.call(accountTwo);
		}).then(function(balance) {
			assert.equal(2, balance.valueOf(), "tokens should be burned");
		});
	});

	it('should mint tokens', () => {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			return st.mint(accountOne, 5);
		}).then(() => {
			return st.totalSupply.call();
		}).then(totalSupply => {
			assert.equal(5000002, totalSupply.valueOf(), "wrong total supply after mining tokens");
		});
	});

	it('should burn all tokens for account', () => {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			return st.balanceOf.call(accountTwo);
		}).then(balance => {
			assert.equal(2, balance.valueOf(), "account two should have 2 tokens on start");
			return st.burn(accountTwo, 2);
		}).then(() => {
			return st.balanceOf(accountTwo);
		}).then(balance => {
			assert.equal(0, balance.valueOf(), 'should burn all tokens');
		});

	})

	it('should not burn tokens more than account balance', () => {
		var st;
		var accountOne = accounts[0];
		var accountTwo = accounts[1];

		return ArbiToken.deployed().then(function(instance) {
			st = instance;
			st.transfer(accountTwo, 2);
		}).then(() => {
			return st.balanceOf(accountTwo);
		}).then(balance => {
			assert.equal(2, balance.valueOf(), "account two should have 2 tokens on start");
			st.burn(accountTwo, 3);
			assert.equal(true, false, 'should not be here - exception should be thrown')
		}).catch(ex=> {
			//ok
		});

	});


});