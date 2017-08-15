const togleTodo = (todo) => {
    // objeto com mutação
    // todo.completed = !todo.completed;
    // return todo;

    // new object
    // return {
    //     id : todo.id,
    //     text: todo.text,
    //     completed: !todo.completed
    // }

    //ES6
    // return Object.assign({}, todo, {
    //     completed: !todo.completed
    // })

    //ES7
    return {
        ...todo,
        completed: !todo.completed
    }
}

const testTogleTodo = () => {
    const todoBefore = {
        id : 0,
        text: 'Lear Redux',
        completed: false
    };

    const todoAfter = {
        id : 0,
        text: 'Lear Redux',
        completed: true
    };

    deepFreeze(todoBefore);

    expect(togleTodo(todoBefore)).toEqual(todoAfter);
}

testTogleTodo()

console.log('objectMutations tests passed!')