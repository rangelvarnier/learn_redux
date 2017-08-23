const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const {combineReducers, createStore} = Redux;
const {Component} = React;

const todoApp = combineReducers({todos, visibilityFilter});
const store = createStore(todoApp);

const FilterLink = ({filter, currentFilter, children}) => {
    if(filter === currentFilter){
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={event => {
                event.preventDefault();
                store.dispatch({
                    type : 'SET_VISIBILITY_FILTER',
                    filter
                })
            }}
        >
            {children}
        </a>
    )
}

const getVisibleTodos = (todos, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE' : 
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
}

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li onClick={onClick}
        style={{
        textDecoration: 
            completed 
            ? 'line-through' 
            : 'none'
    }}>
        {text}
    </li>
)

const TodoList = ({
    todos,
    onClickTodo
}) => (
    <ul>
        {todos.map(todo => 
            <Todo key={todo.id}
                {...todo}
                onClick={() => onClickTodo(todo.id)}/>
        )}
    </ul>
)



let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        const {todos, visibilityFilter} = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <input ref={node => {
                    this.input= node
                }}/>
                <button
                    onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>
                    add todo
                </button>

                <TodoList 
                    todos={visibleTodos}
                    onClickTodo={(id) =>{
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                    }}
                    />
               
                <p>Show:{' '}
                    <FilterLink 
                        filter='SHOW_ALL' 
                        currentFilter={visibilityFilter}>All</FilterLink>{' '}
                    <FilterLink 
                        filter='SHOW_ACTIVE' 
                        currentFilter={visibilityFilter}>Active</FilterLink>{' '}
                    <FilterLink 
                        filter='SHOW_COMPLETED' 
                        currentFilter={visibilityFilter}>Completed</FilterLink>
                </p>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('root'))
}

store.subscribe(render);
render();