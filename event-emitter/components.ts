/**
 * parent.component.html
 */
<app-eventdialog-component [dialogParams]="dialogParams" [(visibility)]="displayDialog" (calendarChange)="updateCalendar($event)"></app-eventdialog-component>


/**
 * parent.component.ts
 */
@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  public calendar: Calendar;

  public displayDialog: boolean;
  public dialogParams: DialogParams;
  
  updateCalendar($event: Calendar) {
    this.calendar = $event;
    this.calendar.build();
  }
}


/**
 * child.component.ts
 */
@Component({
  selector: 'app-eventdialog-component',
  templateUrl: '<button (click)="buttonClick()">Click me</button>',
  styleUrls: ['./eventdialog.component.css']
})
export class EventDialogComponent implements OnInit {

  @Input() visibility: boolean;
  @Input() dialogParams: DialogParams; // has a property "calendar" with a type "Calendar"
  
  @Output() visibilityChange = new EventEmitter();
  @Output() calendarChange = new EventEmitter();

  ngOnInit(): void {
    if (this.dialogParams) this.dialogParams = new DialogParams();
  }

  constructor() {
  }
  
  buttonClick(): void {
  
    // will emit value false and since the binding is 
    // two way - [(visibility)]="displayDialog" -, no extra method is needed
    // to handle the value change, the displayDialog variable will automatically
    // change to false.    
    // Not 100% sure about the above. Why is it okay to call ([visibility]) and 
    // not [(visibilityChange)]?
    this.visibilityChange.emit(false);
    
    // emit change to parent component
    this.calendarChange.emit(new Calendar(...));
    
  }
}
