import fs from 'node:fs/promises';
import path from 'node:path';
import { assertExistingWorkspacePath, assertWorkspacePath } from './path-security';

export type FileEntry = { name: string; relativePath: string; kind: 'file' | 'directory'; };

export async function listWorkspace(workspaceRoot: string): Promise<FileEntry[]> {
  const root = await fs.realpath(workspaceRoot);
  const entries = await fs.readdir(root, { withFileTypes: true });
  return entries.filter((entry) => !entry.name.startsWith('.')).sort((a,b) => a.name.localeCompare(b.name)).map((entry) => ({
    name: entry.name, relativePath: entry.name, kind: entry.isDirectory() ? 'directory' : 'file'
  }));
}

export async function readWorkspaceFile(root: string, relativePath: string): Promise<string> {
  const target = await assertExistingWorkspacePath(root, relativePath);
  const stat = await fs.stat(target);
  if (!stat.isFile()) throw new Error('Only files can be opened.');
  return fs.readFile(target, 'utf8');
}

export async function writeWorkspaceFile(root: string, relativePath: string, content: string): Promise<void> {
  if (typeof content !== 'string' || content.length > 20_000_000) throw new Error('Invalid file content.');
  const target = assertWorkspacePath(root, relativePath);
  const rootReal = await fs.realpath(root);
  const parentReal = await fs.realpath(path.dirname(target));
  if (parentReal !== rootReal && !parentReal.startsWith(`${rootReal}${path.sep}`)) throw new Error('Target is outside workspace.');
  await fs.writeFile(target, content, 'utf8');
}
