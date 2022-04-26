import GithubLogo from '../assets/images/GitHub-64px.png';

const Github = (props) => {
	const addSpin = (event) => {
		event.target.classList.remove('backSpin');
		event.target.classList.add('spin');
	};

	const removeSpin = (event) => {
		event.target.classList.remove('spin');
		event.target.classList.add('backSpin');
	};

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

export default Github;
