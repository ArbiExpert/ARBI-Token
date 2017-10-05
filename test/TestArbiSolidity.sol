pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ARBI.sol";

contract TestArbiSolidity {

	ARBI testCoin = ARBI(DeployedAddresses.ARBI());

	function testInitialBalanceIsSet() {

		uint expected = 5000000;

		Assert.equal(testCoin.balanceOf(tx.origin), expected, "initial balance is wrong");
	}

}