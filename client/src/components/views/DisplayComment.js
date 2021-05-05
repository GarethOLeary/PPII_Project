import React from 'react'
// import Comment 
import { Comment } from 'antd';

// This component is used to display the comments 

function DisplayComment(props) {

    // when clicked - a line will break each comment 
    const actionOnClick = [
        <span onClick><hr style={{ background: 'grey' }} /></span>
    ]

    return (
        <div>
            {/* actions for displaying the content of the comment */}
            <Comment actions={actionOnClick}
                content={
                    <p>
                        {/* content of the comment */}
                        {props.comment.content}
                    </p>
                }
            ></Comment>
        </div>
    )
}

export default DisplayComment 
