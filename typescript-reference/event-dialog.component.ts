export class CalendarModel implements ICalendar {

  public events: Array<Meeting>;

  constructor(events: Array<Meeting>) {
    this.events = events;
  }
}

export class DialogParams {
  public calendar: Calendar;
}

@Component({
  selector: 'app-eventdialog-component',
  templateUrl: './eventdialog.component.html',
  styleUrls: ['./eventdialog.component.css']
})
export class EventDialogComponent implements OnInit {

  // Double binds
  @Input() visibility: boolean;
  @Output() visibilityChange = new EventEmitter();

  // Input binds
  @Input() dialogParams: DialogParams;

  ngOnInit(): void {  
    if (!this.dialogParams) {
      this.dialogParams = new DialogParams();
    }
  }

  constructor() {
    this.dialogParams.calendar.events = [];
    // megváltozik a külső componenten is az events tömb (0 eleme lesz). Miért? Csak egyszeres kötés van!
  }
}
