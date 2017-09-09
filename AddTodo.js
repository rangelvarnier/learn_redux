const {connect} = ReactRedux;

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