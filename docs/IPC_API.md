# IPC API Reference

## Boundary

Renderer は Node.js API を直接利用しません。Preload が `window.touwa` として最小限の API を公開し、Main が IPC の実装と入力検証を担当します。

## Shared types

```ts
export type FileEntry = {
  name: string;
  relativePath: string;
  kind: 'file' | 'directory';
};
```

## Workspace API

### `workspace.open`

OS のディレクトリ選択ダイアログを開きます。引数はなく、戻り値は `{ root, entries }` またはキャンセル時の `null` です。

### `workspace.list`

現在の Renderer に割り当てられた Workspace の直下エントリを取得します。引数はなく、戻り値は `FileEntry[]` です。

## File API

### `file.read(relativePath)`

Workspace 相対パスのファイルを UTF-8 で読み込みます。絶対パス、Workspace 外、symlink による境界脱出、ディレクトリの読み込みは拒否します。

### `file.write(relativePath, content)`

Workspace 相対パスへ UTF-8 で保存します。パス境界、親ディレクトリ境界、コンテンツサイズを Main で検証します。

```ts
const result = await window.touwa.file.write('src/index.ts', content);
if (!result.ok) {
  throw new Error('The file was not saved.');
}
```

## Error policy

Renderer にはユーザーが対処できるメッセージを返し、内部パスや秘密情報を不要に露出させません。Main では原因を開発者向けログに記録しますが、token、password、環境変数の値は記録しません。

## Adding a new channel

1. Preload に型付きメソッドを追加する。
2. Main の `registerIpc` に明示的な channel を登録する。
3. すべての引数を Main で実行時検証する。
4. `verify:all` に関連する検証を追加する。
5. Renderer へ Node.js API や任意 channel 呼び出し API を公開しない。
6. API の変更を CHANGELOG と必要な ADR に記載する。
