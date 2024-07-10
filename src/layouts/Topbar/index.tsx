import { Link } from 'react-router-dom';
import {  profileMenus } from './data';

import ProfileDropdown from './ProfileDropdown';

import MaximizeScreen from './MaximizeScreen';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// assets
import userImage from '@/assets/images/users/avatar-1.jpg';
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoSm from '@/assets/images/logo-sm.png';
import logoDarkSm from '@/assets/images/logo-dark-sm.png';
import { ThemeSettings, useThemeContext } from '@/common';
import useThemeCustomizer from '@/components/ThemeCustomizer/useThemeCustomizer';
import { useViewport } from '@/hooks';

type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
};

const Topbar = ({ topbarDark, toggleMenu, navOpen }: TopbarProps) => {
	const { settings, updateSettings, updateSidebar } = useThemeContext();

	const { sideBarType } = useThemeCustomizer();

	const { width } = useViewport();

	/**
	 * Toggle the leftmenu when having mobile screen
	 */
	const handleLeftMenuCallBack = () => {
		if (width < 1140) {
			if (sideBarType === 'full') {
				showLeftSideBarBackdrop();
				document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
			} else if (sideBarType === 'condensed' || sideBarType === 'fullscreen') {
				updateSidebar({ size: ThemeSettings.sidebar.size.default });
			} else {
				updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
			}
		} else if (sideBarType === 'condensed') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default });
		} else if (sideBarType === 'full' || sideBarType === 'fullscreen') {
			showLeftSideBarBackdrop();
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
		} else {
			updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
		}
	};

	/**
	 * creates backdrop for leftsidebar
	 */
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div');
		backdrop.id = 'custom-backdrop';
		backdrop.className = 'offcanvas-backdrop fade show';
		document.body.appendChild(backdrop);

		backdrop.addEventListener('click', function () {
			document.getElementsByTagName('html')[0].classList.remove('sidebar-enable');
			hideLeftSideBarBackdrop();
		});
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop');
		if (backdrop) {
			document.body.removeChild(backdrop);
			document.body.style.removeProperty('overflow');
		}
	}

	/**
	 * Toggle Dark Mode
	 */
	const toggleDarkMode = () => {
		if (settings.theme === 'dark') {
			updateSettings({ theme: ThemeSettings.theme.light });
		} else {
			updateSettings({ theme: ThemeSettings.theme.dark });
		}
	};

	/**
	 * Toggles the right sidebar
	 */
	const handleRightSideBar = () => {
		updateSettings({ rightSidebar: ThemeSettings.rightSidebar.show });
	};
console.log('navOpen',sideBarType)
	return (
		<div className={'navbar-custom'}>
			<div className="topbar container-fluid">
				<div className="d-flex align-items-center gap-lg-2 gap-1">
					<div className="logo-topbar">
						<Link to="/" className={topbarDark ? 'logo-light' : 'logo-dark'}>
							<span className="logo-lg">
								<img src={topbarDark ? logo : logoDark} alt="logo" />
							</span>
							<span className="logo-sm">
								<img src={topbarDark ? logoSm : logoDarkSm} alt="small logo" />
							</span>
						</Link>
					</div>

					<button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
						<i className="mdi mdi-menu" />
					</button>

					<button
						className={`navbar-toggle ${navOpen ? 'open' : ''}`}
						onClick={toggleMenu}
					>
						<div className="lines">
							<span />
							<span />
							<span />
						</div>
					</button>

					
				</div>

				<ul className="topbar-menu d-flex align-items-center gap-3">


					<li className="d-none d-sm-inline-block">
						<button
							className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
							onClick={handleRightSideBar}
						>
							<i className="ri-settings-3-line font-22"></i>
						</button>
					</li>

					<li className="d-none d-sm-inline-block">
						<OverlayTrigger
							placement="left"
							overlay={<Tooltip id="dark-mode-toggler">Theme Mode</Tooltip>}
						>
							<div className="nav-link" id="light-dark-mode" onClick={toggleDarkMode}>
								<i className="ri-moon-line font-22" />
							</div>
						</OverlayTrigger>
					</li>

					<li className="d-none d-md-inline-block">
						<MaximizeScreen />
					</li>

					<li className="dropdown">
						<ProfileDropdown
							userImage={userImage}
							menuItems={profileMenus}
							username={'Dominic Keller'}
							userTitle={'Founder'}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Topbar;
