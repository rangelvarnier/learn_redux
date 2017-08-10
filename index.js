const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

//const {createStore} = Redux;

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(li => li !== listener)
        }
    }

    dispatch({});

    return {getState, dispatch, subscribe};
};

const store = createStore(counter);

const Counter = ({value}) => {
    return <h1>{value}</h1>;
}
 
const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}/>,
        document.getElementById("root")
    );
};

store.subscribe(render);
render();

document.addEventListener('click', () => store.dispatch({type: 'INCREMENT'}));
