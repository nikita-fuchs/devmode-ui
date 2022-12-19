Icons:

Either eva icons or ng-icons with respective library. Example:

```
#module

import { NbIconModule, NbPopoverModule } from '@nebular/theme';
import { NgIconsModule } from '@ng-icons/core';
import { jamKey } from '@ng-icons/jam-icons';

@NgModule({
  imports: [CommonModule,   
    NbIconModule,
    NgIconsModule.withIcons({ jamKey })
  ],
```

in component:

```
<nb-icon class="centerIcon" [icon]="'question-mark-circle-outline'" pack="eva" nbPopover="Enter a Name for your NFT. E.g. 'TurboApe' " nbPopoverTrigger="hover" nbPopoverPlacement="right"></nb-icon>

<button nbButton status="danger" style="padding: 1.6875rem 1.125rem !important"><ng-icon size="30" strokeWidth="3" name="jamKey"></ng-icon></button>
```