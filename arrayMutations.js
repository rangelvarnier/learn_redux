const addCounter = (list) => {
    // return list.concat([0]); //ES5
    return [
        ...list,
        0
    ]; //ES6
}

const removeCounter = (list, index) => {
    //ES5 return list.slice(0, index).concat(list.slice(index + 1)); ES6
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]
}

const incrementCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ]
}

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
}

const testRemoveCounter = () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 30];

    deepFreeze(listBefore);

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
}

const testIncrementCounter = () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 21, 30];

    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('arrayMutations tests passed!')