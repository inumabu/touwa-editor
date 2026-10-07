# Testing Guide

Touwa Editor のテストは、型、静的な境界検証、Build、Package を段階的に確認します。各段階は後続の失敗原因を切り分けやすくするため、独立して実行可能にします。

## Test commands

| Command | Purpose |
|---|---|
| `npm run typecheck` | TypeScript strict check |
| `npm run verify:security` | Electron security configuration check |
| `npm run verify:workspace` | Workspace boundary implementation check |
| `npm run verify:electron` | Main / Preload / Renderer foundation check |
| `npm run verify:all` | 上記 verification の一括実行 |
| `npm run build` | Electron Vite production build |
| `npm run package` | electron-builder package smoke test |

## Standard verification

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
```

リリース候補では Package まで実行します。

```bash
npm run package
```

## Workspace security cases

| Case | Expected result |
|---|---|
| `src/index.ts` の読み込み | 成功 |
| `../outside.txt` | 拒否 |
| `/absolute/path` | 拒否 |
| Workspace 外を指す symlink | 拒否 |
| ディレクトリの file read | 拒否 |
| 20 MB を超える保存内容 | 拒否 |

境界チェックは `path.resolve` と `realpath` の両方を使用します。

```ts
const candidate = path.resolve(root, relativePath);
if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
  throw new Error('Path is outside the workspace.');
}
```

## Manual smoke test

1. アプリケーションが起動する。
2. Open Workspace でディレクトリを選択できる。
3. Explorer にファイルが表示される。
4. ファイルを開いて内容を編集できる。
5. Save 後にディスク上の内容が更新される。
6. Renderer から Node.js API を直接利用していない。

Windows 実機では、`.cmd` / `.exe` の扱い、Installer、権限差、パス区切り文字も確認します。

## Failure reporting

失敗時は、実行コマンド、OS、Node.js / npm バージョン、期待結果、実際のエラー、再現手順を記録します。ログに秘密情報や個人情報を含めないでください。
