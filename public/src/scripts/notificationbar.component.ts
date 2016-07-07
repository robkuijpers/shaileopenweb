import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-notificationbar',
    templateUrl: 'notificationbar.component.html',
    styleUrls:  ['notificationbar.component.css']
})


export class NotificationBarComponent {

    notification = 'Hello';

    constructor() {
        //
    }

    // Clearing the notification will remove the 
    // class 'open' from the notificationbar.
    close(evt) {
        this.notification = null;
        // If we make a link return false to not follow the link.
        // return false; 
    }
}
