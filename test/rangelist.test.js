const RangeList = require('rangelist');

test('range list add function', () => {
    const rl = new RangeList();
    rl.add([1, 5]);
    expect(rl.print()).toBe('[1, 5)');

    rl.add([10, 20])
    expect(rl.print()).toBe('[1, 5) [10, 20)');

    rl.add([20, 20]);
    expect(rl.print()).toBe('[1, 5) [10, 20)');

    rl.add([20, 21]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');

    rl.add([3, 8]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');
});


test('range list remove function', () => {
    const rl = new RangeList([[1, 8], [10, 21]]);
    
    rl.remove([10, 10]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');

    rl.remove([10, 11]);
    expect(rl.print()).toBe('[1, 8) [11, 21)');

    rl.remove([15, 17]);
    expect(rl.print()).toBe('[1, 8) [11, 15) [17, 21)');

    rl.remove([3, 19]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');
});



test('range list add & remove function', () => {
    const rl = new RangeList([[1, 3], [19, 21]]);

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');

    rl.add([-30, 10]);
    expect(rl.print()).toBe('[-30, 10) [20, 21)');

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');
});