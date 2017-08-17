const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

//const {combineReducers} = Redux;

const combineReducers = reducers => {
    return (state = {}, action) => {

        return Object
            .keys(reducers)
            .reduce((nextState, key) => {
                    nextState[key] = reducers[key](
                        state[key], 
                        action
                    );
                    return nextState;
                }, {} 
            );
    };
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});