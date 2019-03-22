import Vue from 'vue';
import { validateTimestamp, parseTimestamp, parseDate } from '../util/timestamp';
export default Vue.extend({
    name: 'times',
    props: {
        now: {
            type: String,
            validator: validateTimestamp
        }
    },
    data: function () {
        return ({
            times: {
                now: parseTimestamp('0000-00-00 00:00'),
                today: parseTimestamp('0000-00-00')
            }
        });
    },
    computed: {
        parsedNow: function () {
            return this.now ? parseTimestamp(this.now) : null;
        }
    },
    watch: {
        parsedNow: 'updateTimes'
    },
    created: function () {
        this.updateTimes();
        this.setPresent();
    },
    methods: {
        setPresent: function () {
            this.times.now.present = this.times.today.present = true;
            this.times.now.past = this.times.today.past = false;
            this.times.now.future = this.times.today.future = false;
        },
        updateTimes: function () {
            var now = this.parsedNow || this.getNow();
            this.updateDay(now, this.times.now);
            this.updateTime(now, this.times.now);
            this.updateDay(now, this.times.today);
        },
        getNow: function () {
            return parseDate(new Date());
        },
        updateDay: function (now, target) {
            if (now.date !== target.date) {
                target.year = now.year;
                target.month = now.month;
                target.day = now.day;
                target.weekday = now.weekday;
                target.date = now.date;
            }
        },
        updateTime: function (now, target) {
            if (now.time !== target.time) {
                target.hour = now.hour;
                target.minute = now.minute;
                target.time = now.time;
            }
        }
    }
});
//# sourceMappingURL=times.js.map
//# sourceMappingURL=times.js.map
//# sourceMappingURL=times.js.map