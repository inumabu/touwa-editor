import { dialog, ipcMain } from 'electron';
import { listWorkspace, readWorkspaceFile, writeWorkspaceFile } from '../workspace/workspace-service';

const workspaceRoots = new Map<number, string>();
function requireRoot(senderId: number): string { const root = workspaceRoots.get(senderId); if (!root) throw new Error('Open a workspace first.'); return root; }

export function registerIpc(): void {
  ipcMain.handle('workspace:open', async (event) => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (result.canceled || !result.filePaths[0]) return null;
    workspaceRoots.set(event.sender.id, result.filePaths[0]);
    return { root: result.filePaths[0], entries: await listWorkspace(result.filePaths[0]) };
  });
  ipcMain.handle('workspace:list', async (event) => listWorkspace(requireRoot(event.sender.id)));
  ipcMain.handle('file:read', async (event, relativePath: unknown) => { if (typeof relativePath !== 'string') throw new Error('Invalid path.'); return readWorkspaceFile(requireRoot(event.sender.id), relativePath); });
  ipcMain.handle('file:write', async (event, relativePath: unknown, content: unknown) => { if (typeof relativePath !== 'string' || typeof content !== 'string') throw new Error('Invalid file request.'); await writeWorkspaceFile(requireRoot(event.sender.id), relativePath, content); return { ok: true }; });
}
