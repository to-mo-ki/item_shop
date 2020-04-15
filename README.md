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
      deployAccount, //秘密鍵
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

# 各テストネットの特徴
https://qiita.com/bokuGucci/items/0fa9b7e840bbc61a4b91
> ||Ropsten |Kovan |Rinkeby |
> |:-:|:-:|:-:|:-:|
> |承認方法  |PoW |PoA |PoA |
> |利用可能ノード  |geth, parityの両方 |parity |geth |
> |コイン入手方法 | マイニング, faucet |faucet |faucet|
> |ブロック生成間隔 |30秒 |4秒 |15秒 |
> |必要なデータ容量 | 15GB(*1) | 13GB(*1) | 6GB(*1) |
> (*1) 2018年4月時点

POAについて
https://medium.com/the-dapps-community/イーサリアムにおけるコンセンサスアルゴリズムは何が結局ベストなのか-729ad817e8d1

gethとparity
https://tomokazu-kozuma.com/difference-between-geth-and-parity-of-ethereum-blockchain-node/

# heroku環境構築手順
1. アカウント登録
2. Appを作成する．アプリ名がURLとなる
3. デプロイ設定をする．
    1. Deployment method:Github
    2. レポジトリの指定
    3. `Enable Automatic Deploys`をクリック 
4. buildpacksで以下の2つを追加（順番注意）
    - https://github.com/lstoll/heroku-buildpack-monorepo.git
    - heroku/nodejs
5. 環境変数の設定
    1. heroku CLIのインストール
    ```
    brew tap heroku/brew && brew install heroku
    ```
    2. herokuへのログイン
    ```
    heroku login
    ```
    3. 環境変数の設定
    ```
    heroku config:set APP_BASE=client -a blockchain-item-shop
    ```
※ herokuでは，package.jsonのdevDependenciesはインストールされないので注意