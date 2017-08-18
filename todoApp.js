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

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
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
                <ul>
                    {this.props.todos.map(todo => 
                        <li key={todo.id} 
                        onClick={()=>{
                            store.dispatch({
                                type: 'TOGGLE_TODO',
                                id: todo.id
                            })
                        }} style={{
                            textDecoration: 
                                todo.completed 
                                ? 'line-through' 
                                : 'none'
                        }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>,
        document.getElementById('root'))
}

store.subscribe(render);
render();