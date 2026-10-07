# Roadmap

Roadmap は、機能数を増やすことよりも、既存のセキュリティ境界と検証可能性を維持しながら段階的に拡張するための計画です。各 Phase の機能は、完了条件と回帰検証を満たすまで完成扱いにしません。

## Phase 1 — Foundation

**Status: ✅ 基盤実装済み**

Electron、React、TypeScript、Monaco、Preload、型付き IPC、Workspace の基本読み書き、Security verification、CI/CD、文書を提供します。完了条件は `npm ci`、`npm run typecheck`、`npm run verify:all`、`npm run build`、`npm run package` が通過し、Windows CI で主要フローが確認できることです。

## Phase 2 — Core Editor

**Status: ⏳ 次期計画**

Tabs、Editor Groups、再帰 Explorer、Search / Replace、Multi Cursor、未保存変更表示、競合検知を追加します。

```text
Explorer selection -> model registry -> tab state -> editor group layout
```

大きな Workspace の性能、ファイル Watcher、Atomic Write を設計してから実装します。

## Phase 3 — Developer Tools

**Status: ⏳ 計画中**

Language Server、Completion、Hover、Signature Help、Diagnostics、Git、Integrated Terminal、Tasks、Debugger / DAP を追加します。外部 process は `shell: false`、argv 分離、cwd 検証、timeout、stop、exit code、stdout / stderr 分離を共通要件とします。

## Phase 4 — Extensibility

**Status: ⏳ 計画中**

Settings、Themes、Extension Host、Extension manifest、capability-based permissions、API versioning を追加します。Extension に Main の無制限権限を与えず、プロセスと権限を分離します。

## Phase 5 — Quality

**Status: ⏳ 計画中**

Regression tests、Security hardening、Performance profiling、Release automation、Dependency automation、Crash diagnostics を強化します。

## Prioritization rules

優先順位は Security、Stability、Correctness、Maintainability、Testability、Extensibility、UX、新機能の順です。各機能は、既存の境界を曖昧にする場合は延期し、まず共通 service または verification の改善を行います。
