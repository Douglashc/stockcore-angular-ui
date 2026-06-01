import { Component, inject } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'shared-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent {

  public dialogService = inject(DialogService);

  close() {
    this.dialogService.close();
  }

}
