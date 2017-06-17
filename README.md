# static-website-boilerplate

## Require
- [Node.js][https://nodejs.org/]

Node.jsがインストールされている必要があります。

## Setup
gulpフォルダに移動して`npm install`してください。

```shell
cd gulp
npm install
```

パッケージはすべて`gulp/node_modules`フォルダ内に保存され、グローバルには一切ファイルを作りません。

## Usage
gulpフォルダに移動して`npm start`してください。

```shell
cd gulp
npm start
```
access to http://localhost:8080

デフォルトでは`dist/`をルートとしたサーバーを起動します。

### Other scripts

- Compile all resources(SCSS, JS)
```shell
npm run build
```

- Compile SCSS
```shell
npm run build:scss
```
全てのファイルを結合して`dist/css/app.min.css`として出力します

- Compile JS
```shell
npm run build:js
```
全てのファイルを結合して`dist/js/app.min.js`として出力します。
ソースマップ`dist/js/app.min.js.map`も出力します。

### Files
以下の構成になっています。
最終的にdist配下のファイルを公開することになるので、htmlや画像はdist内に置いてください。

```
/
|-dist/
| |-index.html
| |-js/
| |-img/
| |_css/
|-src/
| |-js/
| | |-lib/
| | |_app/
| |_scss/
|   |-app.scss
|   |-lib/
|   | |-reset.scss
|   |-mixin/
|   | |-common.scss
|   |_app/
|     |-common.scss
|_gulp/
  |-package.json
  |_gulpfile.js
```
