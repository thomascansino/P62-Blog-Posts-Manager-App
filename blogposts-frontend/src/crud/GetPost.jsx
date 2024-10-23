
function GetPost ({ isGetPostVisible, post }){
    
    if ( isGetPostVisible ) {
        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        )
    };

};

export default GetPost