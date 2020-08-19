import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillListPageRoutingModule } from './skill-list-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { SkillListPage } from './skill-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillListPageRoutingModule,
    ComponentsModule,

  ],
  declarations: [SkillListPage]
})
export class SkillListPageModule {}
