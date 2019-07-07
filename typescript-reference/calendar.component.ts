@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  public calendar: Calendar;
  public displayDialog: boolean;
  public dialogParams: DialogParams;

  constructor() {
  }
  
}
