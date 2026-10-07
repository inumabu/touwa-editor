# ADR 0002: Workspace Boundary Validation

## Context

コードエディタはユーザー入力による相対パスを扱います。Renderer だけで検証すると、IPC の直接呼び出しや symlink による Workspace 外アクセスを防げません。

## Decision

すべての Workspace ファイル操作を Main のサービスへ集約し、`path.resolve` による lexical boundary check と `realpath` による resolved boundary check を適用します。

## Alternatives

- Renderer でのみパス検証する: Main が最終境界にならないため却下。
- 任意の絶対パスを許可する: Workspace の権限モデルに反するため却下。
- Shell command でファイル操作する: injection と platform 差異が増えるため却下。

## Consequences

安全性と責務分離が向上します。一方、将来の rename、copy、move、delete API も同じ共通ユーティリティを利用する必要があります。
