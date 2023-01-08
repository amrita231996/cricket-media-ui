import React from 'react';

const PostContext = React.createContext(
        { 
            showForm: false,
            toggleShowForm: () => {} 
        }
    );

export default PostContext;