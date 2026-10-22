document.addEventListener("DOMContentLoaded",()=>{
 const d=document,page=d.querySelector(".view");if(!page)return;
 const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 const mb=d.getElementById("mb"),nv=d.getElementById("nv");
 if(mb&&nv)mb.addEventListener("click",()=>{mb.setAttribute("aria-expanded",nv.classList.toggle("open"))});
 d.querySelectorAll("nav a[data-n]").forEach(a=>{if(a.dataset.n===page.dataset.page)a.classList.add("on")});
 page.classList.add("page-enter");
 const bar=d.createElement("div");bar.className="prog";d.body.prepend(bar);
 const h=d.querySelector("h1.big");
 if(h){const t=h.textContent;h.setAttribute("aria-label",t);h.innerHTML=t.split(" ").map((w,i)=>`<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(" ")}
 const rg=d.querySelector(".rings");if(rg)requestAnimationFrame(()=>setTimeout(()=>rg.classList.add("on"),150));
 const targets=page.querySelectorAll(".hero2,.idea,.tz,.band,.row,.hub,form,.cell,.panel,.sec>h2,.faq,.mq");
 targets.forEach((el,i)=>{el.classList.add("reveal");el.dataset.delay=String(i%4)});
 if("IntersectionObserver" in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -30px 0px"});
  targets.forEach(el=>io.observe(el));
 }else targets.forEach(el=>el.classList.add("visible"));
 const hz=d.querySelector(".horizon"),stops=[...d.querySelectorAll(".stop")];
 let ticking=false;
 const update=()=>{ticking=false;const y=scrollY,H=d.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${H>0?Math.min(1,y/H):0})`;
  if(rg&&!rm){rg.style.setProperty("--rt",(y*.04)+"deg");rg.style.setProperty("--sc",1+Math.min(y,1400)/2200)}
  if(hz){const r=hz.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.8-r.top)/(r.height+innerHeight*.1)));
   hz.style.setProperty("--p",p);stops.forEach((s,i)=>s.classList.toggle("lit",p>=i/(stops.length-1)-.03))}};
 addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
 addEventListener("resize",update);update();
 d.querySelectorAll(".rail").forEach(r=>{
  let down=false,moved=false,x0=0,s0=0;r.tabIndex=0;
  r.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;moved=false;x0=e.clientX;s0=r.scrollLeft});
  addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-x0;if(Math.abs(dx)>5){moved=true;r.classList.add("drag")}if(moved)r.scrollLeft=s0-dx});
  addEventListener("pointerup",()=>{down=false;r.classList.remove("drag")});
  r.addEventListener("click",e=>{if(moved){e.preventDefault();moved=false}},true);
  r.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();r.scrollBy({left:(e.key==="ArrowRight"?1:-1)*340,behavior:"smooth"})}});
  if(!r.nextElementSibling||!r.nextElementSibling.classList.contains("hint"))r.insertAdjacentHTML("afterend",'<p class="wrap hint">Drag, scroll or use arrow keys</p>');
 });
});
