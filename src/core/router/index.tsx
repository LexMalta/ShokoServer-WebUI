/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { useSelector } from 'react-redux';
import type { BrowserHistory, History } from 'history';

import { RootState } from '../store';
import LoginPage from '../../pages/login/LoginPage';
import ErrorPage from '../../pages/error/ErrorPage';
import MainPage from '../../pages/main/MainPage';
import FirstRunPage from '../../pages/firstrun/FirstRunPage';
import AuthenticatedRoute from './AuthenticatedRoute';

// Main page
import DashboardPage from '../../pages/dashboard/DashboardPage';
import ImportFoldersPage from '../../pages/import-folders/ImportFoldersPage';
import SettingsPage from '../../pages/settings/SettingsPage';
import LogsPage from '../../pages/logs/LogsPage';
import NoMatchPage from '../../pages/nomatch';
import UtilitiesPage from '../../pages/utilities/UtilitiesPage';

// First run
import Acknowledgement from '../../pages/firstrun/Acknowledgement';
import DatabaseSetup from '../../pages/firstrun/DatabaseSetup';
import LocalAccount from '../../pages/firstrun/LocalAccount';
import AniDBAccount from '../../pages/firstrun/AniDBAccount';
import MetadataSources from '../../pages/firstrun/MetadataSources';
import StartServer from '../../pages/firstrun/StartServer';
import ImportFolders from '../../pages/firstrun/ImportFolders';
import DataCollection from '../../pages/firstrun/DataCollection';

// Collection
import GroupList from '../../pages/collection/GroupList';
import Group from '../../pages/collection/Group';
import FilterGroupList from '../../pages/collection/FilterGroupList';

// Utilities
import UnrecognizedUtility from '../../pages/utilities/UnrecognizedUtility';
import MultipleFilesUtility from '../../pages/utilities/MultipleFilesUtility';
import SeriesWithoutFilesUtility from '../../pages/utilities/SeriesWithoutFilesUtility';

type Props = {
  history: BrowserHistory;
};

function Router(props: Props) {
  const theme = useSelector((state: RootState) => state.webuiSettings.webui_v2.theme);
  useEffect(() => {
    document.body.className = 'theme-shoko-blue';
  }, []);

  const { history } = props;

  return (
    <div id="app-container" className={`${theme} theme-shoko-blue flex h-screen`}>
      <ReduxRouter history={history}>
        <Routes>
          <Route index element={<Navigate to="/webui" replace />} />
          <Route path="/webui">
            <Route path="login" element={<LoginPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="firstrun" element={<FirstRunPage />}>
              <Route index element={<Navigate to="acknowledgement" replace />} />
              <Route path="acknowledgement" element={<Acknowledgement />} />
              <Route path="db-setup" element={<DatabaseSetup />} />
              <Route path="local-account" element={<LocalAccount />} />
              <Route path="anidb-account" element={<AniDBAccount />} />
              <Route path="metadata-sources" element={<MetadataSources />} />
              <Route path="start-server" element={<StartServer />} />
              <Route path="import-folders" element={<ImportFolders />} />
              <Route path="data-collection" element={<DataCollection />} />
            </Route>
            <Route element={<AuthenticatedRoute><MainPage /></AuthenticatedRoute>}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="import-folders" element={<ImportFoldersPage />} />
                <Route path="utilities" element={<UtilitiesPage />}>
                  <Route index element={<Navigate to="unrecognized" replace />} />
                  <Route path="unrecognized" element={<UnrecognizedUtility />} />
                  <Route path="multiple-files" element={<MultipleFilesUtility />} />
                  <Route path="series-without-files" element={<SeriesWithoutFilesUtility />} />
                </Route>
                <Route path="log" element={<LogsPage />} />
                <Route path="collection">
                  <Route index element={<GroupList />}/>
                  <Route path="group/:groupId" element={<Group />}/>
                  <Route path="filter/:filterId" element={<FilterGroupList />}/>
                </Route>
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<NoMatchPage />} />
            </Route>
          </Route>
        </Routes>
      </ReduxRouter>
    </div>
  );
}

export default Router;
