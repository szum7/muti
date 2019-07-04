// setFromTimeOptions-nél miért nem az eredeti model jön? Az ngModel string-é alakítja? (params.endTime -> TimeSpan)

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadingScreenService } from '../../services/loading-screen.service';
import { TimeSelectParams } from './models/time-select-params.model';
import { TimeSpan } from '../calendar/models/timespan-model';
import { HTMLOption } from './models/html-option.model';

@Component({
  selector: 'app-timeselect-component',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.css']
})
export class TimeSelectComponent implements OnInit {

  @Input() params: TimeSelectParams;
  //@Output() paramsChange = new EventEmitter();

  public _fromOptions: Array<HTMLOption>;
  get fromOptions(): Array<HTMLOption> {
    if (this._fromOptions == null && this.params) {
      this._fromOptions = this._createOptions(this.params.minTime, this.params.maxTime, this.params.timeStep);
      if (this._fromOptions.length > 0) {
        this._fromOptions[this._fromOptions.length - 1].isDisabled = true;
      }
    }
    return this._fromOptions;
  }

  public _toOptions: Array<HTMLOption>;
  get toOptions(): Array<HTMLOption> {
    if (this._toOptions == null && this.params) {
      this._toOptions = this._createOptions(this.params.minTime, this.params.maxTime, this.params.timeStep);
      if (this._toOptions.length > 0) {
        this._toOptions[0].isDisabled = true;
      }
    }
    return this._toOptions;
  }


  ngOnInit(): void {
    if (!this.params) {
      this.params = new TimeSelectParams(new TimeSpan(0, 30), new TimeSpan(0, 0), new TimeSpan(0, 0));
    }
  }

  constructor() {
  }


  private _createOptions(min: TimeSpan, max: TimeSpan, timeStep: TimeSpan): Array<HTMLOption> {
    if (timeStep.getMilliseconds() == 0)
      return [];

    let ret: Array<HTMLOption> = [];

    let current = min.copyTime();
    while (max.isLaterThan(current)) {
      ret.push(new HTMLOption(current.toString(), current.copyTime()));
      current.addTime(timeStep);
    }
    ret.push(new HTMLOption(max.toString(), max.copyTime()));

    return ret;
  }

  setFromTimeOptions(): void {
    console.log(this.params.endTime);
    let time: TimeSpan = TimeSpan.getOnString(this.params.endTime.toString()); //new TimeSpan(this.params.endTime.hours, this.params.endTime.minutes);
    for (var i = 0; i < this.fromOptions.length; i++) {
      let current: HTMLOption = this.fromOptions[i];
      console.log(time.toString());
      if (time.isLaterThan(current.value)) {
        current.isDisabled = false;
      } else {
        current.isDisabled = true;
      }
    }
  }
}
