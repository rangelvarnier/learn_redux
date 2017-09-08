const {combineReducers, createStore} = Redux;
const {Component} = React;
const {connect} = ReactRedux;

//filter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const {Provider} = ReactRedux;
const todoApp = combineReducers({todos, visibilityFilter});

let nextTodoId = 0;
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}



const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a
            href="#"
            onClick={event => {
            event.preventDefault();
            onClick();
        }}>
            {children}
        </a>
    )
}

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active : ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToLinkProps, 
    mapDispatchToLinkProps
)(Link)

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

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node
            }}/>
            <button
                onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                add todo
            </button>
        </div>
    )
}

AddTodo = connect()(AddTodo);

const Footer = () => (
    <p>Show:{' '}
        <FilterLink filter='SHOW_ALL'>
            All
        </FilterLink>{' '}
        <FilterLink filter='SHOW_ACTIVE'>
            Active
        </FilterLink>{' '}
        <FilterLink filter='SHOW_COMPLETED'>
            Completed
        </FilterLink>
    </p>
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

const TodoApp = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
    <TodoApp/>
</Provider>, document.getElementById('root'));
