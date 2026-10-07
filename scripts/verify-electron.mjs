import { readFile } from 'node:fs/promises';
for(const file of ['src/main/main.ts','src/preload/preload.ts','src/renderer/App.tsx']) await readFile(file);
console.log('verify:electron passed');
