document.addEventListener("DOMContentLoaded",()=>{
 const d=document,page=d.querySelector(".view");if(!page)return;
 const k=page.dataset.page,G="#E8B965",N=(n)=>[...Array(n).keys()];
 const S={};
 S.capital=()=>{const h=[40,62,52,88,104,96,132,154,146,178,204],x=i=>130+i*94;
  const bars=h.map((v,i)=>`<rect class="cb" style="--i:${i}" x="${x(i)}" y="${232-v}" width="50" height="${v}" fill="${i==10?G:"#1D5A4C"}" stroke="${G}" stroke-width="1.5"/>`).join("");
  const pts=h.map((v,i)=>`${x(i)+25},${222-v}`).join(" L");
  return bars+`<path class="dr" pathLength="1" d="M${pts}" fill="none" stroke="${G}" stroke-width="3" style="--i:8"/><circle class="pu" cx="${x(10)+25}" cy="${222-h[10]}" r="9" fill="${G}"/>`};
 S.private=()=>{const o=[[56,16,1],[92,24,-1],[122,34,1]];
  return o.map(([r,t,s])=>`<g class="orb" style="animation-duration:${t}s;animation-direction:${s>0?"normal":"reverse"}"><circle cx="600" cy="120" r="${r}" fill="none" stroke="${G}" stroke-width="1.6" opacity=".7"/><circle cx="${600+r}" cy="120" r="8" fill="${G}"/></g>`).join("")+`<line class="fl" x1="0" y1="120" x2="440" y2="120"/><line class="fl" x1="760" y1="120" x2="1200" y2="120"/><circle class="pu" cx="600" cy="120" r="30" fill="${G}"/>`};
 S.legacy=()=>{const p=["M600 240 C600 205 598 175 600 135","M600 160 C570 150 540 135 505 95","M600 160 C630 150 662 135 698 95","M600 135 C592 110 590 85 575 45","M600 135 C610 110 614 85 630 45","M505 95 C490 85 470 80 445 60","M698 95 C712 85 735 80 758 60","M505 95 C500 75 495 65 480 40","M698 95 C702 75 710 62 724 38"],l=[[445,60],[480,40],[575,45],[630,45],[724,38],[758,60]];
  return `<circle class="rp" cx="600" cy="240" r="90" style="--i:0"/><circle class="rp" cx="600" cy="240" r="90" style="--i:1"/><circle class="rp" cx="600" cy="240" r="90" style="--i:2"/>`+p.map((v,i)=>`<path class="dr" pathLength="1" d="${v}" fill="none" stroke="${G}" stroke-width="${i?2.5:4}" stroke-linecap="round" style="--i:${i}"/>`).join("")+l.map(([a,b],i)=>`<circle class="lf" cx="${a}" cy="${b}" r="9" fill="${G}" style="--i:${i+5}"/>`).join("")};
 S.approach=()=>N(9).map(i=>`<line class="vl" x1="900" y1="120" x2="0" y2="${-30+i*35}" style="--i:${i}"/>`).join("")+N(3).map(i=>`<circle class="tv" cx="0" cy="0" r="7" fill="${G}" style="animation-delay:${i*2}s"/>`).join("")+`<circle class="rp" cx="900" cy="120" r="50" style="--i:0"/><circle class="pu" cx="900" cy="120" r="9" fill="${G}"/>`;
 S.foundation=()=>S.legacy();
 S.about=()=>{
  const nodes=[[150,160],[450,80],[750,160],[1050,80]];
  const route=`M${nodes[0][0]} ${nodes[0][1]} C260 160 340 80 ${nodes[1][0]} ${nodes[1][1]} S640 160 ${nodes[2][0]} ${nodes[2][1]} S940 80 ${nodes[3][0]} ${nodes[3][1]}`;
  return `<path class="about-route" d="${route}" pathLength="1" fill="none" stroke="${G}" stroke-width="2"/><path class="about-traveler" d="${route}" pathLength="1" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round"/>`+nodes.map(([x,y],i)=>`<circle class="about-ripple" cx="${x}" cy="${y}" r="14" style="--i:${i}"/><circle class="about-node" cx="${x}" cy="${y}" r="7" fill="${G}" style="--i:${i}"/>`).join("");
 };
 S.insights=()=>N(4).map(i=>{let q="";for(let x=-240;x<=1440;x+=30)q+=(x==-240?"M":"L")+x+","+(120+[34,26,18,10][i]*Math.sin(x/110+i*1.3)).toFixed(1);return `<path class="wv" d="${q}" fill="none" stroke="${G}" stroke-width="${3-i*.5}" opacity="${1-i*.2}" style="animation-duration:${8+i*2}s"/>`}).join("");
 S.contact=()=>[[600,120,0],[300,120,1],[900,120,1.5]].map(([x,y,t])=>N(3).map(i=>`<circle class="rp" cx="${x}" cy="${y}" r="70" style="--i:${i+t}"/>`).join("")+`<circle class="pu" cx="${x}" cy="${y}" r="${x==600?10:6}" fill="${G}"/>`).join("");
 S.faq=S.faq||S.contact;const hero=page.querySelector(".hero2");
 if(hero&&S[k]){hero.insertAdjacentHTML("afterend",`<section class="scene" aria-hidden="true"><svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">${S[k]()}</svg></section>`)}
 const W={home:["Capital","Wealth","Legacy","Independent advice","A longer perspective"]},w=W[k]||["Capital","Wealth","Legacy","Independent advice","A longer perspective"];
 let mq=page.querySelector(".mq");
 if(!mq){mq=d.createElement("div");mq.className="mq";mq.setAttribute("aria-hidden","true");const band=page.querySelector(".band");band?band.before(mq):page.appendChild(mq)}
 const g=`<div class="g">${w.concat(w).map(t=>`<span>${t}</span>`).join("")}</div>`;
 mq.innerHTML=`<div class="mt">${g}${g}</div>`;
});
document.addEventListener("DOMContentLoaded",()=>{
 if(matchMedia("(prefers-reduced-motion:reduce)").matches||!matchMedia("(hover:hover)").matches)return;
 document.querySelectorAll(".panel").forEach(p=>p.addEventListener("pointermove",e=>{const r=p.getBoundingClientRect();p.style.setProperty("--mx",e.clientX-r.left+"px");p.style.setProperty("--my",e.clientY-r.top+"px")}));
 document.querySelectorAll(".btn").forEach(b=>{b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3-3}px)`});b.addEventListener("pointerleave",()=>{b.style.transform=""})});
});
