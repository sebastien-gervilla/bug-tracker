import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/api-fetch';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import Comment from './Comment';

const Comments = ({ toggleModal, ticketId }) => {

    const [comments, setComments] = useState([]);

    const [inputComment, setInputComment] = useState({
        message: '',
        ticketId: ''
    });

    useEffect(() => {
        loadComments();
        updatePage(page);
    });

    const loadComments = () => {
        if (!ticketId)
            return;
        fetchApi(`app/comments/ticket/${ticketId}`, 'GET', null, (data) => {
            if (data.success === true) {
                let infos = comments.map(comment => [comment['_id'], comment['updatedAt']]);
                let dataInfos = data.comments.map(comment => [comment['_id'], comment['updatedAt']]);
                if (JSON.stringify(infos) !== JSON.stringify(dataInfos)){
                    setComments(data.comments);
                }
            }
        });
        if (!inputComment.ticketId)
            setInputComment({...inputComment, ticketId: ticketId});
    };

    const [page, setPage] = useState(0);

    const maxPage = Math.floor(comments.length / 7) + 1;

    const changePage = (event) => {
        const newPage = page + parseInt(event.currentTarget.value);
        updatePage(newPage);
    };

    const updatePage = (newPage) => {
        const pages = maxPage - 1;
        if (newPage > pages)
            setPage(pages);
        else if (newPage < 0) 
            setPage(0);
        else if (newPage !== page)
            setPage(newPage);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        addComment();
        setInputComment({...inputComment, message: ''});
    };

    const addComment = () => {
        fetchApi('app/comments', 'POST', inputComment, (data) => {
            if (data.success === true) {
                console.log("Successfully created comment.");
                loadComments();
            }
        });
    };

    const handleChanges = (event) => {
        setInputComment({...inputComment, message: event.target.value});
    };

    const displayComments = () => {
        let comms = []
        let end = 6 * (page + 1);
        if (end > comments.length)
            end = comments.length

        for (let i = 6 * page; i < end; i++) {
            const comment = comments[i];
            comms.push(<Comment comment={comment} loadComments={loadComments} key={comment._id} />);
        };
        return comms;
    };

    return (
        <div className="comments">
            <div className="header">
                <input onChange={handleChanges} name="message" value={inputComment.message}
                type="text" placeholder='Ecrire un commentaire...' />
                <input onClick={handleAdd} className='add-btn' name="submit" type="submit" />
            </div>
            <div className="menu">
                <p className="author">AUTEUR</p>
                <p className="message">MESSAGE</p>
            </div>
            {displayComments()}
            <div className="footer">
                <div className="footer-buttons">
                    <button className='switch-btn' onClick={changePage} value="-1"><VscChevronLeft/></button>
                    <button className='switch-btn' onClick={changePage} value="1"><VscChevronRight/></button>
                </div>
                <p>Page {page + 1} / {maxPage}</p>
            </div>
        </div>
    );
};

export default Comments;