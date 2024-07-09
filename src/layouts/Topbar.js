// @flow
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItemStorage } from '../pages/dashboard/components/itemStorage';
// actions
import { showRightSidebar } from '../redux/actions';
// components
import ProfileDropdown from '../components/ProfileDropdown';
import profilePic from '../assets/images/users/avatar-1.jpg';
import logoSmDark from '../assets/images/logo_sm_dark.png';
import logoSmLight from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';

//constants
import * as layoutConstants from '../constants/layout';
import ModulosPrincipales from '../components/ModulosPrincipales';



// get the profilemenu
const ProfileMenus = [
    {
        label: 'Mi Cuenta',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/',
    },
    {
        label: 'Cambiar Password',
        icon: 'mdi mdi-lock-outline',
        redirectTo: '/dashboard/CambiarPassword',
    },
    {
        label: 'Salir de la Plataforma',
        icon: 'mdi mdi-logout',
        redirectTo: '/account/logout',
    },
];



type TopbarProps = {
    hideLogo?: boolean,
    navCssClasses?: string,
    openLeftMenuCallBack?: () => void,
    topbarDark?: boolean,
};

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps): React$Element<any> => {

  //const Logout = React.lazy(() => import('../pages/account/Logout'));
  const dispatch = useDispatch();

    const [isopen, setIsopen] = useState(false);
    const [autor, setAutor] = useState({});

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    const { layoutType } = useSelector((state) => ({
        layoutType: state.Layout.layoutType,
    }));

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen((prevState) => !prevState);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };
    useEffect(() => {
      const userlocal = getItemStorage({
        typeOfStorage:sessionStorage,
        item: 'hyper_user',
      })
      //console.log('TopBar-userlocal',userlocal);
      setAutor({name:userlocal[0]?.username,role:userlocal[0]?.role});

    }, []);
    console.log('autor',autor?.name)
    return (
        <React.Fragment>


            <div className={`navbar-custom ${navbarCssClasses} `}>

                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={logo} alt="logo" height="16" />
                            </span>
                            <span className="topnav-logo-sm">
                                <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="16" />
                            </span>
                        </Link>
                    )}

                     <ul className="list-unstyled topbar-menu float-end mb-0">

                        <li className="notification-list">
                            <button
                                className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleRightSideBar}>
                                <i className="dripicons-gear noti-icon"></i>
                            </button>
                        </li>
                           <li className="dropdown notification-list">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={autor.name}
                                userTitle={autor.role}
                            />
                        </li>
                    </ul>
                    {/* toggle for vertical layout */}
                    {layoutType === layoutConstants.LAYOUT_VERTICAL && (
                        <button className="button-menu-mobile open-left disable-btn" onClick={handleLeftMenuCallBack}>
                            <i className="mdi mdi-menu" />
                        </button>
                    )}

                </div>
            </div>
            <div className={`navbar-custom topbar-Inicio `}>

           <ModulosPrincipales tipo={autor?.name}/>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
