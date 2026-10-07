import path from 'node:path';
import fs from 'node:fs/promises';

export function assertWorkspacePath(workspaceRoot: string, relativePath: string): string {
  if (typeof relativePath !== 'string' || relativePath.length === 0 || path.isAbsolute(relativePath)) {
    throw new Error('A relative workspace path is required.');
  }
  const root = path.resolve(workspaceRoot);
  const candidate = path.resolve(root, relativePath);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    throw new Error('Path is outside the workspace.');
  }
  return candidate;
}

export async function assertExistingWorkspacePath(workspaceRoot: string, relativePath: string): Promise<string> {
  const candidate = assertWorkspacePath(workspaceRoot, relativePath);
  const rootReal = await fs.realpath(workspaceRoot);
  const targetReal = await fs.realpath(candidate);
  if (targetReal !== rootReal && !targetReal.startsWith(`${rootReal}${path.sep}`)) {
    throw new Error('Resolved path is outside the workspace.');
  }
  return targetReal;
}
