// SPDX-License-Identifier: MIT
// Author: Tai Tran
pragma solidity 0.8.19;

contract ElectroTipV4 {
    // Store the amount of tips each person sends to each wallet
    mapping(address => mapping(address => uint256)) public tipsReceived;
    // Event when a tip is sent, including userId
    event TipSent(address indexed sender, address indexed creator, uint256 amount, string userId);

    // Send tip directly to the creator's wallet
    function sendTip(address payable _creator, string memory _userId) external payable {
        require(msg.value > 0, "Tip amount must be greater than 0");
        require(_creator != address(0), "Invalid creator address");
        require(bytes(_userId).length > 0, "User ID cannot be empty");

        tipsReceived[msg.sender][_creator] += msg.value;
        _creator.transfer(msg.value);
        emit TipSent(msg.sender, _creator, msg.value, _userId);
    }

    // View the amount of tips sent to the creator
    function getTipsReceived(address _sender, address _creator) external view returns (uint256) {
        return tipsReceived[_sender][_creator];
    }
}