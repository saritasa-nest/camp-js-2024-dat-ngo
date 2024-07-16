import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableBasicExample } from './table-component/table-component.component';
const routes: Routes = [
	{
		path: '',
		component: TableBasicExample,
		title: 'Home Page',
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
