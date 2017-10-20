"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ReminderStorage = /** @class */ (function () {
    function ReminderStorage(storage) {
        this.storage = storage;
    }
    ReminderStorage.prototype.getAllReminders = function (handler) {
        return this.storage.forEach(function (v, k, i) {
            handler(v);
        });
    };
    ReminderStorage.prototype.insertReminder = function (reminder) {
        var key = this.getNewId();
        reminder.id = key;
        this.storage.set(key.toString(), reminder);
    };
    ReminderStorage.prototype.updateReminder = function (reminder) {
        this.storage.set(reminder.id, reminder);
    };
    ReminderStorage.prototype.deleteReminder = function (reminder) {
        this.storage.remove(reminder.id.toString());
    };
    ReminderStorage.prototype.getNewId = function () {
        return new Date().getUTCMilliseconds();
    };
    ReminderStorage = __decorate([
        core_1.Injectable()
    ], ReminderStorage);
    return ReminderStorage;
}());
exports.ReminderStorage = ReminderStorage;
