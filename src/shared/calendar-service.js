"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var lunar = require("lunar");
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        this.bigMonths = [5, 7, 8, 10, 12];
        this.smallMonths = [2, 4, 6, 9, 11];
        this.ALL_SECONDS_A_DAY = 86400000;
        this.ALL_DAYS_A_YEAR = 365;
    }
    CalendarService.prototype.convertToSolarDateFromString = function (lunarDateString) {
        return this.convertToSolarDateFromDate(new Date(lunarDateString));
    };
    CalendarService.prototype.convertToSolarDateFromDate = function (lunarDate) {
        var lmonth = lunarDate.getMonth();
        var ldate = lunarDate.getDate();
        var date = lunar([new Date().getFullYear(), lmonth, ldate, true]);
        return date.toDate();
    };
    CalendarService.prototype.fromDateStringToShortDateString = function (dateString) {
        return this.fromDateToShortDateString(new Date(dateString));
    };
    // return 'YYYY-MM-DD' format string
    CalendarService.prototype.fromDateToShortDateString = function (d) {
        var month = '' + (d.getMonth() + 1);
        var date = '' + d.getDate();
        var year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (date.length < 2)
            date = '0' + date;
        return [year, month, date].join('-');
    };
    CalendarService.prototype.isDate1EarlierThanDate2 = function (date1, date2) {
        return (date1.getMonth() < date2.getMonth() || date1.getDate() < date2.getDate());
    };
    CalendarService.prototype.getDaysDifference = function (dateStr, calendarType) {
        var today = new Date();
        var reminderDate = calendarType === "l" ? this.convertToSolarDateFromString(dateStr) : new Date(dateStr);
        var tTime = today.getTime();
        var rTime = new Date(today.getFullYear(), reminderDate.getMonth(), reminderDate.getDate()).getTime();
        var timeDiff = Math.abs(rTime - tTime);
        var daysDiff = Math.floor(timeDiff / this.ALL_SECONDS_A_DAY);
        return this.isDate1EarlierThanDate2(reminderDate, today) ? this.ALL_DAYS_A_YEAR - daysDiff : daysDiff;
    };
    CalendarService.prototype.ifReachToDay = function (calendarType, dateStr, daysBefore) {
        var daysDiff = this.getDaysDifference(dateStr, calendarType);
        return daysDiff === daysBefore;
    };
    CalendarService = __decorate([
        core_1.Injectable()
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
