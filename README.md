# テストネット環境構築手順
## infura.ioのアカウント作成
1. アカウント登録
2. 新規プロジェクト作成
3. curlで確認(https://infura.io/docs/ethereum/json-rpc/eth_blockNumber)

```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' "https://rinkeby.infura.io/v3/61fef65cbb4f4ef5aece697bcb40a9bf"
{"jsonrpc":"2.0","id":1,"result":"0x603f28"}
```

## faucet 受け取り
1. 受け取りたいアドレスをコピーし，tweetする
2. 以下のサイトでtweetしたアドレスを貼り付け
https://faucet.rinkeby.io/

## deploy手順
1. truffle-hdwallet-providerをインストール
```
npm install --save-dev truffle-hdwallet-provider
```
2. truffle-configを修正
```javascript
rinkeby: {
  provider: function () {
    return new HDWalletProvider(
      deployAccount,
      "https://rinkeby.infura.io/v3/" +  accessToken
    );
  },
  network_id: 4,
  gas: 5000000
}
```

3. デプロイ
```
truffle migrate --network rinkeby
```

4. etherscanで確認

## 参考サイト
https://tech.pepabo.com/2017/12/06/erc20-token-on-ropsten/

