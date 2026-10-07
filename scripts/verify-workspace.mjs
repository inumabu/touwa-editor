import { readFile } from 'node:fs/promises';
const text=await readFile('src/main/workspace/path-security.ts','utf8');
for(const token of ['path.resolve','startsWith','realpath']) if(!text.includes(token)) throw new Error(`Workspace boundary check missing: ${token}`);
console.log('verify:workspace passed');
