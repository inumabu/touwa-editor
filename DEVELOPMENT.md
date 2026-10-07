# Development Guide

Touwa Editor の開発環境、日常的な作業手順、設計ルールを定義します。目的は、個人の環境に依存せず、同じ手順で再現可能な開発を行うことです。

## Requirements

主要対象は Windows です。開発時は macOS / Linux も利用できます。

| Tool | Version / policy |
|---|---|
| Node.js | 22 LTS 系を使用 |
| npm | Node.js に同梱されるバージョンを使用 |
| Git | main への直接 push を禁止 |
| Electron | `package.json` に固定 |

```bash
node --version
npm --version
git --version
```

## Initial setup

```bash
git clone <repository-url>
cd touwa-editor
npm ci
npm run typecheck
npm run verify:all
```

`npm ci` は `package-lock.json` を厳密に利用するため、通常の開発開始時には `npm install` より優先します。依存関係を更新する場合だけ `npm install` を実行し、lockfile の差分を Pull Request に含めます。

## Local development

```bash
npm run dev
```

変更を確認する順序は、まず Renderer の UI、次に Main / Preload の IPC 動作です。ファイル操作の変更では、正常系だけでなく Workspace 外アクセス、存在しないファイル、symlink を利用した境界回避も確認します。

## Project structure

```text
src/
├─ main/       # FileSystem、Workspace、IPC、OS API
├─ preload/    # Renderer に公開する最小限の型付き API
└─ renderer/   # React UI、Monaco、表示状態
scripts/       # 再現可能な検証スクリプト
docs/adr/      # 重要な設計判断
```

新しい責務は、既存の適切な境界に追加します。Renderer から `fs`、`child_process`、`process` を import してはいけません。

## Branch and commit

```text
feature/<name>
fix/<name>
refactor/<name>
test/<name>
docs/<name>
ci/<name>
chore/<name>
```

```bash
git switch -c feature/workspace-tree
git status
git add src docs
git commit -m "feat(explorer): add workspace tree foundation"
```

Commit は Conventional Commits を使用し、絵文字や秘密情報を含めません。

## Quality gates

```bash
npm run typecheck
npm run verify:all
npm run build
npm run package
```

`package` は配布経路まで確認するときに実行します。検証が失敗した場合は、エラーを記録し、最小限の修正を行い、関連する検証を再実行します。「未検証だが完成」と報告しません。

## Adding a feature

1. Issue に背景、問題、目的、対象範囲、非対象範囲、検証方法を記載します。
2. 影響するアーキテクチャ境界とセキュリティ境界を確認します。
3. 必要なら `docs/adr/` に ADR を追加します。
4. 実装と verification script を追加します。
5. 型チェック、検証、Build、必要に応じて Package を実行します。
6. Known Limitations と CHANGELOG を更新します。

## Environment variables

秘密情報は `.env` に保存しますが、Git にコミットしません。共有が必要なキー名だけ `.env.example` に記載します。
