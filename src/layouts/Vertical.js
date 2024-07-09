/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { Suspense, useEffect, useState } from 'react';
// components
import ThemeCustomizer from '../components/ThemeCustomizer';
import { DashboardProvider } from './context/DashboardContext';
import { MenuProvider } from './context/MenuContext';
import { PermisosProvider } from './context/PermisosProvider/PermisosProvider';
import { ValidadorProvider } from './context/ValidadorContext';
import { SearchProvider } from './context/SearchContext';
import { NotificacionesProvider } from './context/NotificacionesProvider';
import { SecurityProvider } from './context/SecurityProvider';
import { changeSidebarType } from '../redux/actions';
import { useDispatch } from 'react-redux';
import * as layoutConstants from '../constants/layout';
const Topbar = React.lazy(() => import('./Topbar'));
const RightSidebar = React.lazy(() => import('./RightSidebar'));
const loading = () => <div className=""></div>;

export function capitalize(str) {
  if (!str) return;

  return str.trim().replace(/^\w/, (c) => c.toUpperCase());
}
type VerticalLayoutState = {
  isMenuOpened?: boolean,
  itemsmenu?: string,
};

const VerticalLayout = (state: VerticalLayoutState): React$Element<any> => {
  const dispatch = useDispatch();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened((prevState) => {
      setIsMenuOpened(!prevState);
    });

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove('sidebar-enable');
      } else {
        document.body.classList.add('sidebar-enable');
      }
    }
  };



  useEffect(() => {
    //dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE));
}, [dispatch]);
  return (
    <>
      <SecurityProvider>
        <DashboardProvider>
          <MenuProvider>
            <PermisosProvider>
              <SearchProvider>
                <NotificacionesProvider>
                  <div className="wrapper">
                    <div className="content-page">
                      <div className="content">
                        <Suspense fallback={loading()}>
                        <ValidadorProvider>
                          <Topbar openLeftMenuCallBack={openMenu} hideLogo={true} />
                          </ValidadorProvider>
                        </Suspense>
                      </div>
                    </div>
                  </div>
                  <Suspense fallback={loading()}>
                    <RightSidebar>
                      <ThemeCustomizer />
                    </RightSidebar>
                  </Suspense>
                </NotificacionesProvider>
             </SearchProvider>
            </PermisosProvider>
          </MenuProvider>
        </DashboardProvider>
      </SecurityProvider>
    </>
  );
};
export default VerticalLayout;
