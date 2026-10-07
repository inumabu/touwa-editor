import { spawn } from 'node:child_process';
const checks=['verify:security','verify:workspace','verify:electron'];
for(const check of checks){await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[`./scripts/${check.replace('verify:','verify-')}.mjs`],{stdio:'inherit',shell:false});child.on('exit',code=>code===0?resolve():reject(new Error(`${check} failed`)));});}
console.log('verify:all passed');
