var
    _ = require('underscore'),

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    getWeekendRanges = function(year) {
        // get the first friday of the year by figuring out what January 1 is
        var firstDateObject = new Date('January 1 ' + year),
            firstDay = firstDateObject.getDay(),
            millisecondsPerDay = 1000 * 60 * 60 * 24,
            millisecondsPerWeekend = millisecondsPerDay * 3,
            millisecondsPerWeek = millisecondsPerDay * 7,
            fridayDay = 5,
            daysPerWeek = 7,
            firstFriday = firstDateObject.getTime() + (fridayDay >= firstDay ? (fridayDay - firstDay) : (daysPerWeek - firstDay + fridayDay) ),
            currWeekendStartDate = firstFriday,
            range = []
        ;


        while ((new Date(currWeekendStartDate)).getFullYear() === year) {
            range.push([
                currWeekendStartDate,
                currWeekendStartDate + millisecondsPerWeekend
            ]);

            currWeekendStartDate += millisecondsPerWeek;
        }

        return range;
    },
    formatWeekends = function(weekends) {
        return _.map(weekends, function(range) {
            var start = new Date(range[0]),
                end = new Date(range[1]),
                startMonth = months[start.getMonth()],
                endMonth = months[end.getMonth()]
            ;

            return startMonth + ' ' + start.getDate() + ' - ' + (startMonth === endMonth ? '' : (endMonth + ' ')) + end.getDate();
        });
    }
;

require('fs').writeFileSync('2016months', formatWeekends(getWeekendRanges(2016)).join(require('os').EOL));
