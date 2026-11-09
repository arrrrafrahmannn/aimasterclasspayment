import {spawn} from 'node:child_process';
const args=process.argv.slice(2);const port=args.includes('--port')?args[args.indexOf('--port')+1]:'5173';
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','wrangler.json','--local','--persist-to','.wrangler/state','--ip','0.0.0.0','--port',port,'--inspector-port','0'],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));child.on('exit',code=>process.exit(code??0));
