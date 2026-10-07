# Security Guide

## Security goals

Touwa Editor は、未信頼になり得る Workspace の内容とユーザー入力を扱います。最優先する目標は、Renderer の権限最小化、Main の明確なセキュリティ境界、Workspace 外へのアクセス防止、外部プロセスの安全な管理です。

## Electron boundary

BrowserWindow は次の設定を維持します。

```ts
webPreferences: {
  preload: path.join(__dirname, '../preload/preload.mjs'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
}
```

Preload は任意の IPC channel を公開せず、用途ごとの型付き関数だけを公開します。

```ts
contextBridge.exposeInMainWorld('touwa', {
  workspace: { open, list },
  file: { read, write },
});
```

Renderer で `require`、`process`、`fs`、`child_process` を使用してはいけません。

## IPC validation

IPC の引数は Renderer の型だけを信頼せず、Main で実行時検証します。

```ts
ipcMain.handle('file:read', async (event, relativePath: unknown) => {
  if (typeof relativePath !== 'string') {
    throw new Error('Invalid path.');
  }
  return readWorkspaceFile(requireRoot(event.sender.id), relativePath);
});
```

新しい channel は、公開 API、入力型、エラー、権限、verification を設計してから追加します。

## Workspace boundary

すべてのファイル操作は共通の path-security utility を通過させます。絶対パス、空のパス、`..` による脱出、Workspace 外の symlink、Workspace ルート自体の危険な操作を拒否します。

```ts
const root = path.resolve(workspaceRoot);
const candidate = path.resolve(root, relativePath);
if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
  throw new Error('Path is outside the workspace.');
}
```

既存パスでは lexical check に加えて `fs.realpath` の結果を確認します。新規作成時は親ディレクトリの resolved path を確認し、symlink の親を経由した脱出を防ぎます。

## External processes

将来 Terminal、Tasks、Git、Language Server を実装する際は、shell string concatenation を避け、argv を分離します。

```ts
spawn(command, args, {
  cwd: validatedWorkspaceRoot,
  shell: false,
  windowsHide: true,
});
```

cwd の検証、stdout / stderr の分離、exit code、timeout、停止処理、子プロセスの後始末を必須にします。

## Secrets and dependencies

API key、token、password、`.env` の内容を Git、Issue、PR、ログへ書き込みません。依存関係は `package-lock.json` と `npm ci` で再現します。

```bash
npm audit
npm outdated
```

自動修正を無条件で適用せず、Electron、Vite、React の互換性と Build を確認します。

## Reporting a vulnerability

脆弱性は公開 Issue にせず、GitHub の Private Security Advisory を利用してください。報告には影響範囲、再現手順、影響を受けるバージョン、可能なら最小 PoC、修正案を含めます。
