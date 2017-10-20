/// <reference path="../../typings/index.d.ts" />
import { CalendarService } from '../../src/shared/shared';

describe('calendar-service', ()=>{
    describe('isDate1EarlierThanDate2', ()=>{
        it('yesterday should be ealier than today', ()=>{
            let s = new CalendarService();
            let date1 = new Date('2017-10-19');
            let date2 = new Date('2017-10-20');
            let f = s.isDate1EarlierThanDate2(date1, date2);
            expect(f).toBeTruthy();
        });
    });
});