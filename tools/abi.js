export const abiToken = [
    {
        "type":"function",
        "name":"balanceOf",
        "inputs": [{"name":"account","type":"address"}],
        "outputs": [{"name":"amount","type":"uint256"}]
    },
    {
        "type":"function",
        "name":"allowance",
        "inputs": [
            {"name":"owner","type":"address"},
            {"name":"spender","type":"address"}
        ],
        "outputs": [{"name":"amount","type":"uint256"}]
    },
    {
        "type":"function",
        "name":"decimals",
        "inputs": [],
        "outputs": [{"name":"","type":"uint8"}]
    },
    {
        "type":"function",
        "name":"transfer",
        "inputs": [
            {"name":"recipient","type":"address"},
            {"name":"amount","type":"uint256"}
        ]
    },
    {
        "type":"function",
        "name":"transferFrom",
        "inputs": [
            {"name":"sender","type":"address"},
            {"name":"recipient","type":"address"},
            {"name":"amount","type":"uint256"}
        ]
    },
    {
        "type":"function",
        "name":"approve",
        "inputs": [
            {"name":"spender","type":"address"},
            {"name":"amount","type":"uint256"}
        ]
    },
    {
        "type":"function",
        "name":"mint",
        "inputs": [
            {"name":"recipient","type":"address"},
            {"name":"amount","type":"uint256"}
        ]
    }
];

export const uniAbi = [
    {
        "inputs":[
            {"internalType":"bytes","name":"commands","type":"bytes"},
            {"internalType":"bytes[]","name":"inputs","type":"bytes[]"},
            {"internalType":"uint256","name":"deadline","type":"uint256"}
        ],
        "name":"execute",
        "outputs":[],
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "type":"function",
        "name":"multicall",
        "inputs": [
            {"name":"deadline","type":"uint256"},
            {"name":"data","type":"bytes[]"}
        ],
    },
];

export const celerAbi = [
    {
        "type":"function",
        "name":"depositNative",
        "inputs": [
            {"name":"_amount","type":"uint256"},
            {"name":"_mintChainId","type":"uint64"},
            {"name":"_mintAccount","type":"address"},
            {"name":"_nonce","type":"uint64"},
        ],
    },
    {
        "type":"function",
        "name":"drip",
        "inputs": [
            {"name":"tokens","type":"address[]"}
        ],
    },
    {
        "type":"function",
        "name":"deposit",
        "inputs": [
            {"name":"_token","type":"address"},
            {"name":"_amount","type":"uint256"},
            {"name":"_mintChainId","type":"uint64"},
            {"name":"_mintAccount","type":"address"},
            {"name":"_nonce","type":"uint64"},
        ],
    },
];

export const lifiABi = [
    {
        inputs: [],
        name: "CannotBridgeToSameNetwork",
        type: "error",
    },
    {
        inputs: [],
        name: "ContractCallNotAllowed",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "minAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "receivedAmount",
                type: "uint256",
            },
        ],
        name: "CumulativeSlippageTooHigh",
        type: "error",
    },
    {
        inputs: [],
        name: "InformationMismatch",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "required",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
        ],
        name: "InsufficientBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidAmount",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidConfig",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidContract",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidReceiver",
        type: "error",
    },
    {
        inputs: [],
        name: "NativeAssetTransferFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "NoSwapDataProvided",
        type: "error",
    },
    {
        inputs: [],
        name: "NoSwapFromZeroBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "NoTransferToNullAddress",
        type: "error",
    },
    {
        inputs: [],
        name: "NullAddrIsNotAValidSpender",
        type: "error",
    },
    {
        inputs: [],
        name: "NullAddrIsNotAnERC20Token",
        type: "error",
    },
    {
        inputs: [],
        name: "OnlyContractOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyError",
        type: "error",
    },
    {
        inputs: [],
        name: "SliceOutOfBounds",
        type: "error",
    },
    {
        inputs: [],
        name: "SliceOverflow",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "assetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "bridge",
                type: "address",
            },
        ],
        name: "HopBridgeRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "assetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "bridge",
                        type: "address",
                    },
                ],
                indexed: false,
                internalType: "struct HopFacet.Config[]",
                name: "configs",
                type: "tuple[]",
            },
        ],
        name: "HopInitialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "transactionId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "string",
                name: "integrator",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "referrer",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "fromAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "toAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "toAmount",
                type: "uint256",
            },
        ],
        name: "LiFiGenericSwapCompleted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "transactionId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "string",
                name: "integrator",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "referrer",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "fromAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "toAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "toAmount",
                type: "uint256",
            },
        ],
        name: "LiFiSwappedGeneric",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "transactionId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receivingAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "LiFiTransferCompleted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "transactionId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receivingAssetId",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "LiFiTransferRecovered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "transactionId",
                        type: "bytes32",
                    },
                    {
                        internalType: "string",
                        name: "bridge",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "integrator",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "referrer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "sendingAssetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "minAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationChainId",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "hasSourceSwaps",
                        type: "bool",
                    },
                    {
                        internalType: "bool",
                        name: "hasDestinationCall",
                        type: "bool",
                    },
                ],
                indexed: false,
                internalType: "struct ILiFi.BridgeData",
                name: "bridgeData",
                type: "tuple",
            },
        ],
        name: "LiFiTransferStarted",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "assetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "bridge",
                        type: "address",
                    },
                ],
                internalType: "struct HopFacet.Config[]",
                name: "configs",
                type: "tuple[]",
            },
        ],
        name: "initHop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "assetId",
                type: "address",
            },
            {
                internalType: "address",
                name: "bridge",
                type: "address",
            },
        ],
        name: "registerBridge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "transactionId",
                        type: "bytes32",
                    },
                    { internalType: "string", name: "bridge", type: "string" },
                    {
                        internalType: "string",
                        name: "integrator",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "referrer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "sendingAssetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "minAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationChainId",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "hasSourceSwaps",
                        type: "bool",
                    },
                    {
                        internalType: "bool",
                        name: "hasDestinationCall",
                        type: "bool",
                    },
                ],
                internalType: "struct ILiFi.BridgeData",
                name: "_bridgeData",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "bonderFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amountOutMin",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationAmountOutMin",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationDeadline",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "relayer",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "relayerFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "nativeFee",
                        type: "uint256",
                    },
                ],
                internalType: "struct HopFacet.HopData",
                name: "_hopData",
                type: "tuple",
            },
        ],
        name: "startBridgeTokensViaHop",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "transactionId",
                        type: "bytes32",
                    },
                    { internalType: "string", name: "bridge", type: "string" },
                    {
                        internalType: "string",
                        name: "integrator",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "referrer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "sendingAssetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "minAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationChainId",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "hasSourceSwaps",
                        type: "bool",
                    },
                    {
                        internalType: "bool",
                        name: "hasDestinationCall",
                        type: "bool",
                    },
                ],
                internalType: "struct ILiFi.BridgeData",
                name: "_bridgeData",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "callTo",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "approveTo",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "sendingAssetId",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receivingAssetId",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "fromAmount",
                        type: "uint256",
                    },
                    { internalType: "bytes", name: "callData", type: "bytes" },
                    {
                        internalType: "bool",
                        name: "requiresDeposit",
                        type: "bool",
                    },
                ],
                internalType: "struct LibSwap.SwapData[]",
                name: "_swapData",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "bonderFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amountOutMin",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationAmountOutMin",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "destinationDeadline",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "relayer",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "relayerFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "nativeFee",
                        type: "uint256",
                    },
                ],
                internalType: "struct HopFacet.HopData",
                name: "_hopData",
                type: "tuple",
            },
        ],
        name: "swapAndStartBridgeTokensViaHop",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];

export const nfts2Abi = [
    {
        "type":"function",
        "name":"setPhase",
        "inputs": [
            {"name":"type","type":"uint8"}
        ],
    }
];

export const bilinearAbi = [
    {
        "type":"function",
        "name":"mint",
        "inputs": [],
    },
    {
        "type":"function",
        "name":"buy",
        "inputs": [
            {"name":"","type":"address"},
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256"},
        ],
    }
];

export const ghostAbi = [
    {
        "type":"function",
        "name":"sendMeGhostNft",
        "inputs": [
            {"name":"","type":"address"},
        ],
    },
    {
        "type":"function",
        "name":"collateralize",
        "inputs": [
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256[]"},
            {"name":"","type":"address[]"},
        ],
    },
    {
        "type":"function",
        "name":"uncollateralize",
        "inputs": [
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256[]"},
            {"name":"","type":"address[]"},
        ],
    },
    {
        "type":"function",
        "name":"registerCollection",
        "inputs": [
            {"name":"","type":"address"},
            {"name":"","type":"address"},
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256"},
        ],
    },
    {
        "type":"function",
        "name":"collateralize",
        "inputs": [
            {"name":"","type":"address"},
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256[]"},
            {"name":"","type":"address[]"},
        ],
    },
    {
        "type":"function",
        "name":"uncollateralize",
        "inputs": [
            {"name":"","type":"address"},
            {"name":"","type":"uint256"},
            {"name":"","type":"uint256[]"},
            {"name":"","type":"address[]"},
        ],
    },
];

export const hopAbi = [
    {
        "type":"function",
        "name":"sendToL2",
        "inputs": [
            {"name":"chainId","type":"uint256"},
            {"name":"recipient","type":"address"},
            {"name":"amount","type":"uint256"},
            {"name":"amountOutMin","type":"uint256"},
            {"name":"deadline","type":"uint256"},
            {"name":"relayer","type":"address"},
            {"name":"relayerFee","type":"uint256"},
        ],
    },
    {
        "type":"function",
        "name":"deposit",
        "inputs": [],
    },
    {
        "type":"function",
        "name":"withdraw",
        "inputs": [{"name":"amount","type":"uint256"}],
    },
    {
        "type":"function",
        "name":"swap",
        "inputs": [
            {"name":"tokenIndexFrom","type":"uint8"},
            {"name":"tokenIndexTo","type":"uint8"},
            {"name":"dx","type":"uint256"},
            {"name":"minDy","type":"uint256"},
            {"name":"deadline","type":"uint256"},
        ],
    },
    {
        "type":"function",
        "name":"dispatchMessage",
        "inputs": [
            {"name":"_to","type":"address"},
            {"name":"_fee","type":"uint256"},
            {"name":"_deadline","type":"uint256"},
            {"name":"_calldata","type":"bytes"},
        ],
    },
];

export const leyerAbi = [
    {
        "type":"function",
        "name":"quoteLayerZeroFee",
        "inputs": [
            {"name":"_dstChainId","type":"uint16"},
            {"name":"_functionType","type":"uint8"},
            {"name":"_toAddress","type":"bytes"},
            {"name":"_transferAndCallPayload","type":"bytes"},
            {
                "name":"_lzTxParams",
                "type":"tuple",
                "components": [{
                    "name": "dstGasForCall",
                    "type": "uint256"
                },
                {
                    "name": "dstNativeAmount",
                    "type": "uint256"
                },
                {
                    "name": "dstNativeAddr",
                    "type": "bytes"
                }]
            }
        ],
        "outputs": [
            {"name":"nativeFee","type":"uint256"},
            {"name":"zroFee","type":"uint256"}
        ]
    },
    {
        "type":"function",
        "name":"swapAndBridge",
        "inputs": [
            {"name":"amountIn","type":"uint256"},
            {"name":"amountOutMin","type":"uint256"},
            {"name":"dstChainId","type":"uint16"},
            {"name":"to","type":"address"},
            {"name":"refundAddress","type":"address"},
            {"name":"zroPaymentAddress","type":"address"},
            {"name":"adapterParams","type":"bytes"},
        ],
    },
];