import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushService } from './push.service';

@Injectable()
export class UpdateService {
  constructor(updates: SwUpdate, snackbar: MatSnackBar, private pushService: PushService) {
    updates.available.subscribe(event => {
      if (event.available) {
        const ref = snackbar.open('new version available', 'reload');
        ref.onAction().subscribe(() => {
          this.pushService.unsubscribe().then(() => document.location.reload());
          // document.location.reload(); // trigger the refresh
        });
      }
    });
  }
}
