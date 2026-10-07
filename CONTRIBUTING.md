# Contributing Guide

Touwa Editor は、変更の安全性、再現性、レビュー可能性を重視します。小さな変更でも、責務境界と検証結果を明確にしてください。

## Before coding

大きな変更は Issue を先に作成します。Issue には Background、Problem、Goal、Scope、Non-scope、Verification を記載します。

## Branches and commits

`main` へ直接 push せず、Issue に対応するブランチを作成します。

```bash
git switch main
git pull --ff-only
git switch -c fix/workspace-boundary
```

Commit は次の形式です。

```text
<type>(<scope>): <summary>
```

```bash
git commit -m "fix(workspace): reject paths outside root"
git commit -m "test(security): cover symlink boundary"
```

使用できる type は `feat`、`fix`、`refactor`、`test`、`docs`、`ci`、`chore`、`perf` です。

## Pull Request

`.github/PULL_REQUEST_TEMPLATE.md` を使用し、変更理由、実装範囲、検証コマンド、Security 影響、UI 変更、既知の制限を記載します。

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
git push -u origin fix/workspace-boundary
```

CI が失敗した Pull Request は、原因を確認してから更新します。未検証の機能を完成済みとして説明しません。

## Code review checklist

| Area | Review question |
|---|---|
| Boundary | Renderer / Preload / Main の責務が混ざっていないか |
| IPC | channel が明示的で、引数が Main で検証されているか |
| Workspace | Workspace 外アクセスと symlink 脱出を防止しているか |
| Process | Shell string concatenation をしていないか |
| Errors | エラーを握りつぶしていないか |
| Secrets | 秘密情報をログやコードに含めていないか |
| Quality | 自動検証とドキュメントが更新されているか |

## Documentation changes

仕様、設計判断、公開 API、セキュリティ上の挙動を変更した場合は、対応する Markdown と ADR を同じ Pull Request で更新します。
