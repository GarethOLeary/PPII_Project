import React from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
const { TextArea } = Input;

function DisplayComment(props) {

    const actionOnClick = [
        <span onClick><hr style={{background: 'grey'}}/></span>
    ]

    return (
        <div>

           <Comment actions={actionOnClick}
            content={
                <p>
                    {props.comment.content}
                </p>
            }
            ></Comment>
        </div>
    )
}

export default DisplayComment 
