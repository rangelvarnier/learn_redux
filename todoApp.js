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

    static contextTypes = {
        store: React.PropTypes.object
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props = this.props;
        const {store} = this.context;
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

const AddTodo =(props, {store}) => {
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

AddTodo.contextTypes = {
    store: React.PropTypes.object
}

const Footer = () => ( 
    <p>Show:{' '}
        <FilterLink 
            filter='SHOW_ALL'>
            All
        </FilterLink>{' '}
        <FilterLink 
            filter='SHOW_ACTIVE'>
            Active
        </FilterLink>{' '}
        <FilterLink 
            filter='SHOW_COMPLETED'>
            Completed
        </FilterLink>
    </p>
)


class VisibleTodoList extends Component{

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props = this.props;
        const {store} = this.context;
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

VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
}

let nextTodoId = 0;
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

const {Provider} = ReactRedux;
const todoApp = combineReducers({todos, visibilityFilter});

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
