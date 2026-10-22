document.addEventListener("DOMContentLoaded",()=>{
 const d=document,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,page=d.querySelector(".view");
 if(page){
  [...page.children].forEach(el=>{
   if(el.matches(".wrap.idea,.wrap.tz,.wrap.sec")&&!(el.previousElementSibling&&el.previousElementSibling.classList.contains("gapfill"))){
    const g=d.createElement("div");g.className="gapfill";g.setAttribute("aria-hidden","true");
    g.innerHTML='<svg viewBox="0 0 1000 80"><line class="gl" x1="40" y1="40" x2="466" y2="40"/><line class="gl" x1="534" y1="40" x2="960" y2="40"/><rect class="gd" x="486" y="26" width="28" height="28"/><circle class="gp" cx="40" cy="40" r="6"/><circle class="gp" cx="960" cy="40" r="6" style="animation-delay:1s"/></svg>';
    el.before(g)}});
  const hero=page.querySelector(".hero,.hero2");
  if(hero){hero.style.position="relative";[[70,"8%","60%",0],[34,"88%","18%",2],[18,"74%","78%",4]].forEach(([s,l,t,dl])=>{const f=d.createElement("span");f.className="float";f.style.cssText=`width:${s}px;height:${s}px;left:${l};top:${t};animation-delay:${dl}s`;hero.appendChild(f)})}
 }
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.3});
 d.querySelectorAll(".gapfill").forEach(g=>io.observe(g));
 d.querySelectorAll("[data-count]").forEach(n=>{const to=+n.dataset.count,sfx=n.dataset.sfx||"";const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();let t0=null;const step=t=>{t0=t0||t;const p=Math.min(1,(t-t0)/1600);n.textContent=Math.round(to*(1-Math.pow(1-p,3)))+sfx;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}},{threshold:.5});o.observe(n)});
 if(rm)return;
 const c=d.createElement("canvas");c.id="bg";d.body.prepend(c);const x=c.getContext("2d");let W,H,P=[],m={x:-999,y:-999};
 const size=()=>{const r=devicePixelRatio||1;W=c.width=innerWidth*r;H=c.height=innerHeight*r;x.setTransform(r,0,0,r,0,0);W=innerWidth;H=innerHeight;const n=Math.round(Math.min(90,W*H/16000));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:1.4+Math.random()*2}))};
 size();addEventListener("resize",size);addEventListener("pointermove",e=>{m.x=e.clientX;m.y=e.clientY});
 let run=true;d.addEventListener("visibilitychange",()=>{run=!d.hidden;if(run)loop()});
 const loop=()=>{if(!run)return;x.clearRect(0,0,W,H);
  for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   const dx=p.x-m.x,dy=p.y-m.y,dd=dx*dx+dy*dy;if(dd<14000){p.x+=dx*.012;p.y+=dy*.012}
   x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fillStyle="rgba(168,118,50,.75)";x.shadowColor="#B88B4F";x.shadowBlur=6;x.fill()}
  x.shadowBlur=0;
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],dx=a.x-b.x,dy=a.y-b.y,q=dx*dx+dy*dy;if(q<17000){x.strokeStyle=`rgba(168,118,50,${.45*(1-q/17000)})`;x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
  requestAnimationFrame(loop)};loop();
 if(matchMedia("(pointer:fine)").matches){const g=d.createElement("div");g.className="cg";d.body.appendChild(g);addEventListener("pointermove",e=>{g.style.transform=`translate(${e.clientX}px,${e.clientY}px)`})}
});
