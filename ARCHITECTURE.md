# Architecture

## Design principles

Touwa Editor は、Renderer を UI に限定し、OS やファイルシステムへの権限を Main に集約します。機能数よりも、境界の明確さ、検証可能性、将来の拡張性を優先します。

## Process model

```text
┌─────────────────────────────┐
│ Renderer: React / Monaco    │  UI、表示状態、ユーザー操作
└──────────────┬──────────────┘
               │ typed window.touwa API
┌──────────────▼──────────────┐
│ Preload: contextBridge      │  最小限の IPC bridge
└──────────────┬──────────────┘
               │ explicit channels
┌──────────────▼──────────────┐
│ Main: IPC / Workspace       │  検証、FileSystem、OS API
└──────────────┬──────────────┘
               ▼
        FileSystem / Process / OS
```

## Responsibilities

| Layer | Owns | Must not do |
|---|---|---|
| Renderer | React UI、Monaco、tabs、表示状態 | `fs`、`child_process`、任意 IPC |
| Preload | 型付き bridge、channel の固定 | ビジネスロジックの肥大化、Node API の全公開 |
| Main | FileSystem、Workspace、process、OS、入力検証 | Renderer UI 状態の直接管理 |

## File flow

ファイルを開く場合、Renderer が `window.touwa.file.read(relativePath)` を呼び、Preload が `file:read` channel を invoke し、Main が Workspace root を解決して境界を検証します。検証に成功した場合だけ UTF-8 で読み込み、結果または安全なエラーを返します。

```text
click file
  -> window.touwa.file.read("src/main.ts")
  -> ipcRenderer.invoke("file:read", relativePath)
  -> Main validates root + path + realpath
  -> fs.readFile(target, "utf8")
  -> Renderer updates Monaco model
```

## Workspace security service

`src/main/workspace/path-security.ts` は、複数の FileSystem 機能が再利用する境界ユーティリティです。UI コンポーネントごとに検証を実装してはいけません。新しい copy、move、delete、rename API も同じ utility を利用します。

## Extension points

将来の機能は bounded service として追加します。

| Directory | Responsibility |
|---|---|
| `terminal/` | 外部 process と lifecycle |
| `tasks/` | task schema、実行権限、ログ |
| `git/` | argv 分離した Git client |
| `language/` | Language Server lifecycle と diagnostics |
| `debugger/` | DAP transport と session 管理 |
| `extensions/` | 権限付き Extension Host |

各サービスは Renderer に直接 Node.js API を渡さず、Preload に必要最小限の API を追加します。

## State management

現在の UI state は React component state で管理しています。Tabs、Editor Groups、Settings、Problems が増えた段階で、ドメイン state と一時的な表示 state を分離し、Main の永続 state と Renderer の表示 state を混同しない構成へ移行します。

## Performance guidelines

大量ファイルの Explorer では遅延読み込み、大きなファイルではサイズ制限または段階読み込み、Terminal では出力上限と backpressure、Watcher では debounce を検討します。UI thread を同期 FileSystem 操作でブロックしません。
