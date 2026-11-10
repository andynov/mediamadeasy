// ¿Cuántas horas te cuesta tu remesa? — cálculo con datos del Banco Mundial (RPW, corredor España → Colombia, Q3 2025)
// Registros del Banco Mundial (comisión €, margen cambiario %, canal). Reproducen el costo total publicado para 140 €.
const S=[
 [2.00,0.26,"agente"],[3.99,-0.06,"online"],[3.99,-0.05,"online"],[1.99,1.91,"online"],[0.99,3.15,"online"],
 [5.50,0.29,"agente"],[3.99,1.44,"online"],[5.00,0.89,"agente"],[4.99,1.21,"online"],[6.80,-0.03,"agente"],
 [2.99,3.01,"online"],[3.99,3.15,"online"],[9.00,2.92,"online"],[35.00,1.74,"banco"]];
// Para la mediana se usan los 22 registros (igual que el promedio del Banco Mundial): repeticiones de cada precio.
const REP=[1,1,1,3,2,1,1,1,3,1,3,2,1,1];
const AVG={fee:5.23,margin:1.75};
const $=id=>document.getElementById(id);
const fmt=(x,d=1)=>x.toLocaleString("es-AR",{minimumFractionDigits:d,maximumFractionDigits:d});
const cost=(f,m,a)=>f+m/100*a;
function num(id,def){const v=parseFloat($(id).value);return isFinite(v)&&v>0?v:def}
function render(){
  const a=num("monto",140), n=num("veces",12), h=num("hora",9.36);
  const hrs=S.map(s=>({h:cost(s[0],s[1],a)*n/h,c:s[2]}));
  const avgEur=cost(AVG.fee,AVG.margin,a)*n, avgH=avgEur/h;
  const all=[];hrs.forEach((x,i)=>{for(let k=0;k<REP[i];k++)all.push(x.h)});all.sort((x,y)=>x-y);
  const med=(all[10]+all[11])/2, medEur=med*h;
  const min=Math.min(...hrs.map(x=>x.h)), max=Math.max(...hrs.map(x=>x.h));
  $("avgH").innerHTML=fmt(med)+" <small>horas al año</small>";
  $("sentence").innerHTML=`Enviar <b>${fmt(a*n,0)} €</b> al año con un servicio típico te cuesta unos <b>${fmt(medEur,0)} €</b> en comisiones y tipo de cambio: <b>${fmt(med)} horas</b> de tu trabajo, o <b>${fmt(med/8)} jornadas</b> de 8 horas. Según el servicio, entre <b>${fmt(min)}</b> y <b>${fmt(max)} horas</b>.`;
  $("minH").textContent=fmt(min)+" h"; $("medH").textContent=fmt(avgH)+" h"; $("maxH").textContent=fmt(max)+" h";
  draw(hrs,med,max);
}
function draw(hrs,avgH,max){
  const svg=$("strip"), W=Math.max(svg.clientWidth||600,320), H=130, L=14, R=20, top=40;
  const xmax=Math.max(5,Math.ceil(max/5)*5), x=v=>L+v/xmax*(W-L-R);
  const css=getComputedStyle(document.documentElement), col=c=>css.getPropertyValue("--"+c).trim();
  let g=`<line x1="${L}" x2="${W-R}" y1="${top+40}" y2="${top+40}" stroke="${col("line")}"/>`;
  const step=xmax<=20?5:xmax<=60?10:20;
  for(let t=0;t<=xmax;t+=step){g+=`<line x1="${x(t)}" x2="${x(t)}" y1="${top+40}" y2="${top+45}" stroke="${col("line")}"/><text x="${x(t)}" y="${top+60}" text-anchor="middle">${t} h</text>`}
  g+=`<line x1="${x(avgH)}" x2="${x(avgH)}" y1="${top-22}" y2="${top+40}" stroke="${col("ink")}" stroke-dasharray="3 3"/><text x="${x(avgH)+4}" y="${top-25}">mediana ${fmt(avgH)} h</text>`;
  const placed=[];
  hrs.forEach(p=>{let y=top+20;const px=x(p.h);while(placed.some(q=>Math.abs(q.x-px)<11&&q.y===y))y-=12;placed.push({x:px,y});
    g+=`<circle cx="${px}" cy="${y}" r="5.5" fill="${col(p.c)}" stroke="${col("panel")}" stroke-width="1.5"><title>${fmt(p.h)} h al año</title></circle>`});
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`); svg.innerHTML=g;
}
["monto","veces","hora"].forEach(id=>$(id).addEventListener("input",render));
window.addEventListener("resize",render);
if(window.matchMedia)matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",render);
render();
