# Release Guide

Touwa Editor は Semantic Versioning を使用します。

```text
MAJOR.MINOR.PATCH
```

MAJOR は互換性を壊す変更、MINOR は後方互換の新機能、PATCH はバグ修正と小規模改善です。Git tag は `vMAJOR.MINOR.PATCH` 形式です。

## Release preparation

1. Issue と変更範囲を確認します。
2. CHANGELOG と Release Notes を更新します。
3. Known Issues を確認し、重大問題が隠れていないことを確認します。
4. version と tag の値が一致していることを確認します。
5. 次の検証を実行します。

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

## Version update

```bash
npm version patch --no-git-tag-version
# または minor / major
node -p "require('./package.json').version"
```

version 更新後は `package-lock.json` も確認し、意図しない依存差分がないことを確認します。

## GitHub Actions release

Release workflow は `v*.*.*` tag の push で起動します。

```bash
git switch main
git pull --ff-only
git tag v0.1.1
git push origin v0.1.1
```

Workflow は Checkout、Node.js 設定、version 検証、`npm ci`、typecheck、verification、Build、Package、SHA256 checksum、GitHub Release 作成を順に実行します。Release 作成には GitHub Actions の token を利用し、ローカルから直接公開 Release を作成しません。

## Release checklist

| Check | Status |
|---|---|
| 起動できる | □ |
| 基本 Workspace 操作が動く | □ |
| `npm run typecheck` | □ |
| `npm run verify:all` | □ |
| `npm run build` | □ |
| `npm run package` | □ |
| CHANGELOG 更新 | □ |
| Release Notes 準備 | □ |
| 重大な既知問題の確認 | □ |
| CI 成功 | □ |

## Rollback and patch policy

公開済み Release の履歴を変更して問題を隠しません。重大なバグは新しい PATCH version で修正し、Known Issues、CHANGELOG、Release Notes に影響を明記します。
