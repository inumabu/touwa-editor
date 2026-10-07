# Changelog

このファイルは、利用者に影響する変更を Semantic Versioning と対応付けて記録します。Unreleased の変更は次回 Release 前に分類し、実装されていない内容を Added として記載しません。

## [Unreleased]

### Added

- 追加予定の機能は実装後に記載します。

### Changed

- 既存動作の変更を記載します。

### Fixed

- 修正済みの不具合を記載します。

### Security

- セキュリティ境界や依存関係の修正を記載します。

## [0.1.0] - 2026-10-06

### Added

- Electron / React / TypeScript / Monaco Editor の Foundation
- Renderer、Preload、Main の責務分離
- Secure workspace IPC と Workspace path boundary validation
- Workspace のオープン、直下ファイル一覧、読み込み、保存
- TypeScript strict typecheck と verification scripts
- GitHub Actions CI、Scheduled CI、Release workflow
- Dependabot と npm lockfile update workflow
- Architecture、Security、Testing、Development、Release 文書

### Security

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- Main 側での IPC 引数検証
- `path.resolve` と `realpath` による Workspace 境界検証

### Known limitations

- Terminal、Git、Language Server、Debugger、Extensions は未実装です。
- Explorer は Workspace 直下のみを表示します。
- Windows 実機の GUI と Installer は CI / Release 環境で追加検証が必要です。

[Unreleased]: https://github.com/touwa-editor/touwa-editor/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/touwa-editor/touwa-editor/releases/tag/v0.1.0
