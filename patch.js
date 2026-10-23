/* ===== CONFIGURAÇÃO: número do WhatsApp da loja (com DDI e DDD). Vazio = só mostra a prévia. ===== */
const WA_NUMERO='';
(()=>{
const $=i=>document.getElementById(i),BG=['cl','bk','dp','vg'];
let FECHADO=false,cxN=0;
const seg=()=>new Date(Date.now()+OFF+HORARIO.utc*36e5).getUTCDay()===1;
const sync=id=>document.querySelectorAll(`[data-q="${id}"]`).forEach(x=>x.textContent=q[id]||0);
const add=(id,n=1)=>{q[id]=Math.max(0,(q[id]||0)+n);sync(id);bar(true)};
const copia=(t,btn)=>{const ok=()=>{const o=btn.textContent;btn.textContent='Copiado!';setTimeout(()=>btn.textContent=o,1800)};
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(ok,()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(_){}a.remove()})};

/* 1-4: loja aberta por padrão + modo "fechada" */
loja=()=>{if(!FECHADO)return{on:true,txt:'Aberto agora · até 23h30'};const s=seg(),d=s?'terça':'hoje';return{on:false,txt:`Fechado · abre ${d} às 18h`,qd:`${d} às 18h`,dia:d}};
upLoja=()=>{LJ=loja();$('sts').classList.toggle('off',!LJ.on);$('stt').textContent=LJ.txt;const f=$('fch');f.hidden=LJ.on;if(!LJ.on)f.innerHTML='<span><b>Estamos fechados agora.</b> Agende seu pedido para a abertura.</span>';bar()};
bloqueio=()=>{const s=sum();return s<MINIMO?`O pedido mínimo é ${R(MINIMO)}. Faltam ${R(MINIMO-s)}.`:''};
const KC='brasa-carrinho',save=()=>{try{localStorage.setItem(KC,JSON.stringify({q,c:all.filter(o=>o.mb||o.cx)}))}catch(_){}};
const bar0=bar;bar=b=>{bar0(b);zap.textContent=LJ.on?'Enviar pelo WhatsApp':LJ.dia==='terça'?'Agendar para terça às 18h':'Agendar para as 18h';save()};
hero.prepend(Object.assign(document.createElement('div'),{className:'dmb',textContent:'Projeto de demonstração'}));

/* 7: carrinho guardado no aparelho */
try{const s=JSON.parse(localStorage.getItem(KC)||'{}');(s.c||[]).forEach(o=>{if(!all.some(x=>x.id===o.id))all.push(o);if(o.mb)mbN=Math.max(mbN,+o.id.slice(2)||0);if(o.cx)cxN=Math.max(cxN,+o.id.slice(2)||0)});Object.assign(q,s.q||{});Object.keys(q).forEach(k=>sync(k))}catch(_){}

/* janelas novas: personalizar, prévia da mensagem, painel do carrinho + botão flutuante */
document.body.insertAdjacentHTML('beforeend',`
<dialog id="ex" class="dg" aria-label="Personalizar"><div class="ckh"><div><h2>Quer personalizar?</h2><small id="exn"></small></div><button type="button" data-x="ex" aria-label="Fechar">✕</button></div><div class="ckb"><div id="exl"></div><button class="cks" type="button" id="exok">Adicionar ao pedido</button><button class="cks" type="button" id="exsk" style="background:#fff;color:var(--ink)">Pular</button></div></dialog>
<dialog id="pv" class="dg" aria-label="Prévia da mensagem"><div class="ckh"><div><h2>Prévia da mensagem</h2><small>Em um site real, esta mensagem seria enviada ao WhatsApp da loja.</small></div><button type="button" data-x="pv" aria-label="Fechar">✕</button></div><div class="ckb"><pre id="pvt"></pre><button class="cks" type="button" id="pvc">Copiar mensagem</button><button class="cks" type="button" id="pvw" hidden>Abrir no WhatsApp</button></div></dialog>
<dialog id="cp2" class="dg" aria-label="Seu pedido"><div class="ckh"><div><h2>Seu pedido</h2></div><button type="button" data-x="cp2" aria-label="Fechar">✕</button></div><div class="ckb"><ul class="pl2" id="cpl"></ul><div id="cps"></div><dl class="tts" id="cpt"></dl><button class="cks" type="button" id="cpgo">Finalizar pedido</button></div></dialog>
<button id="wpf" type="button" aria-label="WhatsApp">${document.querySelector('.cks svg').outerHTML}</button>`);
document.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>$(b.dataset.x).close());
document.querySelectorAll('.dg').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

/* 10-11: "Quer personalizar?" ao tocar + num hambúrguer */
let cur;
const abrirEx=id=>{cur=id;const o=I.find(x=>x.id===id);$('exn').textContent=o.n+' · '+R(o.p);$('exl').innerHTML=X.map(x=>`<label class="xo"><input type="checkbox" value="${x.id}"><span>${x.n}</span><b>+ ${R(x.p)}</b></label>`).join('');$('ex').showModal()};
$('exsk').onclick=()=>{$('ex').close();add(cur)};
$('exok').onclick=()=>{const o=I.find(x=>x.id===cur),s=X.filter(x=>$('exl').querySelector(`input[value="${x.id}"]`).checked);$('ex').close();if(!s.length)return add(cur);
  const n=[o.n,...s.map(x=>x.n)].join(' + '),p=o.p+s.reduce((a,x)=>a+x.p,0);let c=all.find(x=>x.cx&&x.n===n);if(!c){c={id:'cx'+(++cxN),c:'Personalizado',n,d:'',p,cx:1};all.push(c)}add(c.id);toast(`${n} entrou no pedido!`)};
document.addEventListener('click',e=>{const b=e.target.closest('[data-d="1"]');if(b&&BG.includes(b.dataset.id)){e.stopPropagation();abrirEx(b.dataset.id)}},true);
document.querySelector('.adsec').remove();

/* 7-8: painel do carrinho com sugestão */
const rc=()=>{const it=all.filter(o=>q[o.id]);
  $('cpl').innerHTML=it.length?it.map(o=>`<li class="cl"><span class="nm">${o.n}${o.mb?`<small>${o.d}</small>`:''}</span><b>${R(q[o.id]*o.p)}</b><span class="st"><button type="button" data-c="${o.id}" data-v="-1" aria-label="Menos">−</button><output>${q[o.id]}</output><button type="button" data-c="${o.id}" data-v="1" aria-label="Mais">+</button></span><button type="button" class="rm" data-c="${o.id}" data-v="x">Remover</button></li>`).join(''):'<li>Seu carrinho está vazio.</li>';
  const sg=['bf','rf'].filter(id=>!q[id]).map(id=>I.find(o=>o.id===id));
  $('cps').innerHTML=sg.length&&it.length?`<div class="sg"><b>Vai uma batata e um refri?</b><button type="button" id="sgb">+ ${sg.map(o=>o.n.split(' ')[0]).join(' e ')} · ${R(sg.reduce((a,o)=>a+o.p,0))}</button></div>`:'';
  const T=totais();$('cpt').innerHTML=`<div><dt>Subtotal</dt><dd>${R(T.s)}</dd></div><div><dt>Entrega</dt><dd>${T.f===null?'calculada ao escolher o bairro':R(T.f)}</dd></div><div><dt>Cupom</dt><dd>${cupom&&T.d?'− '+R(T.d):'aplique na finalização'}</dd></div><div class="tt"><dt>Total</dt><dd>${R(T.t)}</dd></div>`};
$('cp2').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b){const v=b.dataset.v;add(b.dataset.c,v==='x'?-q[b.dataset.c]:+v);rc();return}
  if(e.target.id==='sgb'){['bf','rf'].forEach(id=>{if(!q[id])add(id)});rc()}});
const bi=document.querySelector('.bi');bi.style.cursor='pointer';bi.setAttribute('role','button');bi.onclick=()=>{rc();$('cp2').showModal()};
$('cpgo').onclick=()=>{$('cp2').close();zap.click()};

/* 9: Pix copia e cola */
const pgs=document.querySelector('.pgs');
pgs.insertAdjacentHTML('beforeend','<label><input type="radio" name="pg" value="Pix copia e cola"><span>Pix copia e cola</span></label>');
pgs.insertAdjacentHTML('afterend','<div class="pixb" id="pixb" hidden><small>Chave Pix (fictícia, só exemplo)</small><code id="pixk">00020126EXEMPLO-FICTICIO-BRASA-BURGER-DEMO</code><button type="button" id="pixc">Copiar</button><p>Envie o comprovante no WhatsApp.</p></div>');
ckf.addEventListener('change',()=>{$('pixb').hidden=ckf.elements.pg.value!=='Pix copia e cola'});
$('pixc').onclick=e=>copia($('pixk').textContent,e.target);

/* 5-6: prévia da mensagem no lugar do WhatsApp (captura o envio antes do código original) */
ckf.addEventListener('submit',e=>{e.stopImmediatePropagation();e.preventDefault();LJ=loja();const w=bloqueio();if(w){upTot();toast(w);return}
  const v=k=>ckf.elements[k].value.trim(),rules=[['nome',2],['end',5],['bai',1]];if(bai.value==='outro')rules.push(['bo',2]);let first=null;
  rules.forEach(([k,min])=>{const bad=v(k).length<min;$('f-'+k).classList.toggle('bad',bad);if(bad&&!first)first=ckf.elements[k]});
  if(first){first.focus();return}
  const pg=ckf.elements.pg.value,d={pg};F.forEach(k=>d[k]=v(k));try{localStorage.setItem(KEY,JSON.stringify(d))}catch(_){}
  const T=totais(),it=all.filter(o=>q[o.id]);
  const msg=[LJ.on?'*PEDIDO PARA ENTREGA*':`*PEDIDO AGENDADO para ${LJ.dia} às 18h*`,'',...it.map(o=>`${q[o.id]}x ${o.n}${o.mb?` (${o.d})`:''} — ${R(q[o.id]*o.p)}`),'',
    `Subtotal: ${R(T.s)}`,`Entrega (${bairroNome()}): ${R(T.f)}`,...(T.d?[`Cupom ${cupom}: − ${R(T.d)}`]:[]),`*Total: ${R(T.t)}*`,'',
    `*Nome:* ${d.nome}`,`*Endereço:* ${d.end}`,`*Bairro:* ${bairroNome()}`,...(d.cpl?[`*Complemento:* ${d.cpl}`]:[]),
    `*Pagamento:* ${pg}${pg==='Dinheiro'&&d.tr?` (troco para ${d.tr})`:''}`,...(d.obs?[`*Obs.:* ${d.obs}`]:[])].join('\n');
  CK.close();$('pvt').textContent=msg;$('pvw').hidden=!WA_NUMERO;$('pv').showModal()},true);
$('pvc').onclick=e=>copia($('pvt').textContent,e.target);
$('pvw').onclick=()=>window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent($('pvt').textContent)}`,'_blank');

/* 12: Monte seu burger: limites, modelos e camadas */
const md0=mbDraw;mbDraw=()=>{md0();$('mbcn').textContent=`${mbStack().length} de 12 camadas`};
$('mbo').addEventListener('click',e=>{const b=e.target.closest('[data-mb]');if(!b||b.disabled||+b.dataset.v<0)return;const k=b.dataset.mb;
  if((k==='pa'||k==='vg')&&mb.pa+mb.vg>=3){e.stopImmediatePropagation();toast('Máximo de 3 carnes por burger.');return}
  if(mbStack().length>=12){e.stopImmediatePropagation();toast('Limite de 12 camadas atingido.')}},true);
const r0=$('mbr').onclick;$('mbr').onclick=()=>{r0();while(mb.pa+mb.vg>3)mb.vg?mb.vg--:mb.pa--;for(let g=0;mbStack().length>12&&g<30;g++){const k=['ba','ch','ce','ov','pi'].find(x=>mb[x]>0);if(!k)break;mb[k]--}mbDraw()};
const PR={'Clássico':{pa:1,vg:0,ch:1,ba:0,ov:0,ce:0,pi:0,to:1,le:1},'Bacon':{pa:1,vg:0,ch:1,ba:2,ov:0,ce:0,pi:0,to:1,le:1},'Veggie':{pa:0,vg:1,ch:1,ba:0,ov:0,ce:0,pi:1,to:1,le:1}};
$('mbo').insertAdjacentHTML('beforebegin',`<div class="pr3"><span>Comece por um modelo</span>${Object.keys(PR).map(n=>`<button type="button" data-pr="${n}">${n}</button>`).join('')}</div>`);
document.querySelectorAll('[data-pr]').forEach(b=>b.onclick=()=>{Object.assign(mb,PR[b.dataset.pr]);mbDraw()});

/* 14-16: menu de categorias, 2 colunas em porções/bebidas, etiqueta vegetariano */
const cats=[...document.querySelectorAll('h2.cat')];cats.forEach(h=>h.id='c-'+h.textContent.trim().toLowerCase().replace(/\W+/g,''));
document.querySelector('.cb').id='c-combo';
$('menu').insertAdjacentHTML('beforebegin',`<nav class="cn" aria-label="Categorias">${[['c-combo','Combo do Dia'],...cats.map(h=>[h.id,h.textContent])].map(([i,t])=>`<a href="#${i}">${t}</a>`).join('')}</nav>`);
if(cats[1]&&cats[2]){const wrap=document.createElement('div');wrap.className='duo';cats[1].before(wrap);[cats[1],cats[2]].forEach(h=>{const s=document.createElement('section');s.append(h,h.nextElementSibling);wrap.append(s)})}
document.querySelector('[data-testid="menu-item-vg"] h3').insertAdjacentHTML('afterend','<span class="tg">Vegetariano</span>');
document.querySelectorAll('.pl img').forEach(i=>{i.width=i.height=600});

/* 17: rodapé completo, interruptor e botão flutuante */
document.querySelector('.ft').insertAdjacentHTML('beforeend',`<div class="ftx">
<div><h4>Onde estamos</h4><p>Rua das Brasas, 123 — Centro<br>Salvador · BA <small>(endereço fictício)</small></p><iframe title="Mapa" loading="lazy" width="100%" height="180" src="https://www.openstreetmap.org/export/embed.html?bbox=-38.52%2C-12.99%2C-38.49%2C-12.96&amp;layer=mapnik"></iframe></div>
<div><h4>Horário</h4><p>Terça a domingo, 18h às 23h30<br>Fechado às segundas</p><p>Instagram: @brasaburger.demo <small>(fictício)</small></p>
<label class="sw"><input type="checkbox" id="dmt"><span>Ver como fica quando a loja está fechada</span></label></div>
<p class="cr">Projeto de demonstração criado por <a href="https://instagram.com/j_victor_dev" target="_blank" rel="noopener">@j_victor_dev</a></p></div>`);
$('dmt').onchange=e=>{FECHADO=e.target.checked;upLoja();toast(FECHADO?'Modo loja fechada ligado':'Modo normal: loja aberta')};
$('wpf').onclick=()=>toast('Demonstração: em um site real, este botão abriria o WhatsApp da loja');
new IntersectionObserver(([e])=>$('wpf').classList.toggle('h',e.isIntersecting)).observe($('monte'));

upLoja();mbDraw();
})();
