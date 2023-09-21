import { NgModule } from '@angular/core';

// Directives
import { PbFlexGapDirective } from './pb-flex-gap/pb-flex-gap.directive';
import { PbFlexLayoutDirective } from './pb-flex-layout/pb-flex-layout.directive';
import { PbFlexOffsetDirective } from './pb-flex-offset/pb-flex-offset.directive';
import { PbFlexOrderDirective } from './pb-flex-order/pb-flex-order.directive';
import { PbFlexSizeDirective } from './pb-flex-size/pb-flex-size.directive';

@NgModule({
  declarations: [
    PbFlexGapDirective,
    PbFlexLayoutDirective,
    PbFlexOffsetDirective,
    PbFlexOrderDirective,
    PbFlexSizeDirective,
  ],
  imports: [],
  exports: [
    PbFlexGapDirective,
    PbFlexLayoutDirective,
    PbFlexOffsetDirective,
    PbFlexOrderDirective,
    PbFlexSizeDirective,
  ],
})
export class NgxFlexboxModule {}
