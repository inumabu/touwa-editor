# Touwa Editor User Guide

## Overview

Touwa Editor は、Workspace を開いてソースコードを編集・保存するための Electron ベースのコードエディタです。

## Start the editor

```bash
npm ci
npm run dev
```

配布用 Build は次のコマンドで作成できます。

```bash
npm run build
npm run package
```

## Open a Workspace

1. **Open Workspace** を選択します。
2. Workspace として使用するディレクトリを選択します。
3. Explorer に Workspace 直下のファイルが表示されます。
4. ファイルを選択すると Monaco Editor で開きます。

## Edit and save

エディタ内で編集し、**Save** を押すと現在のファイルへ保存します。Workspace を開いていない状態では保存できません。

## Current limitations

- 現在の Explorer は Workspace 直下の項目のみ表示します。
- ディレクトリの展開、Tabs の複数管理、Terminal、Git、検索は後続フェーズです。
- 外部 URL の直接ナビゲーションは許可されず、許可された HTTPS URL のみ OS の既定ブラウザで開きます。
