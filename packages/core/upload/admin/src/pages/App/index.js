import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { LoadingIndicatorPage, useRBAC, useFocusWhenNavigate } from '@strapi/helper-plugin';
import { Layout, HeaderLayout, ContentLayout, ActionLayout } from '@strapi/parts/Layout';
import { Main } from '@strapi/parts/Main';
import { Button } from '@strapi/parts/Button';
import AddIcon from '@strapi/icons/AddIcon';
import { Box } from '@strapi/parts/Box';
import { BaseCheckbox } from '@strapi/parts/BaseCheckbox';
import { Search } from './components/Search';
import { ListView } from './components/ListView';

import { getTrad } from '../../utils';
import pluginId from '../../pluginId';
import pluginPermissions from '../../permissions';
import { AppContext } from '../../contexts';

import HomePage from '../HomePage';

const BoxWithHeight = styled(Box)`
  height: ${32 / 16}rem;
  display: flex;
  align-items: center;
`;

const App = () => {
  const state = useRBAC(pluginPermissions);
  const { formatMessage } = useIntl();

  useFocusWhenNavigate();

  return (
    <Layout>
      <Main labelledBy="media-lib-title">
        <HeaderLayout
          id="media-lib-title"
          title={formatMessage({
            id: getTrad('plugin.name'),
            defaultMessage: 'Media Library',
          })}
          subtitle={formatMessage(
            {
              id: getTrad('header.content.assets-multiple'),
              defaultMessage: '0 assets',
            },
            { number: 1000 }
          )}
          primaryAction={
            <Button startIcon={<AddIcon />}>
              {formatMessage({
                id: getTrad('header.actions.upload-assets'),
                defaultMessage: 'Upload new assets',
              })}
            </Button>
          }
        />

        <ActionLayout
          startActions={
            <>
              <BoxWithHeight
                paddingLeft={2}
                paddingRight={2}
                background="neutral0"
                hasRadius
                borderColor="neutral200"
              >
                <BaseCheckbox
                  aria-label={formatMessage({
                    id: getTrad('bulk.select.label'),
                    defaultMessage: 'Select all assets',
                  })}
                />
              </BoxWithHeight>
              <Button variant="tertiary">Filter</Button>
            </>
          }
          endActions={<Search />}
        />

        <ContentLayout>
          <ListView />
        </ContentLayout>
      </Main>
    </Layout>
  );

  // Show a loader while all permissions are being checked
  if (state.isLoading) {
    return <LoadingIndicatorPage />;
  }

  if (state.allowedActions.canMain) {
    return (
      <AppContext.Provider value={state}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} />
        </Switch>
      </AppContext.Provider>
    );
  }

  return <Redirect to="/" />;
};

export default App;
