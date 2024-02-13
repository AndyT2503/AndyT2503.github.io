"use strict";(self.webpackChunknew_portfolio=self.webpackChunknew_portfolio||[]).push([[54],{5054:(A,v,o)=>{o.d(v,{Am:()=>g,Do:()=>_,Kl:()=>w,hl:()=>e,v2:()=>y,uR:()=>D});var u=o(1088),a=o(9212),p=o(7398);let g=(()=>{class n{constructor(){this.breakpointObserver=(0,a.f3M)(u.Yg)}get isMobile$(){return this.breakpointObserver.observe(["(max-width: 768px)"]).pipe((0,p.U)(i=>i.matches))}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var E=o(9862),h=o(4332);let w=(()=>{class n{constructor(){this.http=(0,a.f3M)(E.eN),this.appConfig=(0,h.t)()}getRepoInfo(i){return this.http.get(`${this.appConfig.sourceControlApi}${i}`)}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var M=o(5619);let e=(()=>{class n{constructor(){this.currentMenuSelected=new M.X("")}getCurrentMenuSelected(){return this.currentMenuSelected.asObservable()}updateCurrentMenuSelected(i){this.currentMenuSelected.next(i)}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var f=o(6593);let y=(()=>{class n{constructor(){this.metaElements=[],this.meta=(0,a.f3M)(f.h_),this.titleService=(0,a.f3M)(f.Dx)}setTitle(i){this.titleService.setTitle(i)}setMetaTags(i){this.metaElements.forEach(s=>this.meta.removeTagElement(s)),this.metaElements=this.meta.addTags(i,!1)}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();class m{get slug(){return this.title.replaceAll(" ","-").toLowerCase()}constructor(P){this.id=P.id,this.title=P.title,this.type=P.type,this.date=P.date,this.description=P.description}}let _=(()=>{class n{constructor(){this.httpClient=(0,a.f3M)(E.eN)}getWorkExperienceData(){return this.httpClient.get(`assets/data/work-experience.json?t=${(new Date).getTime()}`)}getNormalProjectData(){return this.httpClient.get(`assets/data/normal-project.json?t=${(new Date).getTime()}`)}getFeaturedProjectData(){return this.httpClient.get(`assets/data/featured-project.json?t=${(new Date).getTime()}`)}getBlogData(){return this.httpClient.get(`assets/data/blog.json?t=${(new Date).getTime()}`).pipe((0,p.U)(i=>i.map(s=>new m(s))))}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var l=o(6814);const I=new a.OlP("session storage",{factory:()=>{const n=(0,a.f3M)(l.K0,{optional:!0});return n?.defaultView?n?.defaultView?.sessionStorage:null}});let D=(()=>{class n{constructor(){this.ls=(0,a.f3M)(I)}getItem(i){if(!this.ls)return null;const s=this.ls.getItem(i);if(!s)return null;try{const x=JSON.parse(s);return"object"==typeof x?x:s}catch{return s}}setItem(i,s){this.ls&&this.ls.setItem(i,"object"==typeof s?JSON.stringify(s):s)}removeItem(i){this.ls&&this.ls.removeItem(i)}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()},3620:(A,v,o)=>{o.d(v,{b:()=>g});var u=o(6321),a=o(9360),p=o(8251);function g(E,h=u.z){return(0,a.e)((w,M)=>{let e=null,f=null,y=null;const m=()=>{if(e){e.unsubscribe(),e=null;const l=f;f=null,M.next(l)}};function _(){const l=y+E,I=h.now();if(I<l)return e=this.schedule(void 0,l-I),void M.add(e);m()}w.subscribe((0,p.x)(M,l=>{f=l,y=h.now(),e||(e=h.schedule(_,E),M.add(e))},()=>{m(),M.complete()},void 0,()=>{f=e=null}))})}},836:(A,v,o)=>{o.d(v,{T:()=>a});var u=o(2181);function a(p){return(0,u.h)((g,E)=>p<=E)}},2495:(A,v,o)=>{o.d(v,{Eq:()=>E,HM:()=>h,Ig:()=>a,fI:()=>w,su:()=>p});var u=o(9212);function a(e){return null!=e&&"false"!=`${e}`}function p(e,f=0){return function g(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}(e)?Number(e):f}function E(e){return Array.isArray(e)?e:[e]}function h(e){return null==e?"":"string"==typeof e?e:`${e}px`}function w(e){return e instanceof u.SBq?e.nativeElement:e}},1088:(A,v,o)=>{o.d(v,{Yg:()=>s});var u=o(9212),a=o(2495),p=o(8645),g=o(8965),E=o(5211),h=o(5592),w=o(8180),M=o(836),e=o(3620),f=o(7398),y=o(7921),m=o(9773),_=o(2831);const I=new Set;let D,n=(()=>{class t{constructor(r,d){this._platform=r,this._nonce=d,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):i}matchMedia(r){return(this._platform.WEBKIT||this._platform.BLINK)&&function P(t,c){if(!I.has(t))try{D||(D=document.createElement("style"),c&&(D.nonce=c),D.setAttribute("type","text/css"),document.head.appendChild(D)),D.sheet&&(D.sheet.insertRule(`@media ${t} {body{ }}`,0),I.add(t))}catch(r){console.error(r)}}(r,this._nonce),this._matchMedia(r)}static#t=this.\u0275fac=function(d){return new(d||t)(u.LFG(_.t4),u.LFG(u.Ojb,8))};static#e=this.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function i(t){return{matches:"all"===t||""===t,media:t,addListener:()=>{},removeListener:()=>{}}}let s=(()=>{class t{constructor(r,d){this._mediaMatcher=r,this._zone=d,this._queries=new Map,this._destroySubject=new p.x}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(r){return x((0,a.Eq)(r)).some(S=>this._registerQuery(S).mql.matches)}observe(r){const S=x((0,a.Eq)(r)).map(T=>this._registerQuery(T).observable);let O=(0,g.a)(S);return O=(0,E.z)(O.pipe((0,w.q)(1)),O.pipe((0,M.T)(1),(0,e.b)(0))),O.pipe((0,f.U)(T=>{const L={matches:!1,breakpoints:{}};return T.forEach(({matches:B,query:R})=>{L.matches=L.matches||B,L.breakpoints[R]=B}),L}))}_registerQuery(r){if(this._queries.has(r))return this._queries.get(r);const d=this._mediaMatcher.matchMedia(r),O={observable:new h.y(T=>{const L=B=>this._zone.run(()=>T.next(B));return d.addListener(L),()=>{d.removeListener(L)}}).pipe((0,y.O)(d),(0,f.U)(({matches:T})=>({query:r,matches:T})),(0,m.R)(this._destroySubject)),mql:d};return this._queries.set(r,O),O}static#t=this.\u0275fac=function(d){return new(d||t)(u.LFG(n),u.LFG(u.R0b))};static#e=this.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function x(t){return t.map(c=>c.split(",")).reduce((c,r)=>c.concat(r)).map(c=>c.trim())}},2831:(A,v,o)=>{o.d(v,{Mq:()=>I,Oy:()=>b,i$:()=>y,kV:()=>i,sA:()=>x,t4:()=>g});var u=o(9212),a=o(6814);let p;try{p=typeof Intl<"u"&&Intl.v8BreakIterator}catch{p=!1}let e,l,n,g=(()=>{class t{constructor(r){this._platformId=r,this.isBrowser=this._platformId?(0,a.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!p)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}static#t=this.\u0275fac=function(d){return new(d||t)(u.LFG(u.Lbi))};static#e=this.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function y(t){return function f(){if(null==e&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>e=!0}))}finally{e=e||!1}return e}()?t:!!t.capture}function I(){if(null==l){if("object"!=typeof document||!document||"function"!=typeof Element||!Element)return l=!1,l;if("scrollBehavior"in document.documentElement.style)l=!0;else{const t=Element.prototype.scrollTo;l=!!t&&!/\{\s*\[native code\]\s*\}/.test(t.toString())}}return l}function i(t){if(function P(){if(null==n){const t=typeof document<"u"?document.head:null;n=!(!t||!t.createShadowRoot&&!t.attachShadow)}return n}()){const c=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&c instanceof ShadowRoot)return c}return null}function x(t){return t.composedPath?t.composedPath()[0]:t.target}function b(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}}}]);