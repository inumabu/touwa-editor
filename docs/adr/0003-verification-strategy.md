# ADR 0003: Verification Strategy

## Context

Electron の Main、Preload、Renderer は実行環境が異なるため、単一のテストだけではセキュリティ境界や Build の破損を検出できません。

## Decision

`typecheck`、静的な security / workspace / Electron verification、Electron Vite build、electron-builder package を段階的に実行します。CI では `npm ci` による lockfile 再現性も必須とします。

## Alternatives

- 手動起動確認だけに依存する: 再現性と自動回帰検出が不足するため却下。
- Build のみ実行する: IPC と境界ルールの欠落を検出できないため却下。
- npm を入れ子で起動する verification: Windows でのプロセス差異が増えるため却下。

## Consequences

変更ごとの検証コストは増えますが、失敗箇所を特定しやすくなり、Pull Request の品質を安定させられます。
