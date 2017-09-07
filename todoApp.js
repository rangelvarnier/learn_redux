const {combineReducers, createStore} = Redux;
const {Component} = React;

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const Link = ({
    active, 
    children,
    onClick
}) => {
    if(active){
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={event => {
                event.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    )
}

class FilterLink extends Component {

    componentDidMount() {
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props = this.props;
        const {store} = props;
        const state = store.getState();

        return(
            <Link
                active={props.filter === state.getVisibilityFilter}
                onClick={()=>store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter
                })}>
                {props.children}
            </Link>
        )
    }
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

const AddTodo =({store}) => {
    let input; 

    return (
        <div>
            <input ref={node => {
                input= node
            }}/>
            <button
                onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId++,
                        text : input.value
                    })
                    input.value = '';
                }}>
                add todo
            </button>
        </div>
    )
}

const Footer = ({store}) => ( 
    <p>Show:{' '}
        <FilterLink 
            filter='SHOW_ALL'
            store={store}>
            All
        </FilterLink>{' '}
        <FilterLink 
            filter='SHOW_ACTIVE'
            store={store}>
            Active
        </FilterLink>{' '}
        <FilterLink 
            filter='SHOW_COMPLETED'
            store={store}>
            Completed
        </FilterLink>
    </p>
)


class VisibleTodoList extends Component{

    componentDidMount() {
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props = this.props;
        const {store} = props;
        const state = store.getState();

        return(
            <TodoList 
                todos={getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                )}
                onClickTodo={id =>{
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })
                }}
            />
        )
    }
}

let nextTodoId = 0;
const TodoApp = ({store}) => (
    <div>
        <AddTodo store={store}/>
        <VisibleTodoList store={store}/>
        <Footer store={store}/>
    </div>
);


const todoApp = combineReducers({todos, visibilityFilter});

ReactDOM.render(
    <TodoApp store={createStore(todoApp)}/>,
    document.getElementById('root')
);
