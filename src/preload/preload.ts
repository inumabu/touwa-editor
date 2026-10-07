import { contextBridge, ipcRenderer } from 'electron';

type FileEntry = { name: string; relativePath: string; kind: 'file' | 'directory' };
const api = { workspace: { open: (): Promise<{root:string;entries:FileEntry[]} | null> => ipcRenderer.invoke('workspace:open'), list: (): Promise<FileEntry[]> => ipcRenderer.invoke('workspace:list') }, file: { read: (relativePath: string): Promise<string> => ipcRenderer.invoke('file:read', relativePath), write: (relativePath: string, content: string): Promise<{ok:boolean}> => ipcRenderer.invoke('file:write', relativePath, content) } };
contextBridge.exposeInMainWorld('touwa', api);
export type TouwaApi = typeof api;
