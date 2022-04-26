/* eslint-disable react/prop-types */

import Post from './Post';

const Main = (props) => {
	const { posts, refresh, userID } = props;

	return (
		<div>
			{posts
				? posts.map((i, index) => {
						return (
							<Post
								key={index}
								{...i}
								refresh={refresh}
								userID={userID}
								isDraft={false}
							/>
						);
				  })
				: null}
		</div>
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

export default Main;
