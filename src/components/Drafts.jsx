/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Post from './Post';

import { getDrafts } from './FetchController.js';

const Drafts = ({ setIDFromToken, refreshPosts, userID }) => {
	const [userMsg, setUserMsg] = useState(<span>Not logged in</span>);
	const [drafts, setDrafts] = useState(null);

	useEffect(async () => {
		if (document.cookie !== '') {
			setUserMsg(null);
			refreshDrafts();
		}
	}, []);

	async function getFilteredDrafts() {
		const drafts = await getDrafts();
		return drafts.filter((i) => i.published === false);
	}

	async function refreshDrafts() {
		const drafts = await getFilteredDrafts();
		return drafts.length <= 0
			? (setUserMsg(<span>No drafts found</span>), setDrafts(null))
			: setDrafts(drafts);
	}

	return (
		<>
			{drafts
				? drafts.map((i, index) => {
						return (
							<Post
								key={index}
								{...i}
								refresh={refreshDrafts}
								userID={userID}
								isDraft={true}
							/>
						);
				  })
				: null}
			{userMsg}
		</>
	);
};

// <div className="post">
// 	<div className="post__info">
// 		<div className="post__info__wrapper">
// 			<img
// 				src={acctIcon}
// 				alt="acct-icon"
// 				width="50px"
// 				height="50px"
// 			></img>
// 			<div className="flex-col">
// 				<span>Name</span>
// 				<span>Date</span>
// 			</div>
// 		</div>
// 	</div>
// 	<p>
// 		Lorem Ipsum is simply dummy text of the printing and
// 		typesetting industry. Lorem Ipsum has been the
// 		industry&apos;s standard dummy text ever since the 1500s,
// 		when an unknown printer took a galley of type and scrambled
// 		it to make a type specimen book. It has survived not only
// 		five centuries, but also the leap into electronic
// 		typesetting, remaining essentially unchanged. It was
// 		popularised in the 1960s with the release of Letraset sheets
// 		containing Lorem Ipsum passages, and more recently with
// 		desktop publishing software like Aldus PageMaker including
// 		versions of Lorem Ipsum.
// 	</p>
// 	<div className="cmt-btn">
// 		<button className="">Comment</button>
// 	</div>
// </div>

export default Drafts;
