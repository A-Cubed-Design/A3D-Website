(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerpolicy&&(c.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?c.credentials="include":s.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();function l(){}function K(t){return t()}function P(){return Object.create(null)}function V(t){t.forEach(K)}function R(t){return typeof t=="function"}function x(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function W(t){return Object.keys(t).length===0}function L(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function J(t){return document.createTextNode(t)}function A(){return J(" ")}function _(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Q(t){return Array.from(t.childNodes)}let I;function E(t){I=t}const M=[],G=[],D=[],q=[],X=Promise.resolve();let B=!1;function Z(){B||(B=!0,X.then(Y))}function S(t){D.push(t)}const N=new Set;let z=0;function Y(){const t=I;do{for(;z<M.length;){const e=M[z];z++,E(e),ee(e.$$)}for(E(null),M.length=0,z=0;G.length;)G.pop()();for(let e=0;e<D.length;e+=1){const n=D[e];N.has(n)||(N.add(n),n())}D.length=0}while(M.length);for(;q.length;)q.pop()();B=!1,N.clear(),E(t)}function ee(t){if(t.fragment!==null){t.update(),V(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const O=new Set;let te;function y(t,e){t&&t.i&&(O.delete(t),t.i(e))}function k(t,e,n,r){if(t&&t.o){if(O.has(t))return;O.add(t),te.c.push(()=>{O.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function C(t){t&&t.c()}function $(t,e,n,r){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),r||S(()=>{const o=t.$$.on_mount.map(K).filter(R);t.$$.on_destroy?t.$$.on_destroy.push(...o):V(o),t.$$.on_mount=[]}),c.forEach(S)}function b(t,e){const n=t.$$;n.fragment!==null&&(V(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ne(t,e){t.$$.dirty[0]===-1&&(M.push(t),Z(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function w(t,e,n,r,s,c,o,T=[-1]){const d=I;E(t);const a=t.$$={fragment:null,ctx:[],props:c,update:l,not_equal:s,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:P(),dirty:T,skip_bound:!1,root:e.target||d.$$.root};o&&o(a.root);let h=!1;if(a.ctx=n?n(t,e.props||{},(u,p,...H)=>{const g=H.length?H[0]:p;return a.ctx&&s(a.ctx[u],a.ctx[u]=g)&&(!a.skip_bound&&a.bound[u]&&a.bound[u](g),h&&ne(t,u)),p}):[],a.update(),h=!0,V(a.before_update),a.fragment=r?r(a.ctx):!1,e.target){if(e.hydrate){const u=Q(e.target);a.fragment&&a.fragment.l(u),u.forEach(f)}else a.fragment&&a.fragment.c();e.intro&&y(t.$$.fragment),$(t,e.target,e.anchor,e.customElement),Y()}E(d)}class F{$destroy(){b(this,1),this.$destroy=l}$on(e,n){if(!R(n))return l;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function se(t){let e;return{c(){e=m("header"),e.innerHTML=`<img src="./assets/ACubedLogo.png" alt="A Cubed Design Logo" class="svelte-eepi8x"/> 
  <h1>ACD</h1> 
  <div class="links svelte-eepi8x"><a href="#about" class="svelte-eepi8x">About</a> 
    <a href="#team" class="svelte-eepi8x">Team</a> 
    <a href="#contact" class="svelte-eepi8x">Contact</a></div> 
  <div class="accent-block svelte-eepi8x" aria-hidden="true"></div> 
  <div class="accent-block-2 svelte-eepi8x" aria-hidden="true"></div>`,_(e,"class","svelte-eepi8x")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class re extends F{constructor(e){super(),w(this,e,null,se,x,{})}}function le(t){let e;return{c(){e=m("footer"),e.innerHTML=`<img src="./assets/ACubedLogo.png" alt="A Cubed Design Logo" class="svelte-jtt61e"/> 
  <p class="dark-text svelte-jtt61e">Copyright 2022 Accessible Affordable Accelerated Design LLC</p> 
  
  <a href="https://www.facebook.com/A-Cubed-Design-104416965644412" target="_blank" class="svelte-jtt61e"><svg class="svg-content fb svelte-jtt61e" viewBox="0 0 112 112" x="0" y="0" id="svg-7e29"><circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M73.5,31.6h-9.1c-1.4,0-3.6,0.8-3.6,3.9v8.5h12.6L72,58.3H60.8v40.8H43.9V58.3h-8V43.9h8v-9.2
      c0-6.7,3.1-17,17-17h12.5v13.9H73.5z"></path></svg></a> 
  <a href="https://www.instagram.com/acubeddesign/" target="_blank" class="svelte-jtt61e"><svg class="svg-content ig svelte-jtt61e" viewBox="0 0 112 112" x="0" y="0" id="svg-67f0"><circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M55.9,38.2c-9.9,0-17.9,8-17.9,17.9C38,66,46,74,55.9,74c9.9,0,17.9-8,17.9-17.9C73.8,46.2,65.8,38.2,55.9,38.2
      z M55.9,66.4c-5.7,0-10.3-4.6-10.3-10.3c-0.1-5.7,4.6-10.3,10.3-10.3c5.7,0,10.3,4.6,10.3,10.3C66.2,61.8,61.6,66.4,55.9,66.4z"></path><path fill="#FFFFFF" d="M74.3,33.5c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S76.6,33.5,74.3,33.5z"></path><path fill="#FFFFFF" d="M73.1,21.3H38.6c-9.7,0-17.5,7.9-17.5,17.5v34.5c0,9.7,7.9,17.6,17.5,17.6h34.5c9.7,0,17.5-7.9,17.5-17.5V38.8
      C90.6,29.1,82.7,21.3,73.1,21.3z M83,73.3c0,5.5-4.5,9.9-9.9,9.9H38.6c-5.5,0-9.9-4.5-9.9-9.9V38.8c0-5.5,4.5-9.9,9.9-9.9h34.5
      c5.5,0,9.9,4.5,9.9,9.9V73.3z"></path></svg></a> 
  <a href="https://www.linkedin.com/company/84838459/" target="_blank" class="svelte-jtt61e"><svg class="svg-content linkedin svelte-jtt61e" viewBox="0 0 112 112" x="0" y="0" id="svg-17ee"><circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M41.3,83.7H27.9V43.4h13.4V83.7z M34.6,37.9L34.6,37.9c-4.6,0-7.5-3.1-7.5-7c0-4,3-7,7.6-7s7.4,3,7.5,7
      C42.2,34.8,39.2,37.9,34.6,37.9z M89.6,83.7H76.2V62.2c0-5.4-1.9-9.1-6.8-9.1c-3.7,0-5.9,2.5-6.9,4.9c-0.4,0.9-0.4,2.1-0.4,3.3v22.5
      H48.7c0,0,0.2-36.5,0-40.3h13.4v5.7c1.8-2.7,5-6.7,12.1-6.7c8.8,0,15.4,5.8,15.4,18.1V83.7z"></path></svg></a>`,_(e,"class","svelte-jtt61e")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class ce extends F{constructor(e){super(),w(this,e,null,le,x,{})}}function ae(t){let e,n,r;return{c(){e=m("div"),n=A(),r=m("div"),r.innerHTML=`<div class="content svelte-1y1b9bk"><div class="hero-left svelte-1y1b9bk"><h1 class="svelte-1y1b9bk"><span class="svelte-1y1b9bk">A</span>  <span class="svelte-1y1b9bk">C</span>UBED <span class="svelte-1y1b9bk">D</span>ESIGN</h1> 
      <p class="svelte-1y1b9bk">We&#39;re aiming to tackle the braille literacy crisis by making it easier for blind individuals to acquire screen readers.</p></div> 
    <div class="hero-right"><iframe src="https://www.youtube.com/embed/1rPE22she0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="svelte-1y1b9bk"></iframe></div></div>`,_(e,"class","background svelte-1y1b9bk"),_(r,"class","hero-container svelte-1y1b9bk")},m(s,c){v(s,e,c),v(s,n,c),v(s,r,c)},p:l,i:l,o:l,d(s){s&&f(e),s&&f(n),s&&f(r)}}}class ie extends F{constructor(e){super(),w(this,e,null,ae,x,{})}}function oe(t){let e;return{c(){e=m("div"),e.innerHTML=`<h1>Three As of A Cubed (placeholder)</h1> 
  <div class="cards svelte-5uh1at"><div class="card svelte-5uh1at">Accessible</div> 
    <div class="card svelte-5uh1at">Affordable</div> 
    <div class="card svelte-5uh1at">Accelerated</div></div>`,_(e,"class","a-container svelte-5uh1at")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class de extends F{constructor(e){super(),w(this,e,null,oe,x,{})}}function ue(t){let e;return{c(){e=m("div"),e.innerHTML=`<img src="./assets/enigma.png" alt="" class="svelte-vf64al"/> 
  <div class="enigma-text svelte-vf64al"><p class="title svelte-vf64al">Enigma Reader</p> 
    <div class="sub-text svelte-vf64al">The enigma reader is a super cool device that is going to cHaNgE the way BlinD peOpLe rEaD bRaiLle</div></div>`,_(e,"class","enigma svelte-vf64al")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class fe extends F{constructor(e){super(),w(this,e,null,ue,x,{})}}function ve(t){let e;return{c(){e=m("div"),e.innerHTML=`<h1>Meet Our Executive Team (placeholder)</h1> 
  <div class="cards svelte-edykst"><div class="card svelte-edykst">Garrett Carder</div> 
    <div class="card svelte-edykst">Caroline Karbowski</div> 
    <div class="card svelte-edykst">Enan Srivastava</div></div>`,_(e,"class","a-container svelte-edykst")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class he extends F{constructor(e){super(),w(this,e,null,ve,x,{})}}function pe(t){let e;return{c(){e=m("div"),e.innerHTML=`<h2>Get Involved (placeholder)</h2>
  link to new tab or modal or something??`,_(e,"class","contact svelte-1cz3my3")},m(n,r){v(n,e,r)},p:l,i:l,o:l,d(n){n&&f(e)}}}class ge extends F{constructor(e){super(),w(this,e,null,pe,x,{})}}function me(t){let e,n,r,s,c,o,T,d,a,h,u,p,H,g,j;return n=new re({}),s=new ie({}),o=new de({}),d=new fe({}),h=new he({}),p=new ge({}),g=new ce({}),{c(){e=m("main"),C(n.$$.fragment),r=A(),C(s.$$.fragment),c=A(),C(o.$$.fragment),T=A(),C(d.$$.fragment),a=A(),C(h.$$.fragment),u=A(),C(p.$$.fragment),H=A(),C(g.$$.fragment),_(e,"class","svelte-1l9o9do")},m(i,U){v(i,e,U),$(n,e,null),L(e,r),$(s,e,null),L(e,c),$(o,e,null),L(e,T),$(d,e,null),L(e,a),$(h,e,null),L(e,u),$(p,e,null),L(e,H),$(g,e,null),j=!0},p:l,i(i){j||(y(n.$$.fragment,i),y(s.$$.fragment,i),y(o.$$.fragment,i),y(d.$$.fragment,i),y(h.$$.fragment,i),y(p.$$.fragment,i),y(g.$$.fragment,i),j=!0)},o(i){k(n.$$.fragment,i),k(s.$$.fragment,i),k(o.$$.fragment,i),k(d.$$.fragment,i),k(h.$$.fragment,i),k(p.$$.fragment,i),k(g.$$.fragment,i),j=!1},d(i){i&&f(e),b(n),b(s),b(o),b(d),b(h),b(p),b(g)}}}class _e extends F{constructor(e){super(),w(this,e,null,me,x,{})}}new _e({target:document.getElementById("app")});
