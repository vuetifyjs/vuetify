export var PARSE_REGEX = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/;
export var PARSE_TIME = /(\d\d?)(:(\d\d?)|)(:(\d\d?)|)/;
export var DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export var DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export var DAYS_IN_MONTH_MIN = 28;
export var DAYS_IN_MONTH_MAX = 31;
export var MONTH_MAX = 12;
export var MONTH_MIN = 1;
export var DAY_MIN = 1;
export var DAYS_IN_WEEK = 7;
export var MINUTES_IN_HOUR = 60;
export var HOURS_IN_DAY = 24;
export var FIRST_HOUR = 0;
export function getStartOfWeek(timestamp, weekdays, today) {
    var start = copyTimestamp(timestamp);
    findWeekday(start, weekdays[0], prevDay);
    updateFormatted(start);
    if (today) {
        updateRelative(start, today, start.hasTime);
    }
    return start;
}
export function getEndOfWeek(timestamp, weekdays, today) {
    var end = copyTimestamp(timestamp);
    findWeekday(end, weekdays[weekdays.length - 1]);
    updateFormatted(end);
    if (today) {
        updateRelative(end, today, end.hasTime);
    }
    return end;
}
export function getStartOfMonth(timestamp) {
    var start = copyTimestamp(timestamp);
    start.day = DAY_MIN;
    updateWeekday(start);
    updateFormatted(start);
    return start;
}
export function getEndOfMonth(timestamp) {
    var end = copyTimestamp(timestamp);
    end.day = daysInMonth(end.year, end.month);
    updateWeekday(end);
    updateFormatted(end);
    return end;
}
export function parseTime(input) {
    if (typeof input === 'number') {
        // when a number is given, it's minutes since 12:00am
        return input;
    }
    else if (typeof input === 'string') {
        // when a string is given, it's a hh:mm:ss format where seconds are optional
        var parts = PARSE_TIME.exec(input);
        if (!parts) {
            return false;
        }
        return parseInt(parts[1]) * 60 + parseInt(parts[3] || 0);
    }
    else if (typeof input === 'object') {
        // when an object is given, it must have hour and minute
        if (typeof input.hour !== 'number' || typeof input.minute !== 'number') {
            return false;
        }
        return input.hour * 60 + input.minute;
    }
    else {
        // unsupported type
        return false;
    }
}
export function validateTimestamp(input) {
    return !!PARSE_REGEX.exec(input);
}
export function parseTimestamp(input, now) {
    // YYYY-MM-DD hh:mm:ss
    var parts = PARSE_REGEX.exec(input);
    if (!parts)
        return null;
    var timestamp = {
        date: input,
        time: '',
        year: parseInt(parts[1]),
        month: parseInt(parts[2]),
        day: parseInt(parts[4]) || 1,
        hour: parseInt(parts[6]) || 0,
        minute: parseInt(parts[8]) || 0,
        weekday: 0,
        hasDay: !!parts[4],
        hasTime: !!(parts[6] && parts[8]),
        past: false,
        present: false,
        future: false
    };
    updateWeekday(timestamp);
    updateFormatted(timestamp);
    if (now) {
        updateRelative(timestamp, now, timestamp.hasTime);
    }
    return timestamp;
}
export function parseDate(date) {
    return updateFormatted({
        date: '',
        time: '',
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        hasDay: true,
        hasTime: true,
        past: false,
        present: true,
        future: false
    });
}
export function getDayIdentifier(timestamp) {
    return timestamp.year * 10000 + timestamp.month * 100 + timestamp.day;
}
export function getTimeIdentifier(timestamp) {
    return timestamp.hour * 100 + timestamp.minute;
}
export function updateRelative(timestamp, now, time) {
    if (time === void 0) {
        time = false;
    }
    var a = getDayIdentifier(now);
    var b = getDayIdentifier(timestamp);
    var present = a === b;
    if (timestamp.hasTime && time && present) {
        a = getTimeIdentifier(now);
        b = getTimeIdentifier(timestamp);
        present = a === b;
    }
    timestamp.past = b < a;
    timestamp.present = present;
    timestamp.future = b > a;
    return timestamp;
}
export function updateMinutes(timestamp, minutes, now) {
    timestamp.hasTime = true;
    timestamp.hour = Math.floor(minutes / MINUTES_IN_HOUR);
    timestamp.minute = minutes % MINUTES_IN_HOUR;
    timestamp.time = getTime(timestamp);
    if (now) {
        updateRelative(timestamp, now, true);
    }
    return timestamp;
}
export function updateWeekday(timestamp) {
    timestamp.weekday = getWeekday(timestamp);
    return timestamp;
}
export function updateFormatted(timestamp) {
    timestamp.time = getTime(timestamp);
    timestamp.date = getDate(timestamp);
    return timestamp;
}
export function getWeekday(timestamp) {
    if (timestamp.hasDay) {
        var _ = Math.floor;
        var k = timestamp.day;
        var m = ((timestamp.month + 9) % MONTH_MAX) + 1;
        var C = _(timestamp.year / 100);
        var Y = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0);
        return (((k + _(2.6 * m - 0.2) - 2 * C + Y + _(Y / 4) + _(C / 4)) % 7) + 7) % 7;
    }
    return timestamp.weekday;
}
export function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
export function daysInMonth(year, month) {
    return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month];
}
export function copyTimestamp(timestamp) {
    var date = timestamp.date, time = timestamp.time, year = timestamp.year, month = timestamp.month, day = timestamp.day, weekday = timestamp.weekday, hour = timestamp.hour, minute = timestamp.minute, hasDay = timestamp.hasDay, hasTime = timestamp.hasTime, past = timestamp.past, present = timestamp.present, future = timestamp.future;
    return { date: date, time: time, year: year, month: month, day: day, weekday: weekday, hour: hour, minute: minute, hasDay: hasDay, hasTime: hasTime, past: past, present: present, future: future };
}
export function padNumber(x, length) {
    var padded = String(x);
    while (padded.length < length) {
        padded = '0' + padded;
    }
    return padded;
}
export function getDate(timestamp) {
    var str = padNumber(timestamp.year, 4) + "-" + padNumber(timestamp.month, 2);
    if (timestamp.hasDay)
        str += "-" + padNumber(timestamp.day, 2);
    return str;
}
export function getTime(timestamp) {
    if (!timestamp.hasTime) {
        return '';
    }
    return padNumber(timestamp.hour, 2) + ":" + padNumber(timestamp.minute, 2);
}
export function nextMinutes(timestamp, minutes) {
    timestamp.minute += minutes;
    while (timestamp.minute > MINUTES_IN_HOUR) {
        timestamp.minute -= MINUTES_IN_HOUR;
        timestamp.hour++;
        if (timestamp.hour >= HOURS_IN_DAY) {
            nextDay(timestamp);
            timestamp.hour = FIRST_HOUR;
        }
    }
    return timestamp;
}
export function nextDay(timestamp) {
    timestamp.day++;
    timestamp.weekday = (timestamp.weekday + 1) % DAYS_IN_WEEK;
    if (timestamp.day > DAYS_IN_MONTH_MIN && timestamp.day > daysInMonth(timestamp.year, timestamp.month)) {
        timestamp.day = DAY_MIN;
        timestamp.month++;
        if (timestamp.month > MONTH_MAX) {
            timestamp.month = MONTH_MIN;
            timestamp.year++;
        }
    }
    return timestamp;
}
export function prevDay(timestamp) {
    timestamp.day--;
    timestamp.weekday = (timestamp.weekday + 6) % DAYS_IN_WEEK;
    if (timestamp.day < DAY_MIN) {
        timestamp.month--;
        if (timestamp.month < MONTH_MIN) {
            timestamp.year--;
            timestamp.month = MONTH_MAX;
        }
        timestamp.day = daysInMonth(timestamp.year, timestamp.month);
    }
    return timestamp;
}
export function relativeDays(timestamp, mover, days) {
    if (mover === void 0) {
        mover = nextDay;
    }
    if (days === void 0) {
        days = 1;
    }
    while (--days >= 0)
        mover(timestamp);
    return timestamp;
}
export function findWeekday(timestamp, weekday, mover, maxDays) {
    if (mover === void 0) {
        mover = nextDay;
    }
    if (maxDays === void 0) {
        maxDays = 6;
    }
    while (timestamp.weekday !== weekday && --maxDays >= 0)
        mover(timestamp);
    return timestamp;
}
export function getWeekdaySkips(weekdays) {
    var skips = [1, 1, 1, 1, 1, 1, 1];
    var filled = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < weekdays.length; i++) {
        filled[weekdays[i]] = 1;
    }
    for (var k = 0; k < DAYS_IN_WEEK; k++) {
        var skip = 1;
        for (var j = 1; j < DAYS_IN_WEEK; j++) {
            var next = (k + j) % DAYS_IN_WEEK;
            if (filled[next]) {
                break;
            }
            skip++;
        }
        skips[k] = filled[k] * skip;
    }
    return skips;
}
export function createDayList(start, end, now, weekdaySkips, max, min) {
    if (max === void 0) {
        max = 42;
    }
    if (min === void 0) {
        min = 0;
    }
    var stop = getDayIdentifier(end);
    var days = [];
    var current = copyTimestamp(start);
    var currentIdentifier = 0;
    var stopped = currentIdentifier === stop;
    if (stop < getDayIdentifier(start)) {
        return days;
    }
    while ((!stopped || days.length < min) && days.length < max) {
        currentIdentifier = getDayIdentifier(current);
        stopped = stopped || currentIdentifier === stop;
        if (weekdaySkips[current.weekday] === 0) {
            current = nextDay(current);
            continue;
        }
        var day = copyTimestamp(current);
        updateFormatted(day);
        updateRelative(day, now);
        days.push(day);
        current = relativeDays(current, nextDay, weekdaySkips[current.weekday]);
    }
    return days;
}
export function createIntervalList(timestamp, first, minutes, count, now) {
    var intervals = [];
    for (var i = 0; i < count; i++) {
        var mins = (first + i) * minutes;
        var int = copyTimestamp(timestamp);
        intervals.push(updateMinutes(int, mins, now));
    }
    return intervals;
}
export function createNativeLocaleFormatter(locale, getOptions) {
    var emptyFormatter = function (_t, _s) { return ''; };
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
        return emptyFormatter;
    }
    return function (timestamp, short) {
        try {
            var intlFormatter = new Intl.DateTimeFormat(locale || undefined, getOptions(timestamp, short));
            var time = padNumber(timestamp.hour, 2) + ":" + padNumber(timestamp.minute, 2);
            var date = timestamp.date;
            return intlFormatter.format(new Date(date + "T" + time + ":00+00:00"));
        }
        catch (e) {
            return '';
        }
    };
}
//# sourceMappingURL=timestamp.js.map
//# sourceMappingURL=timestamp.js.map
//# sourceMappingURL=timestamp.js.map