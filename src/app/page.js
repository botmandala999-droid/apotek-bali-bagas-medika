"use client";
import { useEffect, useState } from "react";

const NL = String.fromCharCode(92,110);
const DR = new RegExp("^\\d{2}/\\d{2}/\\d{4}$");
const S26 = "12ifCX85urqUxt67Ad5xr26ffzGxvGNz5FFZT38oKZM8";
const FSID = "1f0xEiBz5Mzu79zxks1Ew0lfAdwQu-7VKvKxaUcz3VzU";
const LSID = "1Pl9uQvDSq4qWVT6MzqWCiZoI4Oga0wMhVu7wFwMoW4I";
const P26M = [{g:"0",l:"Jan"},{g:"1981407338",l:"Feb"},{g:"1445967367",l:"Mar"},{g:"1565950911",l:"Apr"},{g:"2013738206",l:"Mei"},{g:"163552086",l:"Jun"},{g:"1190948522",l:"Jul"}];

function p(v){return parseInt((v||"0").replace(/[Rp\s,."]/g,""),10)||0;}
function fr(n){return typeof n==="number"?("Rp "+n.toLocaleString("id-ID")):"-";}

export default function Home(){
  const [L,setL]=useState(true);const [E,setE]=useState("");const [T,setT]=useState("p");
  const [PX,setPX]=useState([]);const [FT,setFT]=useState(0);const [FK,setFK]=useState(0);
  const [F,setF]=useState([]);const [LP,setLP]=useState(null);const [LA,setLA]=useState("");

  useEffect(()=>{(async()=>{try{
    let all=[],tt=0,kk=0;
    for(const m of P26M){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+S26+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const ps=ll.slice(5).filter(r=>{const c=r.split(",");return c[0]&&DR.test(c[0].replace(/"/g,""));}).map(r=>{const c=r.split(",");return{
      tgl:c[0].replace(/"/g,""),bln:m.l,
      cp:p(c[1]),mp:p(c[2]),qp:p(c[3]),jp:p(c[4]),
      cs:p(c[5]),ms:p(c[6]),qs:p(c[7]),js:p(c[8]),
      total:p(c[9]),kj:p(c[10])
    };});for(const d of ps){all.push(d);tt+=d.total;kk+=d.kj;}
    }catch(e){}}
    all.sort((a,b)=>{const[d1,m1,y1]=a.tgl.split("/");const[d2,m2,y2]=b.tgl.split("/");return new Date(y1,m1-1,d1)-new Date(y2,m2-1,d2);});
    setPX(all);setFT(tt);setFK(kk);
    const sf=[];
    for(const m of P26M){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+FSID+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const ps=ll.slice(4).filter(r=>{const c=r.split(",");const v=parseInt((c[0]||"").replace(/"/g,""),10);return v>0;}).map(r=>{const c=r.split(",");return{no:c[0].replace(/"/g,""),pbf:(c[1]||"").replace(/"/g,""),jml:p(c[2]),sb:(c[5]||"").replace(/"/g,"").trim().toUpperCase()==="TRUE",bln:m.l};});
    for(const d of ps)sf.push(d);}catch(e){}}
    setF(sf);
    const lr=[],tg=[];
    for(const m of P26M){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+LSID+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    for(let i=2;i<ll.length;i++){const c=ll[i].split(",").map(x=>x.replace(/"/g,"").trim());const u=c[0]||"";if(u&&!tg.includes(u))tg.push(u);}
    }catch(e){}}
    setLA("LPH tersedia untuk "+tg.length+" tanggal");
    if(tg.length>0){const d=tg[tg.length-1];try{const lph=await loadLPH(d);if(lph)setLP(lph);}catch(e){}}
  }catch(e){setE("Err: "+e.message);}setL(false);})();},[]);

  async function loadLPH(dateStr){try{
    for(const m of P26M){const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+LSID+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const tg=ll[2]?.split(",")[3]?.replace(/"/g,"")?.trim()||"";if(!tg||tg!==dateStr)continue;
    const rr=[];for(const l of ll){const c=l.split(",").map(x=>x.replace(/"/g,"").trim());const u=c[0].toUpperCase().trim();if(u)rr.push({u:c[0],p:c[1]||"-",s:c[2]||"-",t:c[3]||"-"});}
    if(rr.length>0)return{tg,rr};}
    return null;
  }catch(e){return null;}}

  if(L)return<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:48,gap:12}}>
<div style={{width:40,height:40,border:"4px solid #e5e7eb",borderTop:"4px solid #2563eb",borderRadius:"50%",animation:"spin 1s linear infinite"}}></div>
<p style={{color:"#6b7280",fontSize:14}}>Memuat data...</p>
<style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style></div>;
  if(E)return<div style={{padding:32,color:"#dc2626"}}>{E}</div>;

  return<div style={{minHeight:"100vh",background:"white"}}>
<div style={{background:"#1e40af",color:"white",padding:"16px 24px"}}>
<h1 style={{fontSize:20,fontWeight:"bold",margin:0}}>Apotek Bali Bagas Medika</h1>
<p style={{fontSize:12,opacity:.7,margin:"2px 0 0"}}>Dashboard Monitoring</p></div>
<div style={{display:"flex",background:"#f8fafc",borderBottom:"1px solid #e5e7eb",paddingLeft:16}}>
{[{k:"p",l:"Penjualan"},{k:"l",l:"LPH"},{k:"f",l:"Faktur"}].map(t=>(
<button key={t.k} onClick={()=>setT(t.k)} style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",borderBottom:T===t.k?"2px solid #1d4ed8":"2px solid transparent",color:T===t.k?"#1d4ed8":"#64748b",fontWeight:T===t.k?600:400,fontSize:14,outline:"none"}}>{t.l}</button>))}
</div>
<div style={{padding:16,maxWidth:1200,margin:"0 auto"}}>
{T==="p"&&<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:16}}>
    <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 16px"}}>
      <p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",textTransform:"uppercase"}}>Total Omzet 2026</p>
      <p style={{fontSize:20,fontWeight:"bold",margin:0,color:"#d97706"}}>{fr(FT)}</p></div>
    <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 16px"}}>
      <p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",textTransform:"uppercase"}}>Total Kunjungan</p>
      <p style={{fontSize:20,fontWeight:"bold",margin:0,color:"#2563eb"}}>{FK}</p></div>
    <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 16px"}}>
      <p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",textTransform:"uppercase"}}>Rata Omzet/Hari</p>
      <p style={{fontSize:20,fontWeight:"bold",margin:0,color:"#059669"}}>{fr(PX.length>0?Math.round(FT/PX.length):0)}</p></div>
    <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:"12px 16px"}}>
      <p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",textTransform:"uppercase"}}>Faktur Belum Lunas</p>
      <p style={{fontSize:20,fontWeight:"bold",margin:0,color:"#dc2626"}}>{F.filter(d=>!d.sb).length}</p></div>
  </div>
  <div style={{marginBottom:16}}>
    <h3 style={{fontSize:13,color:"#374151",margin:"0 0 8px",fontWeight:600}}>Diagram Omzet per Bulan</h3>
    <div style={{display:"flex",gap:4,alignItems:"end",height:120,padding:"8px 4px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
      {PX.length>0&&["Jan","Feb","Mar","Apr","Mei","Jun","Jul"].map(b=>{const p=PX.filter(d=>d.bln===b);const tot=p.reduce((s,d)=>s+d.total,0);const max=FT;const h=max>0?(tot/max)*100:0;return<div key={b} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
        <span style={{fontSize:9,color:"#6b7280"}}>{fr(tot)}</span>
        <div style={{width:"100%",height:Math.max(h*0.8,4),background:"#3b82f6",borderRadius:"4px 4px 0 0",minHeight:4}}></div>
        <span style={{fontSize:10,color:"#374151",fontWeight:500}}>{b}</span>
      </div>;})}
    </div>
  </div>
  <Tabel title="Penjualan Harian 2026" data={[...PX].reverse()} cols={["tgl","bln","cp","mp","qp","jp","cs","ms","qs","js","total","kj"]} fmt={(k,v)=>{if(k==="total")return fr(v);if(k==="cp"||k==="mp"||k==="qp"||k==="jp"||k==="cs"||k==="ms"||k==="qs"||k==="js")return fr(v);return v;}}/>
</div>}
{T==="l"&&<div>
  <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:16,marginBottom:16}}>
    <p style={{fontSize:12,color:"#6b7280"}}>{LA}</p>
    <p style={{fontSize:11,color:"#9ca3af"}}>LPH tersedia per tanggal — cetak manual dari Google Sheet</p>
  </div>
  {LP&&<div>
    <div style={{textAlign:"right",marginBottom:8}}><button onClick={()=>window.print()} style={{background:"#1d4ed8",color:"white",border:"none",padding:"6px 16px",borderRadius:6,cursor:"pointer",fontSize:12}}>Cetak</button></div>
    <div id="lp" style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",overflow:"hidden"}}>
      <div style={{textAlign:"center",padding:"8px",borderBottom:"1px solid #e5e7eb"}}>
        <h2 style={{fontSize:13,fontWeight:"bold",margin:0}}>LAPORAN PENJUALAN HARIAN (LPH)</h2>
        <p style={{fontSize:10,margin:"1px 0",color:"#6b7280"}}>APOTEK BALI BAGAS MEDIKA</p>
        {LP.tg&&<p style={{fontSize:11,fontWeight:"bold",margin:"2px 0 0"}}>TANGGAL: {LP.tg}</p>}
      </div>
      <table style={{width:"100%",fontSize:11,borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#f1f5f9"}}><th style={{padding:"6px 10px",borderBottom:"1px solid #e5e7eb",textAlign:"left",fontSize:10,color:"#475569"}}>URAIAN</th><th style={{padding:"6px 10px",borderBottom:"1px solid #e5e7eb",textAlign:"right",fontSize:10,color:"#475569"}}>PAGI</th><th style={{padding:"6px 10px",borderBottom:"1px solid #e5e7eb",textAlign:"right",fontSize:10,color:"#475569"}}>SIANG</th><th style={{padding:"6px 10px",borderBottom:"1px solid #e5e7eb",textAlign:"right",fontSize:10,color:"#475569"}}>TOTAL</th></tr></thead>
        <tbody>{LP.rr.map((r,i)=>(<tr key={i} style={{background:i%2===0?"white":"#f8fafc"}}><td style={{padding:"4px 10px",borderBottom:"1px solid #f1f5f9",fontWeight:r.u.toUpperCase()==="KUNJUNGAN"?600:400}}>{r.u}</td><td style={{padding:"4px 10px",borderBottom:"1px solid #f1f5f9",textAlign:"right"}}>{r.p}</td><td style={{padding:"4px 10px",borderBottom:"1px solid #f1f5f9",textAlign:"right"}}>{r.s}</td><td style={{padding:"4px 10px",borderBottom:"1px solid #f1f5f9",textAlign:"right",fontWeight:600}}>{r.t}</td></tr>))}</tbody></table>
    </div>
  </div>}
</div>}
{T==="f"&&<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:16}}>
    <Kartu label="Total Faktur" v={F.length+" faktur"} c="#3b82f6"/>
    <Kartu label="Lunas" v={F.filter(d=>d.sb).length+" faktur"} c="#10b981"/>
    <Kartu label="Belum Lunas" v={F.filter(d=>!d.sb).length+" faktur"} c="#ef4444"/>
    <Kartu label="Nilai Total" v={fr(F.reduce((s,d)=>s+d.jml,0))} c="#8b5cf6"/>
    <Kartu label="Piutang" v={fr(F.filter(d=>!d.sb).reduce((s,d)=>s+d.jml,0))} c="#dc2626"/>
  </div>
  <Tabel title="Faktur 2026" data={F.slice(0,200)} cols={["bln","no","pbf","jml"]} fmt={(k,v)=>k==="jml"?fr(v):v} rowBg={(d)=>d.sb?"#f0fdf4":"#fef2f2"} extraCol={(d)=><td style={{padding:"6px 10px",textAlign:"center"}}><span style={{padding:"2px 10px",borderRadius:999,fontSize:10,fontWeight:500,background:d.sb?"#dcfce7":"#fee2e2",color:d.sb?"#16a34a":"#dc2626"}}>{d.sb?"LUNAS":"BELUM"}</span></td>}/>
</div>}
</div>
<style>{"@media print{body *{visibility:hidden!important}#lp,#lp *{visibility:visible!important}#lp{position:absolute;left:0;top:0;width:100%}@page{margin:8mm;size:A4 landscape}}"}</style>
</div>;
}

function Kartu({label,v,color:c}){return <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",padding:"10px 14px"}}>
<p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",textTransform:"uppercase"}}>{label}</p>
<p style={{fontSize:18,fontWeight:"bold",margin:0,color:c||"#111827"}}>{v}</p></div>;}

function Tabel({title,data,cols,rowBg,fmt,extraCol:xc}){
const rows=Array.isArray(data)?data:[];
const ch={tgl:"Tgl",bln:"Bln",cp:"C.P",mp:"M.P",qp:"Q.P",jp:"J.P",cs:"C.S",ms:"M.S",qs:"Q.S",js:"J.S",total:"Total",kj:"Kun",no:"No",pbf:"PBF",jml:"Nilai"};
return <div style={{background:"white",borderRadius:8,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:16}}>
<div style={{padding:"10px 14px",borderBottom:"1px solid #e5e7eb",fontSize:13,fontWeight:600,color:"#374151"}}>{title} <span style={{fontWeight:400,fontSize:11,color:"#9ca3af"}}>({rows.length} baris)</span></div>
<div style={{maxHeight:400,overflow:"auto"}}><table style={{width:"100%",fontSize:11,borderCollapse:"collapse"}}>
<thead style={{background:"#f1f5f9",position:"sticky",top:0,boxShadow:"0 1px 2px rgba(0,0,0,.05)"}}>
<tr>{cols.map(c=>(<th key={c} style={{padding:"6px 8px",borderBottom:"1px solid #e5e7eb",fontSize:10,color:"#475569",textAlign:"right"}}>{ch[c]||c}</th>))}{xc&&<th style={{padding:"6px 8px",borderBottom:"1px solid #e5e7eb",fontSize:10,color:"#475569",textAlign:"center"}}>Status</th>}</tr></thead>
<tbody>{rows.map((d,i)=>{const bg=rowBg?rowBg(d):i%2===0?"white":"#f8fafc";return <tr key={i} style={{background}}>
{cols.map(c=><td key={c} style={{padding:"4px 8px",borderBottom:"1px solid #f1f5f9",fontSize:10,fontWeight:c==="total"?600:400,color:c==="total"?"#2563eb":"#374151",textAlign:"right"}}>{fmt?fmt(c,d[c]):d[c]}</td>)}{xc&&xc(d)}</tr>;})}</tbody></table></div></div>;}
