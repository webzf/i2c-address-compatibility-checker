let devices=[],selected=[];
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

fetch("data/devices.json").then(r=>r.json()).then(data=>{
devices=data; populate(); render(devices);
}).catch(()=>{$("results").innerHTML="<p>Unable to load the device database.</p>"});

function populate(){
devices.forEach((d,i)=>{
const o=document.createElement("option");
o.value=i;o.textContent=d.name;$("device").appendChild(o);
});
}

function render(list){
$("count").textContent=`${list.length} device${list.length===1?"":"s"} found`;
$("results").innerHTML=list.map(d=>`
<article class="result">
<h3>${esc(d.name)}</h3>
<div class="addresses">${d.addresses.map(a=>`<span class="address">${esc(a)}</span>`).join("")}</div>
<p class="meta"><strong>Type:</strong>${esc(d.category)}</p>
<p class="meta"><strong>Manufacturer:</strong>${esc(d.manufacturer)}</p>
<p>${esc(d.description)}</p>
${d.source ? `<p class="source"><a href="${d.source.url}" target="_blank" rel="noopener noreferrer">Source: ${esc(d.source.label)} ↗</a></p>` : ""}
</article>`).join("")||'<div class="result"><strong>No matching devices found.</strong></div>';
}

$("search").addEventListener("input",e=>{
const q=e.target.value.trim().toLowerCase();
render(q?devices.filter(d=>[d.name,d.category,d.manufacturer,d.description,...d.addresses].join(" ").toLowerCase().includes(q)):devices);
});

$("clear").onclick=()=>{
$("search").value="";render(devices);$("search").focus();
};

document.querySelectorAll(".example").forEach(b=>b.onclick=()=>{
$("search").value=b.textContent;
$("search").dispatchEvent(new Event("input"));
});

$("add").onclick=()=>{
const i=Number($("device").value);
if(!Number.isInteger(i))return;
if(!selected.some(d=>d.name===devices[i].name))selected.push(devices[i]);
$("device").value="";drawSelected();check();
};

function drawSelected(){
$("selected").innerHTML=selected.map((d,i)=>`
<div class="selected">
<div><strong>${esc(d.name)}</strong><br>
<span class="selected-address">${esc(d.addresses.join(" / "))}</span></div>
<button class="remove" data-i="${i}">Remove</button>
</div>`).join("");

document.querySelectorAll(".remove").forEach(b=>b.onclick=()=>{
selected.splice(Number(b.dataset.i),1);drawSelected();check();
});
}

function conflicts(){
const map={};
selected.forEach(d=>d.addresses.forEach(a=>(map[a]??=[]).push(d)));
return Object.entries(map).filter(([,items])=>items.length>1);
}

function assignment(){
const order=[...selected].sort((a,b)=>a.addresses.length-b.addresses.length);
const out={};

function solve(i,used){
if(i===order.length)return true;
const d=order[i];

for(const a of d.addresses){
if(used.has(a))continue;
out[d.name]=a;used.add(a);

if(solve(i+1,used))return true;

used.delete(a);delete out[d.name];
}
return false;
}

return solve(0,new Set())?out:null;
}

function table(map){
return `<table>
<thead><tr><th>Device</th><th>Recommended Address</th></tr></thead>
<tbody>${selected.map(d=>`
<tr><td>${esc(d.name)}</td><td class="addr">${esc(map[d.name])}</td></tr>`).join("")}</tbody>
</table>`;
}

function check(){
if(selected.length<2){
$("compatibility").innerHTML="";return;
}

const c=conflicts();
const a=assignment();

if(!c.length){
const map={};
selected.forEach(d=>map[d.name]=d.addresses[0]);

$("compatibility").innerHTML=`
<div class="status ok">
<h3>✓ No I2C address conflicts detected</h3>
<p>The selected devices have no common address in their listed ranges and can normally share the same I2C bus.</p>
<strong>Configuration</strong>${table(map)}
<p>Address compatibility does not guarantee electrical compatibility. Check voltage, pull-ups and bus speed.</p>
</div>`;
return;
}

if(a){
$("compatibility").innerHTML=`
<div class="status warn">
<h3>⚠ Address conflict detected — solution available</h3>
<p>A unique address assignment is possible with the available address options.</p>
<div class="recommendation">
<strong>✓ Recommended configuration</strong>${table(a)}
</div>
<p>Only change an address if the exact breakout board supports that configuration.</p>
</div>`;
return;
}

$("compatibility").innerHTML=`
<div class="status bad">
<h3>⚠ I2C address conflict cannot be resolved automatically</h3>
<p>The selected devices do not have enough unique address options to share one bus.</p>
${c.map(([a,ds])=>`
<div class="recommendation">
<strong>Conflict at ${esc(a)}</strong>
<p>${ds.map(d=>esc(d.name)).join(" and ")} can use this address.</p>
</div>`).join("")}
<div class="recommendation">
<strong>Possible solutions</strong>
<ul>
<li>Change an address if supported.</li>
<li>Use another I2C bus.</li>
<li>Use an I2C multiplexer such as the TCA9548A.</li>
</ul>
</div>
</div>`;
}
