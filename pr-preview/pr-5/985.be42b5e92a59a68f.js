"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[985],{3985:(x,g,t)=>{t.r(g),t.d(g,{SignupComponent:()=>P});var r=t(7788),u=t(6610),o=t(7222),d=t(4587),l=t(5468),h=t(2267),f=t(8037),v=t(5860);class E extends v.b{constructor(i){super(),this.email=i.email,this.firstName=i.firstName,this.lastName=i.lastName,this.password=i.password}}var F=t(5981),b=t(8486),N=t(4526),c=t(8823),C=t(6347),w=t(176),S=t(9840),R=t(7212),m=t(3214),k=t(4396);function M(n,i){return s=>{const a=s.get(n),e=s.get(i);return!a||!e||e.errors&&!e.errors.passwordMismatch||e.setErrors(a.value!==e.value?{passwordMismatch:!0}:null),null}}const G=()=>["../","signin"];function y(n,i){if(1&n&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&n){const s=r.XpG();r.R7$(),r.JRh(s.getErrorMessage("email"))}}function j(n,i){if(1&n&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&n){const s=r.XpG();r.R7$(),r.JRh(s.getErrorMessage("firstName"))}}function $(n,i){if(1&n&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&n){const s=r.XpG();r.R7$(),r.JRh(s.getErrorMessage("lastName"))}}let P=(()=>{class n{constructor(){this.formErrorService=(0,r.WQX)(h._),this.authService=(0,r.WQX)(S.D),this.router=(0,r.WQX)(f.Ix),this.formBuilder=(0,r.WQX)(o.Qk),this.destroyRef=(0,r.WQX)(r.abz),this.formErrors={},this.signUpForm=this.formBuilder.group({email:["",[o.k0.required,o.k0.email]],firstName:["",[o.k0.required,o.k0.maxLength(m.aC)]],lastName:["",[o.k0.required,o.k0.maxLength(m.aC)]],passwordGroup:this.formBuilder.group({password:["",[o.k0.required,o.k0.minLength(m.wz),o.k0.maxLength(m.K9)]],reTypePassword:["",[o.k0.required,o.k0.minLength(m.wz),o.k0.maxLength(m.K9)]]},{validators:M("password","reTypePassword")})}),this.isLoading$=new F.t(!1)}shouldShowError(s){const a=this.signUpForm.get(s);return this.formErrorService.shouldShowError(a)}getErrorMessage(s){const a=this.signUpForm.get(s);return null==a?null:this.formErrorService.getErrorMessage(a)}onSubmit(){if(this.signUpForm.markAllAsTouched(),this.signUpForm.valid){const s=this.signUpForm.getRawValue(),a={email:s.email,password:s.passwordGroup.password,firstName:s.firstName,lastName:s.lastName};this.isLoading$.next(!0);const e=new E(a);this.authService.register(e).pipe((0,b.s)(1),(0,N.W)(p=>(this.formErrors=this.formErrorService.getFormErrors(this.signUpForm),(0,c.$)(()=>p))),(0,C.j)(()=>{this.isLoading$.next(!1)}),(0,R.pQ)(this.destroyRef)).subscribe({next:()=>{this.router.navigate([w.R.home])},error:p=>(0,c.$)(()=>p)})}else this.formErrors=this.formErrorService.getFormErrors(this.signUpForm)}static#r=this.\u0275fac=function(a){return new(a||n)};static#o=this.\u0275cmp=r.VBU({type:n,selectors:[["camp-signup"]],standalone:!0,features:[r.aNF],decls:33,vars:13,consts:[[1,"form",3,"ngSubmit","formGroup"],[1,"form__input-group"],["appearance","outline"],["for","email",1,"form__label"],["matInput","","type","text","id","email","name","email","placeholder","Enter email","formControlName","email"],[4,"ngIf"],["for","firstName",1,"form__label"],["matInput","","type","text","id","firstName","name","firstName","placeholder","Enter First Name","formControlName","firstName"],["for","lastName",1,"form__label"],["matInput","","type","text","id","lastName","name","lastName","placeholder","Enter Last Name","formControlName","lastName"],["formGroupName","passwordGroup",1,"password-group"],["label","Password","placeholder","Enter password",3,"formControl","touched"],["label","Retype Password","placeholder","Retype password",3,"formControl","touched"],[1,"form__remember-me"],["type","checkbox","id","rememberMe"],["for","rememberMe"],["type","submit",1,"form__btn-signup",3,"disabled"],[1,"form__signup-link"],[3,"routerLink"]],template:function(a,e){1&a&&(r.j41(0,"form",0),r.bIt("ngSubmit",function(){return e.onSubmit()}),r.j41(1,"div",1)(2,"mat-form-field",2)(3,"mat-label",3),r.EFF(4,"Email"),r.k0s(),r.nrm(5,"input",4),r.DNE(6,y,2,1,"mat-error",5),r.k0s(),r.j41(7,"mat-form-field",2)(8,"mat-label",6),r.EFF(9,"First Name"),r.k0s(),r.nrm(10,"input",7),r.DNE(11,j,2,1,"mat-error",5),r.k0s(),r.j41(12,"mat-form-field",2)(13,"mat-label",8),r.EFF(14,"Last Name"),r.k0s(),r.nrm(15,"input",9),r.DNE(16,$,2,1,"mat-error",5),r.k0s(),r.j41(17,"form",10)(18,"div",1),r.nrm(19,"camp-password-input",11)(20,"camp-password-input",12),r.k0s()()(),r.j41(21,"div",13),r.nrm(22,"input",14),r.j41(23,"label",15),r.EFF(24,"Remember me"),r.k0s()(),r.j41(25,"button",16),r.nI1(26,"async"),r.EFF(27," Sign up "),r.k0s(),r.j41(28,"div",17)(29,"span"),r.EFF(30,"Already have an account?"),r.k0s(),r.j41(31,"a",18),r.EFF(32,"Sign in now"),r.k0s()()()),2&a&&(r.Y8G("formGroup",e.signUpForm),r.R7$(6),r.Y8G("ngIf",e.shouldShowError("email")),r.R7$(5),r.Y8G("ngIf",e.shouldShowError("firstName")),r.R7$(5),r.Y8G("ngIf",e.shouldShowError("lastName")),r.R7$(3),r.Y8G("formControl",e.signUpForm.controls.passwordGroup.controls.password)("touched",e.signUpForm.controls.passwordGroup.controls.password.touched),r.R7$(),r.Y8G("formControl",e.signUpForm.controls.passwordGroup.controls.reTypePassword)("touched",e.signUpForm.controls.passwordGroup.controls.reTypePassword.touched),r.R7$(5),r.Y8G("disabled",e.signUpForm.invalid&&r.bMT(26,10,e.isLoading$)),r.R7$(6),r.Y8G("routerLink",r.lJ4(12,G)))},dependencies:[u.MD,u.bT,u.Jj,o.X1,o.qT,o.me,o.BC,o.cb,o.l_,o.j4,o.JD,o.$R,d.fS,d.fg,l.rl,l.nJ,l.TL,l.RG,k.H,f.Wk],styles:[".form[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:var(--spacing-md)}.form__input-group[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md);display:grid}.form__label[_ngcontent-%COMP%]{color:var(--anime-blue-ribbon);margin:var(--spacing-xs)}.form__remember-me[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:var(--spacing-md)}.form__remember-me[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.form__btn-signup[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-md);border:none;border-radius:var(--border-radius-xs);cursor:pointer;margin-bottom:var(--spacing-md);background-color:var(--anime-blue-ribbon);color:var(--surface-color)}.form__signup-link[_ngcontent-%COMP%]{text-align:center}.form__signup-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}"],changeDetection:0})}return n})()}}]);