import './Nav.scss';
import mediumLogo from '../assets/images/medium_logo.png';
import Github from './Github.jsx';

function Nav() {
	return (
		<nav className="nav">
			<div className="nav__wrapper">
				<a className="hoverable" href="/">
					<img
						className="logo ratio1H4W"
						src={mediumLogo}
						alt="logo"
					/>
				</a>
				<Github />
				<div className="btns">
					<a className="btns__signup-wrapper" href="/drafts">
						<button type="button" className="btns__signup">
							My Drafts
						</button>
					</a>
					<a className="btns__signup-wrapper" href="/login">
						<button type="button" className="btns__login">
							Login
						</button>
					</a>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
