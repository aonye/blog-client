import GithubLogo from '../assets/images/GitHub-64px.png';

const Footer = (props) => {

	function getAllPosts() {
		
	}

	return (
		<a href="https://github.com/aonye">
			<img
				onMouseOver={(e) => addSpin(e)}
				onMouseOut={(e) => removeSpin(e)}
				className="github-logo"
				src={GithubLogo}
				alt="github logo"
			/>
		</a>
	);
};

export default Footer;
