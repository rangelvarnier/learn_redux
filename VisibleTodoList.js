const {connect} = ReactRedux;

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
}

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
        textDecoration: completed
            ? 'line-through'
            : 'none'
    }}>
        {text}
    </li>
)

const TodoList = ({todos, onClickTodo}) => (
    <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onClickTodo(todo.id)}/>)}
    </ul>
)

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickTodo: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);