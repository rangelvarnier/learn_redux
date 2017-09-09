const {combineReducers, createStore} = Redux;
const {Component} = React;
const {connect} = ReactRedux;

const {Provider} = ReactRedux;
const todoApp = combineReducers({todos, visibilityFilter});

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
    </Provider>,
    document.getElementById('root')
);
