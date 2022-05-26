const { format_date } = require('../utils/helpers');

test('format_date() returns a date in a string format', () => {
    const date = new Date('2022-05-26 15:01:11');

    expect(format_date(date)).toBe('5/26/2022');
});
