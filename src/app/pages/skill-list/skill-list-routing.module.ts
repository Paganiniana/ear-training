import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillListPage } from './skill-list.page';

const routes: Routes = [
  {
    path: '',
    component: SkillListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillListPageRoutingModule {}
