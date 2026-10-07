import { readFile } from 'node:fs/promises';
const files=['src/main/main.ts','src/preload/preload.ts','src/main/ipc/register-ipc.ts'];
for(const file of files){const text=await readFile(file,'utf8');if(file.includes('main.ts')&&!text.includes('contextIsolation: true')) throw new Error('Electron isolation is not enabled');if(file.includes('preload')&&text.includes('nodeIntegration')) throw new Error('Preload must not configure nodeIntegration');}
console.log('verify:security passed');
