# Extension Development Guide

## Status

Extensions は現在未実装です。この文書は、将来の Extension Host を安全に設計するための方針です。

## Planned model

Extension Host は Renderer と分離したプロセスで動作させ、Extension の権限を capability として明示します。Workspace、Process、Network へのアクセスは個別に許可し、manifest は Main 側で検証します。

```json
{
  "id": "example.formatter",
  "version": "1.0.0",
  "capabilities": ["editor.read", "editor.write"]
}
```

Renderer に Extension の Node.js 権限を渡さず、Extension Host と Main の間にも検証済みの protocol を置きます。

## Lifecycle

Extension は `discover -> validate -> enable -> activate -> deactivate` の lifecycle を持つ予定です。activate の timeout、異常終了時の cleanup、disable 後の権限撤回を必須にします。

## Compatibility

Extension API は Semantic Versioning に従います。既存 API を破壊する変更は MAJOR、後方互換の追加は MINOR、バグ修正は PATCH として扱います。

## Security checklist

| Check | Requirement |
|---|---|
| Manifest | schema validation と identifier / version 検証 |
| Distribution | 信頼できる配布元と署名方針 |
| Process | lifecycle、timeout、crash cleanup |
| Permissions | capability の最小化と明示的な拒否 |
| Logging | 監査可能だが秘密情報を含まないログ |
| Removal | 無効化・削除時のデータ処理 |
