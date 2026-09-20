export const meloArtifact = {
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ethIn",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sharesOut",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "SHARES_PER_ETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x6080604052348015600e575f5ffd5b50610f518061001c5f395ff3fe60806040526004361061009b575f3560e01c8063313ce56711610063578063313ce5671461019557806370a08231146101bf57806395d89b41146101fb578063a9059cbb14610225578063d0e30db014610261578063dd62ed3e1461026b5761009b565b806306fdde031461009f578063095ea7b3146100c957806318160ddd14610105578063222c0b111461012f57806323b872dd14610159575b5f5ffd5b3480156100aa575f5ffd5b506100b36102a7565b6040516100c091906109ec565b60405180910390f35b3480156100d4575f5ffd5b506100ef60048036038101906100ea9190610a9d565b6102e0565b6040516100fc9190610af5565b60405180910390f35b348015610110575f5ffd5b506101196103cd565b6040516101269190610b1d565b60405180910390f35b34801561013a575f5ffd5b506101436103d2565b6040516101509190610b1d565b60405180910390f35b348015610164575f5ffd5b5061017f600480360381019061017a9190610b36565b6103df565b60405161018c9190610af5565b60405180910390f35b3480156101a0575f5ffd5b506101a9610566565b6040516101b69190610ba1565b60405180910390f35b3480156101ca575f5ffd5b506101e560048036038101906101e09190610bba565b61056b565b6040516101f29190610b1d565b60405180910390f35b348015610206575f5ffd5b5061020f610580565b60405161021c91906109ec565b60405180910390f35b348015610230575f5ffd5b5061024b60048036038101906102469190610a9d565b6105b9565b6040516102589190610af5565b60405180910390f35b6102696105cf565b005b348015610276575f5ffd5b50610291600480360381019061028c9190610be5565b61075e565b60405161029e9190610b1d565b60405180910390f35b6040518060400160405280600481526020017f4d454c4f0000000000000000000000000000000000000000000000000000000081525081565b5f8160025f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103bb9190610b1d565b60405180910390a36001905092915050565b5f5481565b683635c9adc5dea0000081565b5f5f60025f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461054f57828110156104c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104bd90610c6d565b60405180910390fd5b82816104d29190610cb8565b60025f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055505b61055a85858561077e565b60019150509392505050565b601281565b6001602052805f5260405f205f915090505481565b6040518060400160405280600481526020017f4d454c4f0000000000000000000000000000000000000000000000000000000081525081565b5f6105c533848461077e565b6001905092915050565b5f670de0b6b3a7640000683635c9adc5dea00000346105ee9190610ceb565b6105f89190610d59565b90505f811161063c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063390610dd3565b60405180910390fd5b805f5f82825461064c9190610df1565b925050819055508060015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461069f9190610df1565b925050819055503373ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516107039190610b1d565b60405180910390a33373ffffffffffffffffffffffffffffffffffffffff167f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a153483604051610753929190610e24565b60405180910390a250565b6002602052815f5260405f20602052805f5260405f205f91509150505481565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e390610e95565b60405180910390fd5b8060015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054101561086c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086390610efd565b60405180910390fd5b8060015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546108b89190610cb8565b925050819055508060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461090b9190610df1565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161096f9190610b1d565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6109be8261097c565b6109c88185610986565b93506109d8818560208601610996565b6109e1816109a4565b840191505092915050565b5f6020820190508181035f830152610a0481846109b4565b905092915050565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610a3982610a10565b9050919050565b610a4981610a2f565b8114610a53575f5ffd5b50565b5f81359050610a6481610a40565b92915050565b5f819050919050565b610a7c81610a6a565b8114610a86575f5ffd5b50565b5f81359050610a9781610a73565b92915050565b5f5f60408385031215610ab357610ab2610a0c565b5b5f610ac085828601610a56565b9250506020610ad185828601610a89565b9150509250929050565b5f8115159050919050565b610aef81610adb565b82525050565b5f602082019050610b085f830184610ae6565b92915050565b610b1781610a6a565b82525050565b5f602082019050610b305f830184610b0e565b92915050565b5f5f5f60608486031215610b4d57610b4c610a0c565b5b5f610b5a86828701610a56565b9350506020610b6b86828701610a56565b9250506040610b7c86828701610a89565b9150509250925092565b5f60ff82169050919050565b610b9b81610b86565b82525050565b5f602082019050610bb45f830184610b92565b92915050565b5f60208284031215610bcf57610bce610a0c565b5b5f610bdc84828501610a56565b91505092915050565b5f5f60408385031215610bfb57610bfa610a0c565b5b5f610c0885828601610a56565b9250506020610c1985828601610a56565b9150509250929050565b7f616c6c6f77616e636500000000000000000000000000000000000000000000005f82015250565b5f610c57600983610986565b9150610c6282610c23565b602082019050919050565b5f6020820190508181035f830152610c8481610c4b565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610cc282610a6a565b9150610ccd83610a6a565b9250828203905081811115610ce557610ce4610c8b565b5b92915050565b5f610cf582610a6a565b9150610d0083610a6a565b9250828202610d0e81610a6a565b91508282048414831517610d2557610d24610c8b565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610d6382610a6a565b9150610d6e83610a6a565b925082610d7e57610d7d610d2c565b5b828204905092915050565b7f7a65726f000000000000000000000000000000000000000000000000000000005f82015250565b5f610dbd600483610986565b9150610dc882610d89565b602082019050919050565b5f6020820190508181035f830152610dea81610db1565b9050919050565b5f610dfb82610a6a565b9150610e0683610a6a565b9250828201905080821115610e1e57610e1d610c8b565b5b92915050565b5f604082019050610e375f830185610b0e565b610e446020830184610b0e565b9392505050565b7f746f0000000000000000000000000000000000000000000000000000000000005f82015250565b5f610e7f600283610986565b9150610e8a82610e4b565b602082019050919050565b5f6020820190508181035f830152610eac81610e73565b9050919050565b7f62616c616e6365000000000000000000000000000000000000000000000000005f82015250565b5f610ee7600783610986565b9150610ef282610eb3565b602082019050919050565b5f6020820190508181035f830152610f1481610edb565b905091905056fea2646970667358221220da4f50eed3a1d2c75b5ac71d3d2ea18c03f15455b7ef333f7fb8ae92124e96f664736f6c63430008250033"
} as const;
