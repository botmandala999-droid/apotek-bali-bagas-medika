"use client";
import { useEffect, useState } from "react";

const NL = String.fromCharCode(92,110);
const DR = new RegExp("^\\d{2}/\\d{2}/\\d{4}$");
const S26 = "12ifCX85urqUxt67Ad5xr26ffzGxvGNz5FFZT38oKZM8";
const FSID = "1f0xEiBz5Mzu79zxks1Ew0lfAdwQu-7VKvKxaUcz3VzU";
const LSID = "1Pl9uQvDSq4qWVT6MzqWCiZoI4Oga0wMhVu7wFwMoW4I";
const LG = [0,76269533,1004144241,1047687838,1049487848,1269180586,1269826655,1375079069,1508503184,1668129507,1704465439,2057032683,2092131821,2106161542,2142536146,226069595,233866909,246287253,256317823,338679084,443409010,456439832,456923066,527597092,543521900,556096497,742200864,762801297,867905108,936206001,993453517];
const LU = ["TARGET SHIFT","OMZET","% PENCAPAIN","GAP VS TARGET","CASH","DEBIT MANDIRI","DEBIT QRIS","NOTA","FAKTUR","SETORAN"];
const P26M = [{g:"0",l:"Jan"},{g:"1981407338",l:"Feb"},{g:"1445967367",l:"Mar"},{g:"1565950911",l:"Apr"},{g:"2013738206",l:"Mei"},{g:"163552086",l:"Jun"},{g:"1190948522",l:"Jul"}];
const FM = [{g:"0",l:"Jan"},{g:"914339812",l:"Feb"},{g:"1942627049",l:"Mar"},{g:"85697732",l:"Apr"},{g:"452486501",l:"Mei"}];

function p(v){return parseInt((v||"0").replace(/[Rp\s,."]/g,""),10)||0;}
function fr(n){return typeof n==="number"?("Rp "+n.toLocaleString("id-ID")):"-";}

export default function Home(){
  const [L,setL]=useState(true);const [E,setE]=useState("");const [T,setT]=useState("p");
  const [P26,setP26]=useState([]);const [FT,setFT]=useState(0);const [FK,setFK]=useState(0);
  const [F,setF]=useState([]);const [LP,setLP]=useState({});

  useEffect(()=>{(async()=>{try{
    let all=[],tt=0,kk=0;
    for(const m of P26M){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+S26+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const ps=ll.slice(4).filter(r=>{const c=r.split(",");return c[0]&&DR.test(c[0].replace(/"/g,""));}).map(r=>{const c=r.split(",");return{tgl:c[0].replace(/"/g,""),bln:m.l,total:p(c[9]),kunjungan:p(c[10])};});
    for(const d of ps){all.push(d);tt+=d.total;kk+=d.kunjungan;}
    }catch(e){}}
    all.sort((a,b)=>{const[d1,m1,y1]=a.tgl.split("/");const[d2,m2,y2]=b.tgl.split("/");return new Date(y1,m1-1,d1)-new Date(y2,m2-1,d2);});
    setP26(all);setFT(tt);setFK(kk);
    const sf=[];
    for(const m of FM){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+FSID+"/export?format=csv&gid="+m.g));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const ps=ll.slice(4).filter(r=>{const c=r.split(",");const v=parseInt((c[0]||"").replace(/"/g,""),10);return v>0;}).map(r=>{const c=r.split(",");return{no:c[0].replace(/"/g,""),pbf:(c[1]||"").replace(/"/g,""),jml:p(c[2]),sb:(c[5]||"").replace(/"/g,"").trim().toUpperCase()==="TRUE",bln:m.l};});
    for(const d of ps)sf.push(d);}catch(e){}}
    setF(sf);
    const lm={};
    for(const gid of LG){try{const r=await fetch("/api/gsheet?url="+encodeURIComponent("https://docs.google.com/spreadsheets/d/"+LSID+"/export?format=csv&gid="+gid));const t=await r.text();const ll=t.split(NL).filter(l=>l.trim());
    const tg=ll[2]?.split(",")[3]?.replace(/"/g,"")?.trim()||"";if(!tg)continue;const rr=[];
    for(const l of ll){const c=l.split(",").map(x=>x.replace(/"/g,"").trim());const u=c[0].toUpperCase().trim();if(LU.some(v=>u===v||u.startsWith(v)))rr.push({u:c[0],p:c[1]||"-",s:c[2]||"-",t:c[3]||"-"});}
    if(rr.length>0)lm[tg]={tg,rr};}catch(e){}}
    setLP(lm);
  }catch(e){setE("Err: "+e.message);}setL(false);})();},[]);

  if(L)return<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1e40af 100%)",gap:16}}>
<div style={{width:48,height:48,border:"4px solid rgba(255,255,255,.2)",borderTop:"4px solid #60a5fa",borderRadius:"50%",animation:"spin 1s linear infinite"}}></div>
<p style={{color:"rgba(255,255,255,.7)",fontSize:14}}>Memuat data...</p>
<style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style></div>;
  if(E)return<div style={{padding:32,color:"#dc2626"}}>{E}</div>;

  return<div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 40%,#1e40af 60%,#2563eb 100%)"}}>
<div id="lp" style={{display:"none"}}></div>
<div style={{background:"linear-gradient(135deg,#1e3a5f,#1d4ed8)",color:"white",padding:"20px 24px"}}>
<h1 style={{fontSize:22,fontWeight:"bold",margin:0}}>Apotek Bali Bagas Medika</h1>
<p style={{fontSize:13,opacity:.7,margin:"4px 0 0"}}>Dashboard Monitoring 2026</p></div>
<div style={{display:"flex",background:"rgba(255,255,255,.95)",backdropFilter:"blur(10px)",borderBottom:"1px solid #e5e7eb",paddingLeft:16}}>
{[{k:"p",l:"Penjualan"},{k:"f",l:"Faktur"}].map(t=>(
<button key={t.k} onClick={()=>setT(t.k)} style={{padding:"12px 20px",border:"none",background:"transparent",cursor:"pointer",borderBottom:T===t.k?"2px solid #2563eb":"2px solid transparent",color:T===t.k?"#2563eb":"#6b7280",fontWeight:T===t.k?600:400,fontSize:14,outline:"none"}}>{t.l}</button>))}
</div>
<div style={{padding:16,maxWidth:1200,margin:"0 auto"}}>
{T==="p"&&<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
    <Kartu label="TOTAL OMZET 2026" v={fr(FT)} c="#f59e0b"/>
    <Kartu label="TOTAL KUNJUNGAN" v={FK+" kunjungan"} c="#3b82f6"/>
    <Kartu label="RATA OMZET/HARI" v={fr(P26.length>0?Math.round(FT/P26.length):0)} c="#10b981"/>
    <Kartu label="FAKTUR BELUM LUNAS" v={F.filter(d=>!d.sb).length+" faktur"} c="#ef4444"/>
  </div>
  <Tabel title="Penjualan Harian 2026" data={[...P26].reverse()} cols={["tgl","total","kunjungan"]} fmt={(k,v)=>k==="total"?fr(v):v+" kali"}/>
</div>}
{T==="f"&&<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
    <Kartu label="TOTAL FAKTUR" v={F.length+" faktur"} c="#3b82f6"/>
    <Kartu label="LUNAS" v={F.filter(d=>d.sb).length+" faktur"} c="#10b981"/>
    <Kartu label="BELUM LUNAS" v={F.filter(d=>!d.sb).length+" faktur"} c="#ef4444"/>
    <Kartu label="NILAI TOTAL" v={fr(F.reduce((s,d)=>s+d.jml,0))} c="#8b5cf6"/>
  </div>
  <Tabel title="Semua Faktur" data={F.slice(0,100)} cols={["bln","no","pbf","jml"]} fmt={(k,v)=>k==="jml"?fr(v):v} rowBg={(d)=>d.sb?"#f0fdf4":"#fef2f2"} extraCol={(d)=><td style={{padding:"8px 12px",textAlign:"center"}}><span style={{padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:500,background:d.sb?"#dcfce7":"#fee2e2",color:d.sb?"#16a34a":"#dc2626"}}>{d.sb?"LUNAS":"BELUM"}</span></td>}/>
</div>}
</div>
</div>;
}

function Kartu({label,v,color:c}){return <div style={{background:"rgba(255,255,255,.95)",backdropFilter:"blur(10px)",borderRadius:12,padding:"14px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.08)",border:"1px solid rgba(255,255,255,.6)"}}>
<p style={{fontSize:11,color:"#9ca3af",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:.5}}>{label}</p>
<p style={{fontSize:22,fontWeight:"bold",margin:0,color:c||"#111827"}}>{v}</p></div>;}

function Tabel({title,data,cols,rowBg,fmt,extraCol:xc}){
const rows=Array.isArray(data)?data:[];
const ch={tgl:"Tanggal",total:"Omzet",kunjungan:"Kunjungan",bln:"Bulan",no:"Faktur",pbf:"PBF",jml:"Nilai"};
return <div style={{background:"rgba(255,255,255,.95)",backdropFilter:"blur(10px)",borderRadius:12,border:"1px solid rgba(255,255,255,.6)",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.08)",marginBottom:20}}>
<div style={{padding:"12px 16px",borderBottom:"1px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#374151"}}>{title}</div>
<div style={{maxHeight:400,overflow:"auto"}}><table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
<thead style={{background:"#f1f5f9",position:"sticky",top:0,boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>
<tr>{cols.map(c=>(<th key={c} style={{padding:"8px 12px",borderBottom:"1px solid #e5e7eb",fontSize:11,color:"#475569",textAlign:c==="tgl"?"left":"right"}}>{ch[c]||c}</th>))}{xc&&<th style={{padding:"8px 12px",borderBottom:"1px solid #e5e7eb",fontSize:11,color:"#475569",textAlign:"center"}}>Status</th>}</tr></thead>
<tbody>{rows.map((d,i)=>{const bg=rowBg?rowBg(d):i%2===0?"white":"#f8fafc";return <tr key={i} style={{background}}>
{cols.map(c=><td key={c} style={{padding:"5px 8px",borderBottom:"1px solid #f1f5f9",fontSize:11,fontWeight:c==="total"?600:400,color:c==="total"?"#2563eb":c==="kunjungan"?"#059669":"#374151",textAlign:c==="tgl"||c==="pbf"?"left":"right"}}>{fmt?fmt(c,d[c]):d[c]}</td>)}{xc&&xc(d)}</tr>;})}</tbody></table></div></div>;}
