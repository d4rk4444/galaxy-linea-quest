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
]

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
    }
]

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
]

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
]

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
]