# ADR 0001: Electron Main / Renderer Boundary

## Context

Code editor features need filesystem and process access, while editor UI must remain unprivileged.

## Decision

Use context isolation, disabled renderer Node integration, a minimal Preload bridge, and explicit IPC handlers with Main-side validation.

## Alternatives

Expose Node APIs directly to Renderer; rejected due to larger attack surface.

## Consequences

The boundary is safer and testable, at the cost of adding typed IPC methods for every capability.
