import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { SoundByteComponent } from './sound-byte/sound-byte.component';
import { ImageByteComponent } from './image-byte/image-byte.component';
import { SelectableTextByteComponent } from './selectable-text-byte/selectable-text-byte.component';

@NgModule({
    imports: [
        CommonModule,
    ],
  declarations: [
      ProgressBarComponent,
      ProgressCircleComponent,
      SoundByteComponent,
      ImageByteComponent,
      SelectableTextByteComponent,
    ],
    exports: [
        ProgressCircleComponent,
        ProgressBarComponent,
        SoundByteComponent,
        ImageByteComponent,
        SelectableTextByteComponent,
    ]
})
export class ComponentsModule {}
