"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[855],{4396:(L,C,a)=>{a.d(C,{H:()=>m});var r=a(7788),f=a(7222),p=a(6610),h=a(5468),M=a(4587),l=a(2267),g=a(6182);function d(I,N){if(1&I&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&I){const _=r.XpG();r.R7$(),r.SpI(" ",_.getErrorMessage()," ")}}let m=(()=>{class I{constructor(){this.label="",this.type="password",this.touched=!1,this.formControl=new f.MJ,this.value="",this.formErrorService=(0,r.WQX)(l._),this.onChange=_=>{},this.onTouched=()=>{},this.hide=(0,r.vPA)(!0)}writeValue(_){this.value=_}registerOnChange(_){this.onChange=_}registerOnTouched(_){this.onTouched=_}onInput(_){const E=_.target;E&&null!==E.value&&(this.value=E.value,this.onChange(this.value),this.onTouched())}shouldShowError(){return this.formErrorService.shouldShowError(this.formControl)}getErrorMessage(){return this.formErrorService.getErrorMessage(this.formControl)}clickEvent(_){this.hide.set(!this.hide()),_.stopPropagation()}static#t=this.\u0275fac=function(E){return new(E||I)};static#e=this.\u0275cmp=r.VBU({type:I,selectors:[["camp-password-input"]],inputs:{label:"label",type:"type",touched:"touched",formControl:"formControl"},standalone:!0,features:[r.Jv_([{provide:f.kq,useExisting:(0,r.Rfq)(()=>I),multi:!0}]),r.aNF],decls:8,vars:9,consts:[["appearance","outline",1,"password-field"],[1,"password-field__label",3,"for"],["matInput","",3,"input","type","value","formControl"],["mat-icon-button","","matSuffix","","type","button",1,"password-field__icon-hide",3,"click"],[4,"ngIf"]],template:function(E,u){1&E&&(r.j41(0,"mat-form-field",0)(1,"mat-label",1),r.bIt("for",function(){return u.label}),r.EFF(2),r.k0s(),r.j41(3,"input",2),r.bIt("input",function(O){return u.onInput(O)}),r.k0s(),r.j41(4,"button",3),r.bIt("click",function(O){return u.clickEvent(O)}),r.j41(5,"mat-icon"),r.EFF(6),r.k0s()(),r.DNE(7,d,2,1,"mat-error",4),r.k0s()),2&E&&(r.R7$(2),r.JRh(u.label),r.R7$(),r.Y8G("type",u.hide()?"password":"text")("type",u.type)("value",u.value)("formControl",u.formControl),r.R7$(),r.BMQ("aria-label","Hide password")("aria-pressed",u.hide()),r.R7$(2),r.JRh(u.hide()?"visibility_off":"visibility"),r.R7$(),r.Y8G("ngIf",u.shouldShowError()))},dependencies:[p.MD,p.bT,f.X1,f.me,f.BC,f.l_,h.RG,h.rl,h.nJ,h.TL,h.yw,M.fS,M.fg,g.An],styles:[".password-field[_ngcontent-%COMP%]{width:100%}.password-field__label[_ngcontent-%COMP%]{color:var(--anime-dodger-blue);margin:var(--spacing-sm)}.password-field__icon-hide[_ngcontent-%COMP%]{background-color:var(--surface-color);border:none;border-color:var(--error-color);margin:var(--spacing-sm)}"],changeDetection:0})}return I})()},2267:(L,C,a)=>{a.d(C,{_:()=>p});var r=a(7222),f=a(7788);let p=(()=>{class h{constructor(){this.errorMessages={required:"This field is required",email:"Please enter a valid email address",minlength:l=>`Minimum length is ${l.requiredLength} characters`,maxlength:l=>`Maximum length is ${l.requiredLength} characters`,mismatchField:"The fields do not match. Ensure both entries are the same.",pattern:"Invalid format"}}getErrorMessage(l){if(!l?.errors)return null;for(const g of Object.keys(l.errors)){const d=this.errorMessages[g];if(d)return"function"==typeof d?d(l.errors[g]):d}return null}getFormErrors(l){const g={};return Object.keys(l.controls).forEach(d=>{const m=l.get(d);m instanceof r.gE?Object.assign(g,this.getFormErrors(m)):m&&(g[d]=this.getErrorMessage(m))}),g}shouldShowError(l){return!!l&&l.invalid&&(l.touched||l.dirty)}static#t=this.\u0275fac=function(g){return new(g||h)};static#e=this.\u0275prov=f.jDH({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()},3214:(L,C,a)=>{a.d(C,{Fc:()=>p,K9:()=>f,PO:()=>h,aC:()=>M,wz:()=>r});const r=8,f=30,p=10,h=30,M=30},6182:(L,C,a)=>{a.d(C,{An:()=>Q,m_:()=>Y});var r=a(7788),f=a(8278),p=a(6610),h=a(756),M=a(8823),l=a(8361),g=a(2029),d=a(7236),m=a(3527),I=a(4526),N=a(6347),_=a(7782),E=a(8486),u=a(6409),P=a(6098);const O=["*"];let A;function R(i){return function K(){if(void 0===A&&(A=null,typeof window<"u")){const i=window;void 0!==i.trustedTypes&&(A=i.trustedTypes.createPolicy("angular#components",{createHTML:v=>v}))}return A}()?.createHTML(i)||i}function U(i){return Error(`Unable to find icon with the name "${i}"`)}function b(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function W(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}class S{constructor(v,t,e){this.url=v,this.svgText=t,this.options=e}}let y=(()=>{class i{constructor(t,e,n,o){this._httpClient=t,this._sanitizer=e,this._errorHandler=o,this._svgIconConfigs=new Map,this._iconSetConfigs=new Map,this._cachedIconsByUrl=new Map,this._inProgressUrlFetches=new Map,this._fontCssClassesByAlias=new Map,this._resolvers=[],this._defaultFontSetClass=["material-icons","mat-ligature-font"],this._document=n}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,o){return this._addSvgIconConfig(t,e,new S(n,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,o){const s=this._sanitizer.sanitize(r.WPN.HTML,n);if(!s)throw W(n);const c=R(s);return this._addSvgIconConfig(t,e,new S("",c,o))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new S(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){const o=this._sanitizer.sanitize(r.WPN.HTML,e);if(!o)throw W(e);const s=R(o);return this._addSvgIconSetConfig(t,new S("",s,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){const e=this._sanitizer.sanitize(r.WPN.RESOURCE_URL,t);if(!e)throw b(t);const n=this._cachedIconsByUrl.get(e);return n?(0,h.of)(w(n)):this._loadSvgIconFromConfig(new S(t,null)).pipe((0,d.M)(o=>this._cachedIconsByUrl.set(e,o)),(0,m.T)(o=>w(o)))}getNamedSvgIcon(t,e=""){const n=B(e,t);let o=this._svgIconConfigs.get(n);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(e,t),o)return this._svgIconConfigs.set(n,o),this._getSvgFromConfig(o);const s=this._iconSetConfigs.get(e);return s?this._getSvgFromIconSetConfigs(t,s):(0,M.$)(U(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?(0,h.of)(w(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe((0,m.T)(e=>w(e)))}_getSvgFromIconSetConfigs(t,e){const n=this._extractIconWithNameFromAnySet(t,e);if(n)return(0,h.of)(n);const o=e.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe((0,I.W)(c=>{const T=`Loading icon set URL: ${this._sanitizer.sanitize(r.WPN.RESOURCE_URL,s.url)} failed: ${c.message}`;return this._errorHandler.handleError(new Error(T)),(0,h.of)(null)})));return(0,l.p)(o).pipe((0,m.T)(()=>{const s=this._extractIconWithNameFromAnySet(t,e);if(!s)throw U(t);return s}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){const o=e[n];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){const s=this._svgElementFromConfig(o),c=this._extractSvgIconFromSet(s,t,o.options);if(c)return c}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe((0,d.M)(e=>t.svgText=e),(0,m.T)(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?(0,h.of)(null):this._fetchIcon(t).pipe((0,d.M)(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){const o=t.querySelector(`[id="${e}"]`);if(!o)return null;const s=o.cloneNode(!0);if(s.removeAttribute("id"),"svg"===s.nodeName.toLowerCase())return this._setSvgAttributes(s,n);if("symbol"===s.nodeName.toLowerCase())return this._setSvgAttributes(this._toSvgElement(s),n);const c=this._svgElementFromString(R("<svg></svg>"));return c.appendChild(s),this._setSvgAttributes(c,n)}_svgElementFromString(t){const e=this._document.createElement("DIV");e.innerHTML=t;const n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){const e=this._svgElementFromString(R("<svg></svg>")),n=t.attributes;for(let o=0;o<n.length;o++){const{name:s,value:c}=n[o];"id"!==s&&e.setAttribute(s,c)}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[o].cloneNode(!0));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){const{url:e,options:n}=t,o=n?.withCredentials??!1;if(!this._httpClient)throw function H(){return Error("Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.")}();if(null==e)throw Error(`Cannot fetch icon from URL "${e}".`);const s=this._sanitizer.sanitize(r.WPN.RESOURCE_URL,e);if(!s)throw b(e);const c=this._inProgressUrlFetches.get(s);if(c)return c;const F=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe((0,m.T)(T=>R(T)),(0,N.j)(()=>this._inProgressUrlFetches.delete(s)),(0,_.u)());return this._inProgressUrlFetches.set(s,F),F}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(B(t,e),n),this}_addSvgIconSetConfig(t,e){const n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){const e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){const o=this._resolvers[n](e,t);if(o)return j(o)?new S(o.url,null,o.options):new S(o,null)}}static#t=this.\u0275fac=function(e){return new(e||i)(r.KVO(u.Qq,8),r.KVO(P.up),r.KVO(p.qQ,8),r.KVO(r.zcH))};static#e=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function w(i){return i.cloneNode(!0)}function B(i,v){return i+":"+v}function j(i){return!(!i.url||!i.options)}const z=new r.nKC("MAT_ICON_DEFAULT_OPTIONS"),V=new r.nKC("mat-icon-location",{providedIn:"root",factory:function X(){const i=(0,r.WQX)(p.qQ),v=i?i.location:null;return{getPathname:()=>v?v.pathname+v.search:""}}}),x=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],k=x.map(i=>`[${i}]`).join(", "),G=/^url\(['"]?#(.*?)['"]?\)$/;let Q=(()=>{class i{get color(){return this._color||this._defaultColor}set color(t){this._color=t}get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}get fontSet(){return this._fontSet}set fontSet(t){const e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses())}get fontIcon(){return this._fontIcon}set fontIcon(t){const e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses())}constructor(t,e,n,o,s,c){this._elementRef=t,this._iconRegistry=e,this._location=o,this._errorHandler=s,this.inline=!1,this._previousFontSetClass=[],this._currentIconFetch=g.yU.EMPTY,c&&(c.color&&(this.color=this._defaultColor=c.color),c.fontSet&&(this.fontSet=c.fontSet)),n||t.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];const e=t.split(":");switch(e.length){case 1:return["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){const t=this._elementsWithExternalReferences;if(t&&t.size){const e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();const e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){const t=this._elementRef.nativeElement;let e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){const n=t.childNodes[e];(1!==n.nodeType||"svg"===n.nodeName.toLowerCase())&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;const t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return"string"==typeof t?t.trim().split(" ")[0]:t}_prependPathToReferences(t){const e=this._elementsWithExternalReferences;e&&e.forEach((n,o)=>{n.forEach(s=>{o.setAttribute(s.name,`url('${t}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(t){const e=t.querySelectorAll(k),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<e.length;o++)x.forEach(s=>{const c=e[o],F=c.getAttribute(s),T=F?F.match(G):null;if(T){let D=n.get(c);D||(D=[],n.set(c,D)),D.push({name:s,value:T[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){const[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe((0,E.s)(1)).subscribe(o=>this._setSvgElement(o),o=>{this._errorHandler.handleError(new Error(`Error retrieving icon ${e}:${n}! ${o.message}`))})}}static#t=this.\u0275fac=function(e){return new(e||i)(r.rXU(r.aKT),r.rXU(y),r.kS0("aria-hidden"),r.rXU(V),r.rXU(r.zcH),r.rXU(z,8))};static#e=this.\u0275cmp=r.VBU({type:i,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){2&e&&(r.BMQ("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),r.HbH(n.color?"mat-"+n.color:""),r.AVh("mat-icon-inline",n.inline)("mat-icon-no-color","primary"!==n.color&&"accent"!==n.color&&"warn"!==n.color))},inputs:{color:"color",inline:[2,"inline","inline",r.L39],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],standalone:!0,features:[r.GFd,r.aNF],ngContentSelectors:O,decls:1,vars:0,template:function(e,n){1&e&&(r.NAR(),r.SdG(0))},styles:["mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"],encapsulation:2,changeDetection:0})}return i})(),Y=(()=>{class i{static#t=this.\u0275fac=function(e){return new(e||i)};static#e=this.\u0275mod=r.$C({type:i});static#n=this.\u0275inj=r.G2t({imports:[f.yE,f.yE]})}return i})()}}]);