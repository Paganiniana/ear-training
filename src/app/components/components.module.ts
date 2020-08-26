import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { SoundByteComponent } from './sound-byte/sound-byte.component';
import { ImageByteComponent } from './image-byte/image-byte.component';
import { SelectableTextByteComponent } from './selectable-text-byte/selectable-text-byte.component';
import { ProgressGraphComponent } from './progress-graph/progress-graph.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { ForwardButtonComponent } from './forward-button/forward-button.component';
import { CardComponent } from './card/card.component';
import { TitleComponent } from './title/title.component';

@NgModule({
    imports: [
        CommonModule,
        NgxChartsModule,
    ],
  declarations: [
      ProgressBarComponent,
      ProgressCircleComponent,
      SoundByteComponent,
      ImageByteComponent,
      SelectableTextByteComponent,
      ProgressGraphComponent,
      BackButtonComponent,
      ForwardButtonComponent,
      CardComponent,
      TitleComponent,
    ],
    exports: [
        ProgressCircleComponent,
        ProgressBarComponent,
        SoundByteComponent,
        ImageByteComponent,
        SelectableTextByteComponent,
        ProgressGraphComponent,
        BackButtonComponent,
        ForwardButtonComponent,
        CardComponent,
        TitleComponent,
    ]
})
export class ComponentsModule {}
