テストネット環境構築
参考：https://tech.pepabo.com/2017/12/06/erc20-token-on-ropsten/

1. アカウント登録
2. 新規プロジェクト作成
3. curlで確認(https://infura.io/docs/ethereum/json-rpc/eth_blockNumber)

```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' "https://rinkeby.infura.io/v3/61fef65cbb4f4ef5aece697bcb40a9bf"
{"jsonrpc":"2.0","id":1,"result":"0x603f28"}
```

faucet 受け取り
1. アドレスをコピーし，tweetする
2. 以下のサイトでtweetしたアドレスを貼り付け
https://faucet.rinkeby.io/

