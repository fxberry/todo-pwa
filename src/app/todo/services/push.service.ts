import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { TodoItem } from '../../shared';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// {
//   "notification": {
//      "title": "2do PWA",
//      "body": "Something happened, do you like to update?",
//      "icon": "assets/icons/android-chrome-192x192.png",
//      "vibrate": [100, 50, 100],
//      "data": {
//         "id": 1,
//     "checked": true,
//     "lastModified": "2019-05-03T14:25:43.511Z"
//      },
//     "actions": [{
//         "action": "update",
//         "title": "Let's see what happened!"
//    }]
//  }
// }

@Injectable()
export class PushService {
  private lastNotifcation: NotificationOptions;

  constructor(private swPush: SwPush,
              private todoService: TodoService,
              private http: HttpClient) {
    this.subscribeToNotification();
  }

  subscribeToNotification() {
    // Acquire push subscription and afterwards react onto pushes
    this.swPush
    .requestSubscription({ serverPublicKey: 'BL5nC-N8lmUe8dqnYtgqLFJWtNPt28A8Xp4oY3ka82QUY0H4Jx3kD_rRrvfK9QvC2Ig4KZVNI9kPBL3860GKAjg' })
    .then((subscription: PushSubscription) => {
      this.registerOnServer(subscription);
    });
  }

  registerOnServer(sub): any {
    console.log('subscribePush');
    this.http.post('http://localhost:3000/subscribe', sub).pipe(
      tap((res) => {
        console.log(res);
      })
    ).subscribe();

   // this.swPush.notificationClicks.subscribe((clicked) => {
    this.swPush.messages.subscribe((message: any) => {
      const payload: TodoItem = message.notification.data;

      if (payload) {
        const item = this.todoService.todos.find(
          (itemToFilter: TodoItem) =>
            itemToFilter.id === payload.id
        );

        if (item) {
          item.checked = payload.checked;
          item.description = item.description;
          item.lastModified = payload.lastModified;
        }
      }
    });
  }

  notifyMe(idP: number, checked: boolean) {
    console.log('notifyMe');
    this.http.post('http://localhost:3000/notifyme', {id: idP, check: checked}).subscribe();
  }

  unsubscribe() {
    return this.swPush.unsubscribe();
  }
}
