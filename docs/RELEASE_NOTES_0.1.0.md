# Touwa Editor 0.1.0 Release Notes

## Overview

Touwa Editor Foundation の初回リリースです。将来のコード編集機能を安全に追加できる Electron アプリケーション基盤を提供します。

## Added

- Electron Main / Preload / Renderer architecture
- React UI shell
- Monaco Editor
- Workspace open and file read/write
- Typed IPC bridge
- Workspace path boundary validation
- TypeScript strict type checking
- Verification scripts
- GitHub Actions CI, scheduled CI, release workflow
- Dependabot and npm lockfile update workflow
- Development, architecture, security, testing, and release documentation

## Verification

- `npm ci --ignore-scripts`
- `npm run typecheck`
- `npm run verify:all`
- `npm run build`
- `npm run package`

## Known Issues

Terminal、Git、Language Server、Debugger、Extensions、再帰 Explorer、複数 Tabs は未実装です。詳細は [KNOWN_ISSUES.md](KNOWN_ISSUES.md) を参照してください。
