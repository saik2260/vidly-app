const Like = (props) => {
    let classes = "fa fa-heart"
    if (!props.movie.liked) classes += "-o"
    return (
        <i className={classes}
            area-hidden="true"
            onClick={() => props.onLikeToggle(props.movie)}
            style={{ cursor: 'pointer' }}
        />
    );
}

export default Like;