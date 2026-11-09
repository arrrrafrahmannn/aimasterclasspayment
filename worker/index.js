const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const handler={async fetch(request,env){const url=new URL(request.url);
if(url.pathname==='/api/payments'){
 if(request.method!=='POST')return json({error:'Method not allowed.'},405);
 if(request.headers.get('Origin')!==url.origin && request.headers.get('Origin')!=='https://arrrrafrahmannn.github.io')return json({error:'Please submit from this website.'},403);
 if(!request.headers.get('Content-Type')?.includes('application/json'))return json({error:'Invalid request.'},415);
 if(Number(request.headers.get('content-length')||0)>2048)return json({error:'Request too large.'},413);
 try{const body=await request.text();if(body.length>2048)return json({error:'Request too large.'},413);let data;try{data=JSON.parse(body);}catch{return json({error:'Invalid payment details.'},400);}
 const name=String(data.name||'').trim().replace(/\s+/g,' '),phone=String(data.whatsapp||'').replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)).replace(/[\s()+-]/g,''),transaction=String(data.transactionId||'').trim().toUpperCase();
 if(name.length<2||name.length>100||/[\u0000-\u001f]/.test(name))return json({error:'Please enter your full name.'},400);
 if(!/^(?:(?:880|0)?1[3-9]\d{8})$/.test(phone))return json({error:'Please enter a valid Bangladesh WhatsApp number.'},400);
 if(!/^[A-Z0-9]{8,20}$/.test(transaction))return json({error:'Please enter the transaction ID from your bKash receipt.'},400);
 const normalized=phone.startsWith('880')?'+'+phone:phone.startsWith('0')?'+88'+phone:'+880'+phone;
 const reference='EKTU-'+crypto.randomUUID().replace(/-/g,'').slice(0,12).toUpperCase();
 try{await env.DB.prepare('INSERT INTO payments (id,name,whatsapp,transaction_id,amount,status,created_at) VALUES (?,?,?,?,?,?,?)').bind(reference,name,normalized,transaction,299,'pending',new Date().toISOString()).run();}catch(error){if(String(error).includes('UNIQUE constraint failed'))return json({error:'This transaction ID has already been submitted. Please keep your original reference while it is verified.'},409);throw error;}
 return json({reference,status:'pending'},201);
 }catch{return json({error:'We could not save your details right now. Please try again shortly.'},503);}
}
if(url.pathname.startsWith('/api/'))return json({error:'Not found.'},404);
if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405});
const asset=ASSETS[url.pathname==='/'?'/index.html':url.pathname];if(!asset)return new Response('Not found',{status:404});
return new Response(request.method==='HEAD'?null:asset.body,{headers:{'Content-Type':asset.type+'; charset=utf-8','Cache-Control':url.pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"}});
}};

export default {async fetch(request,env){
 const url=new URL(request.url),origin=request.headers.get('Origin');
 const allowedOrigin=origin===url.origin||origin==='https://arrrrafrahmannn.github.io';
 if(url.pathname==='/api/payments'&&request.method==='OPTIONS'){
  if(!allowedOrigin)return new Response(null,{status:403});
  return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400','Vary':'Origin'}});
 }
 const response=await handler.fetch(request,env);
 if(url.pathname.startsWith('/api/')&&allowedOrigin){const headers=new Headers(response.headers);headers.set('Access-Control-Allow-Origin',origin);headers.set('Vary','Origin');return new Response(response.body,{status:response.status,headers});}
 return response;
}};
