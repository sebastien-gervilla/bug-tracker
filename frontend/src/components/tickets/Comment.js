import React from 'react';
import { MdDelete } from 'react-icons/md';
import { fetchApi } from '../../utils/api-fetch';

const Comment = ({ comment, loadComments, canRemoveComment }) => {

    const handleDelete = (event) => {
        event.preventDefault();
        deleteComment();
    }

    const deleteComment = () => {
        fetchApi(`app/comments/${comment._id}`, "DELETE", null, (data) => {
            if (data.success === true)
                console.log("Successfully deleted comment.");
                loadComments();
        });
    };

    const manageRemoveButton = () => {
        if (canRemoveComment(comment.authorId))
            return <button><MdDelete className='delete-btn' onClick={handleDelete} /></button>
    };

    return (
        <div className="comment">
            <p className="author">{comment.author}</p>
            <p className="message">{comment.message}</p>
            {manageRemoveButton()}
        </div>
    );
};

export default Comment;