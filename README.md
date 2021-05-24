# ckb-cheque-test

The test for the [ckb-cheque-script](https://github.com/duanyytop/ckb-cheque-script) on Nervos CKB

### How to Work

- Edit .env file

You need to copy `.env` file from `.env.example` and input your own sender and receiver private keys, ckb node url and ckb indexer url.

You can input your own cheque lock script in `src/utils/config.js`.

```shell
git clone https://github.com/duanyytop/ckb-cheque-test.git
cd ckb-cheque-test
mv .env.example .env
```

- Installation

```shell
yarn install   # install dependency libraries
```

- Running

```shell
doClaimingCellWithSignature()
// doClaimingCellWithInputs()
// doWithdrawingCell()
```

Uncomment the function you want to execute in `src/index.js` and run `yarn start`

> Note: Every transaction needs time to wait to join the blockchain.
