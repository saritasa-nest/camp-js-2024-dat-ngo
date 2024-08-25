"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[345],{3345:(x,c,o)=>{o.r(c),o.d(c,{SignInComponent:()=>L});var n=o(7788),g=o(6610),r=o(7222),d=o(4587),a=o(5468),u=o(6182),h=o(5860);class p extends h.b{constructor(l){super(),this.email=l.email,this.password=l.password}}var v=o(5981),b=o(7236),F=o(8486),S=o(4526),C=o(8823),M=o(6347),E=o(9840),f=o(8037),I=o(176),P=o(5141),O=o(4396),j=o(2267),m=o(3214);const y=()=>["../","signup"];function k(e,l){if(1&e&&(n.j41(0,"mat-error"),n.EFF(1),n.k0s()),2&e){const i=n.XpG();n.R7$(),n.JRh(i.getErrorMessage("email"))}}let L=(()=>{class e{constructor(){this.userService=(0,n.WQX)(E.D),this.formErrorService=(0,n.WQX)(j._),this.router=(0,n.WQX)(f.Ix),this.notificationService=(0,n.WQX)(P.J),this.formBuilder=(0,n.WQX)(r.Qk),this.isLoading$=new v.t(!1),this.hide=(0,n.vPA)(!0),this.signInForm=this.formBuilder.group({email:["",[r.k0.required,r.k0.email,r.k0.minLength(m.Fc),r.k0.maxLength(m.PO)]],password:["",[r.k0.required,r.k0.minLength(m.wz),r.k0.maxLength(m.K9)]]})}shouldShowError(i){const t=this.signInForm.get(i);return this.formErrorService.shouldShowError(t)}getErrorMessage(i){const t=this.signInForm.get(i);return null==t?null:this.formErrorService.getErrorMessage(t)}onSubmit(){if(this.signInForm.markAllAsTouched(),this.signInForm.invalid)return;const i=new p(this.signInForm.getRawValue());this.userService.login(i).pipe((0,b.M)(()=>this.isLoading$.next(!0)),(0,F.s)(1),(0,S.W)(t=>(0,C.$)(()=>this.notificationService.showMessage(t,"DISMISS"))),(0,M.j)(()=>{this.isLoading$.next(!1)})).subscribe(()=>this.router.navigate([I.R.home]))}static#n=this.\u0275fac=function(t){return new(t||e)};static#o=this.\u0275cmp=n.VBU({type:e,selectors:[["camp-authorization-form"]],standalone:!0,features:[n.aNF],decls:25,vars:9,consts:[[1,"form",3,"ngSubmit","formGroup"],[1,"form__input-group"],["appearance","outline"],["for","email",1,"form__label"],["matInput","","type","email","id","email","name","email","placeholder","Enter email","formControlName","email"],[4,"ngIf"],["label","Password","placeholder","Enter password",3,"formControl","touched"],[1,"form__option"],[1,"form__remember-me"],["type","checkbox","id","rememberMe"],["for","rememberMe"],[1,"form__forgot-password"],["type","submit",1,"form__btn-signin",3,"disabled"],["type","button",1,"form__btn-google"],[1,"form__signup-link"],[3,"routerLink"]],template:function(t,s){1&t&&(n.j41(0,"form",0),n.bIt("ngSubmit",function(){return s.onSubmit()}),n.j41(1,"div",1)(2,"mat-form-field",2)(3,"mat-label",3),n.EFF(4,"Email"),n.k0s(),n.nrm(5,"input",4),n.DNE(6,k,2,1,"mat-error",5),n.k0s(),n.nrm(7,"camp-password-input",6),n.k0s(),n.j41(8,"section",7)(9,"div",8),n.nrm(10,"input",9),n.j41(11,"label",10),n.EFF(12,"Remember me"),n.k0s()(),n.j41(13,"a",11),n.EFF(14,"Forgot password?"),n.k0s()(),n.j41(15,"button",12),n.nI1(16,"async"),n.EFF(17," Sign in "),n.k0s(),n.j41(18,"button",13),n.EFF(19,"Or sign in with Google"),n.k0s(),n.j41(20,"div",14)(21,"span"),n.EFF(22,"Don't have an account?"),n.k0s(),n.j41(23,"a",15),n.EFF(24,"Sign up now"),n.k0s()()()),2&t&&(n.Y8G("formGroup",s.signInForm),n.R7$(6),n.Y8G("ngIf",s.shouldShowError("email")),n.R7$(),n.Y8G("formControl",s.signInForm.controls.password)("touched",s.signInForm.controls.password.touched),n.R7$(8),n.Y8G("disabled",s.signInForm.invalid&&n.bMT(16,6,s.isLoading$)),n.R7$(8),n.Y8G("routerLink",n.lJ4(8,y)))},dependencies:[g.MD,g.bT,g.Jj,r.X1,r.qT,r.me,r.BC,r.cb,r.l_,r.j4,r.JD,d.fS,d.fg,a.rl,a.nJ,a.TL,a.RG,u.m_,O.H,f.Wk],styles:[".form[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:var(--spacing-md)}.form__input-group[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md);display:grid}.form__label[_ngcontent-%COMP%]{color:var(--anime-blue-ribbon);margin:var(--spacing-xs)}.form__option[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.form__forgot-password[_ngcontent-%COMP%]{display:block;text-align:right;margin-bottom:var(--spacing-md);font-size:var(--font-size-md);color:var(--anime-blue-ribbon);text-decoration:none}.form__remember-me[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:var(--spacing-md)}.remember-me[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.form__btn-signin[_ngcontent-%COMP%], .form__btn-google[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-md);border:none;border-radius:var(--border-radius-xs);cursor:pointer;margin-bottom:var(--spacing-md);background-color:var(--anime-blue-ribbon);color:var(--surface-color)}.form__signup-link[_ngcontent-%COMP%]{text-align:center}.form__signup-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.icon-hide[_ngcontent-%COMP%]{padding-right:var(--spacing-md)}"],changeDetection:0})}return e})()}}]);