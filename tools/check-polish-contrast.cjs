module.exports=()=>{
 const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d',{willReadFrequently:true});
 const parse=c=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=c;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].map((v,i)=>i===3?v/255:v)};
 const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
 const failures=[],small=[];let checked=0,images=0;
 const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walk.nextNode()){
 const el=node.parentElement;if(!node.textContent.trim()||!el||!el.getClientRects().length||el.closest('[hidden],[inert],[aria-hidden="true"],script,style'))continue;
 const cs=getComputedStyle(el);if(cs.visibility==='hidden'||Number(cs.opacity)===0)continue;
 const fs=parseFloat(cs.fontSize);if(fs<12)small.push({text:node.textContent.trim().slice(0,50),fs});
 let chain=[],cur=el,photo=false;while(cur){const s=getComputedStyle(cur);if(s.backgroundImage!=='none'||cur.matches('.hero,.preview-legend,.club-moment,.has-club-identity'))photo=true;chain.unshift(s.backgroundColor);cur=cur.parentElement}
 if(photo){images++;continue}
 let bg=[255,255,255];for(const color of chain){const a=parse(color);bg=bg.map((v,i)=>a[i]*a[3]+v*(1-a[3]))}
 let fg=parse(cs.color);fg=bg.map((v,i)=>fg[i]*fg[3]+v*(1-fg[3]));let r=(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05);const min=fs>=24||(fs>=18.66&&Number(cs.fontWeight)>=700)?3:4.5;checked++;
 if(r<min-.03)failures.push({tag:el.tagName,cls:el.className,text:node.textContent.trim().slice(0,60),ratio:+r.toFixed(2),color:cs.color,bg,fs});
 }
 return {checked,images,failures,small};
};
