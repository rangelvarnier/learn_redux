const {connect} = ReactRedux;

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
