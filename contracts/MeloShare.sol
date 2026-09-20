// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MELO share token
/// @notice Deposit ETH, receive MELO. This is a prototype vault, not a brokerage.
contract MeloShare {
    string public constant name = "MELO";
    string public constant symbol = "MELO";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    /// 1 ETH mints 1,000 MELO (18 decimals).
    uint256 public constant SHARES_PER_ETH = 1000 ether;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposit(address indexed account, uint256 ethIn, uint256 sharesOut);

    function deposit() external payable {
        uint256 shares = (msg.value * SHARES_PER_ETH) / 1 ether;
        require(shares > 0, "zero");
        totalSupply += shares;
        balanceOf[msg.sender] += shares;
        emit Transfer(address(0), msg.sender, shares);
        emit Deposit(msg.sender, msg.value, shares);
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= value, "allowance");
            allowance[from][msg.sender] = allowed - value;
        }
        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "to");
        require(balanceOf[from] >= value, "balance");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }
}
