# 🚀 Touwa Editor

Touwa Editor は、Electron + React + TypeScript + Monaco Editor で構築する、長期保守可能なデスクトップコードエディタの Foundation です。Windows を主要対象としつつ、Main / Preload / Renderer の境界を明確に保つことで、将来の macOS / Linux 対応と機能拡張を妨げない構成を採用しています。

## ✨ Features

- Monaco Editor による TypeScript / JavaScript 編集
- Workspace のオープン、一覧表示、ファイル読み書き
- Renderer / Preload / Main の責務分離
- 型付き IPC と Main 側の入力検証
- `path.resolve` / `realpath` による Workspace 境界チェック
- TypeScript strict check、verification scripts、GitHub Actions CI

## 🏗️ Architecture

```text
Renderer (React / Monaco)
        ↓ typed preload bridge
Preload (contextBridge)
        ↓ explicit IPC channels
Main (Workspace / FileSystem / OS)
```

詳細は [ARCHITECTURE.md](ARCHITECTURE.md)、IPC の契約は [IPC_API.md](docs/IPC_API.md)、セキュリティ境界は [SECURITY.md](SECURITY.md) を参照してください。

## 🛠️ Requirements and installation

Node.js 22 LTS、npm、Git が必要です。依存関係を lockfile どおりにインストールします。

```bash
git clone <repository-url>
cd touwa-editor
npm ci
```

## Development

```bash
npm run dev
```

開発ルールは [DEVELOPMENT.md](DEVELOPMENT.md)、貢献手順は [CONTRIBUTING.md](CONTRIBUTING.md) にまとめています。

## 🧪 Testing

```bash
npm run typecheck
npm run verify:all
npm run build
```

検証の詳細は [TESTING.md](TESTING.md) を参照してください。`verify:all` は security、workspace、Electron foundation の検証を Node.js から直接実行します。

## 📦 Build and package

```bash
npm run build
npm run package
```

Build は Electron Vite、Package は electron-builder を使用します。主要なリリース検証では `npm ci` から Package までを実行します。

## 🔒 Security

Renderer に Node.js API は公開しません。BrowserWindow は `contextIsolation`、`nodeIntegration: false`、sandbox を使用し、Main 側ですべての IPC 入力と Workspace 境界を検証します。脆弱性の報告は [SECURITY.md](SECURITY.md) を参照してください。

## ⚙️ CI/CD

Pull Request と push は Windows CI、平日は Scheduled CI、`v*.*.*` タグは Release workflow を実行します。Dependabot と npm lockfile update workflow も設定済みです。

## 🚀 Release

Semantic Versioning と `vMAJOR.MINOR.PATCH` タグを使用します。リリース手順は [RELEASE.md](RELEASE.md)、初回ノートは [Release Notes 0.1.0](docs/RELEASE_NOTES_0.1.0.md) を参照してください。

## 📚 Documentation

| Document | Purpose |
|---|---|
| [DEVELOPMENT.md](DEVELOPMENT.md) | 開発環境、ブランチ、品質ゲート |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Issue、Commit、Pull Request、レビュー |
| [TESTING.md](TESTING.md) | 自動検証と手動 smoke test |
| [SECURITY.md](SECURITY.md) | 脅威モデル、IPC、Workspace、Process |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Process model と拡張ポイント |
| [RELEASE.md](RELEASE.md) | Version、Tag、Release workflow |
| [ROADMAP.md](ROADMAP.md) | フェーズと完了条件 |
| [CHANGELOG.md](CHANGELOG.md) | 利用者向け変更履歴 |
| [User Guide](docs/USER_GUIDE.md) | 基本操作 |
| [IPC API Reference](docs/IPC_API.md) | Preload API と IPC 契約 |
| [Extension Guide](docs/EXTENSION_GUIDE.md) | 将来の拡張機能方針 |
| [Known Issues](docs/KNOWN_ISSUES.md) | 未実装機能と検証上の制限 |
| [ADR](docs/adr/) | 重要な設計判断 |

## 🗺️ Roadmap

Phase 1 Foundation を実装済みです。Tabs、Search、Terminal、Git、Language Server、Extensions などは [ROADMAP.md](ROADMAP.md) の後続フェーズです。
