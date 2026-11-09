import fs from 'node:fs';
import path from 'node:path';
const files={};
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else files['/'+path.relative('dist/client',p)]={body:fs.readFileSync(p,'utf8'),type:p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html'};}}
walk('dist/client');
fs.mkdirSync('dist/server',{recursive:true});
fs.writeFileSync('dist/server/index.js','const ASSETS='+JSON.stringify(files)+';\n'+fs.readFileSync('worker/index.js','utf8'));
