/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import acctIcon from '../acct-icon.png';
import './Comment.scss';

import {
	updateComment,
	deleteCommentByID,
	getTokenFromCookie,
	getIDFromJWTToken,
} from './FetchController.js';
import moment from 'moment';

const Comment = (props) => {
	const {
		_id: commentID,
		author,
		text,
		timestamp,
		postID,
		// userID,
		refresh,
	} = props;
	const userID = getIDFromJWTToken(getTokenFromCookie());
	const date = moment(timestamp).format('MM-DD-YYYY');

	const [commentText, setCommentText] = useState(text);
	const [editStatus, setEditStatus] = useState(false);

	async function handleInputEnd(e) {
		if (e.keyCode === 13) {
			const payload = {
				text: commentText,
			};
			console.log(payload, postID, commentID);
			// await updateComment(payload, postID, commentID);
			setEditStatus(false);
		}
		if (e.keyCode === 27) {
			setEditStatus(false);
			// setCommentText(text);
		}
	}

	const renderText = () => {
		return author._id === userID ? (
			editStatus ? (
				<input
					type="text"
					defaultValue={commentText}
					className="input"
					onChange={(e) => setCommentText(e.target.value)}
					onKeyDown={(e) => handleInputEnd(e)}
				></input>
			) : (
				<p
					onClick={() => setEditStatus(true)}
					className="comment__text"
				>
					{commentText}
				</p>
			)
		) : (
			<p className="comment__text">{commentText}</p>
		);
	};

	return (
		<div className="comment">
			<div className="comment__info">
				<div className="wrapper">
					<div className="image-wrapper">
						<img
							src={acctIcon}
							alt="acct-icon"
							width="50px"
							height="50px"
						></img>
						<div className="flex-col">
							<span>{author.username}</span>
							<span>{date}</span>
						</div>
					</div>
					{author._id === userID ? (
						<div className="comment-operator">
							<span
								className="link hoverable"
								onClick={async () => {
									await deleteCommentByID(postID, commentID);
									refresh();
								}}
							>
								Delete Comment
							</span>
						</div>
					) : null}
				</div>
			</div>
			{renderText()}
		</div>
	);
};

export default Comment;
