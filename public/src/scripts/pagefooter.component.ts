import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
    moduleId: module.id,
    selector: 'my-pagefooter',
    templateUrl: 'pagefooter.component.html',
    styleUrls:  ['pagefooter.component.css'],
    directives: [MdToolbar]
})


export class PageFooter {

    constructor() {
        //
    }

}
