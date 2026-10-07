# Known Issues

## Foundation limitations

| Area | Current limitation | Workaround / next step |
|---|---|---|
| Explorer | Workspace 直下のみ表示 | 再帰ツリーを Phase 2 で実装 |
| Tabs | 単一ファイル表示 | 複数 Tabs を Phase 2 で実装 |
| Watcher | 外部変更を自動反映しない | 再オープンして内容を確認 |
| Save | 競合検知、Atomic Write、永続 Undo 未対応 | 保存前に外部変更を確認 |
| Developer tools | Terminal、Git、Tasks、Language Server、Debugger、Extensions 未実装 | Roadmap の Phase 3 / 4 を参照 |

## Verification limitations

Linux Sandbox で TypeScript、静的検証、Build、Linux unpacked package を確認済みです。Windows 実機での GUI 起動、NSIS Installer、Windows 固有の `.cmd` / `.exe` 動作は未検証です。

npm audit では依存関係由来の脆弱性警告が残る場合があります。依存更新時は互換性と Electron のサポート範囲を確認し、無条件に `npm audit fix --force` を適用しません。

## Reporting

再現可能な問題は GitHub Issue Template を利用してください。セキュリティ問題は公開 Issue ではなく Private Security Advisory で報告してください。
