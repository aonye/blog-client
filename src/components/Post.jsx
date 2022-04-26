/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import moment from 'moment';
import acctIcon from '../acct-icon.png';
import './Post.scss';

import { updatePost, deletePost, addComment } from './FetchController.js';
import Comment from './Comment.jsx';

const Post = (props) => {
	const {
		author,
		title,
		post,
		published,
		timestamp,
		comments,
		userID,
		_id: postID,
		refresh,
		isDraft,
	} = props;
	const authorID = author._id;
	const username = author.username;
	const date = moment(timestamp).format('MM-DD-YYYY');

	const [editableFields, setEditableFields] = useState({
		post_title: true,
		post_text: true,
		comment: true,
	});
	const [commentText, setCommentText] = useState('');
	const [postTitle, setPostTitle] = useState(title);
	const [postText, setPostText] = useState(post);
	const [publishedStatus, setPublishedStatus] = useState(published);

	async function handleInputEnd(e) {
		const fieldName = e.target.className.split('-')[1];
		if (e.keyCode === 13) {
			if (fieldName === 'comment') {
				await addComment(commentText, postID);
				setCommentText('');
			} else if (
				fieldName === 'post_title' ||
				fieldName === 'post_text'
			) {
				const payload = {
					title: postTitle,
					post: postText,
					published: publishedStatus,
				};
				await updatePost(payload, postID);
			}
			setEditableFields((prevState) => {
				return { ...prevState, [fieldName]: true };
			});
			refresh();
		}
		if (e.keyCode === 27) {
			setCommentText('');
			setEditableFields((prevState) => {
				return { ...prevState, [fieldName]: true };
			});
		}
	}

	async function handlePublish() {
		const payload = {
			title: postTitle,
			post: postText,
			published: true,
		};
		setPublishedStatus(true);
		await updatePost(payload, postID);
	}

	return (
		<>
			<div className="post">
				<div className="post__info">
					<div className="testwrapper">
						<div className="post__info__wrapper">
							<img
								src={acctIcon}
								alt="acct-icon"
								width="50px"
								height="50px"
							></img>
							<div className="flex-col">
								<span>{username}</span>
								<span>{date}</span>
							</div>
						</div>
						<div>
							{editableFields.post_title ? (
								<span
									className="post__info__title hoverable"
									onClick={() =>
										setEditableFields((prevState) => {
											return {
												...prevState,
												post_title: false,
											};
										})
									}
								>
									{postTitle}
								</span>
							) : (
								<input
									type="text"
									defaultValue={postTitle}
									className="input-post_title"
									onChange={(e) =>
										setPostTitle(e.target.value)
									}
									onKeyDown={(e) => handleInputEnd(e)}
								></input>
							)}
						</div>
					</div>
					<div className="flex-col">
						{isDraft === true ? (
							<span
								className="deleteLink hoverable"
								onClick={async () => {
									await handlePublish();
									refresh();
								}}
							>
								Publish Post
							</span>
						) : null}
						{authorID === userID ? (
							<span
								className="deleteLink hoverable"
								onClick={async () => {
									await deletePost(postID);
									refresh();
								}}
							>
								Delete Post
							</span>
						) : null}
					</div>
				</div>
				{editableFields.post_text ? (
					<p
						className="hoverable"
						onClick={() =>
							setEditableFields((prevState) => {
								return {
									...prevState,
									post_text: false,
								};
							})
						}
					>
						{postText}
					</p>
				) : (
					<input
						type="text"
						defaultValue={postText}
						className="input-post_text"
						onChange={(e) => setPostText(e.target.value)}
						onKeyDown={(e) => handleInputEnd(e)}
					></input>
				)}
				<div className="post__comment">
					{editableFields.comment ? (
						<button
							className="btn"
							onClick={() =>
								setEditableFields((prevState) => {
									return {
										...prevState,
										comment: false,
									};
								})
							}
						>
							Comment
						</button>
					) : (
						<input
							className="input-comment"
							onChange={(e) => setCommentText(e.target.value)}
							onKeyDown={(e) => handleInputEnd(e)}
						></input>
					)}
				</div>
				{comments.map((i, index) => {
					return (
						<div key={index}>
							<Comment {...i} postID={postID} refresh={refresh} />
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Post;
