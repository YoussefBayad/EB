import React from 'react';
import { Switch, Route } from 'react-router-dom';

// layout
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout.js';
import HomeLayout from './layouts/HomeLayout.js';

// pages
import HomePage from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Shop from './pages/Shop';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import Earbuds from './pages/Earbuds';
import Wireless from './pages/Earbuds/Wireless';
import Wired from './pages/Earbuds/Wired';
import Headphones from './pages/Headphones';
import Battery from './pages/Battery';
import ProductPage from './pages/ProductPage';
import NoMatch from './pages/404/NoMatch.js';

// HOC
import WithAdminAuth from './hoc/withAdminAuth.js';
import WithAuth from './hoc/withAuth';

// style
import './default.scss';
import useAuthListener from './hooks/useAuthListener';

const App = () => {
  useAuthListener();

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => (
          <HomeLayout>
            <HomePage />
          </HomeLayout>
        )}
      />

      <Route
        exact
        path='/admin'
        render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )}
      />
      <Route
        exact
        path='/shop/product/:id'
        render={() => (
          <HomeLayout>
            <ProductPage />
          </HomeLayout>
        )}
      />

      <Route
        exact
        path='/shop'
        render={() => (
          <MainLayout>
            <Shop />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/login'
        render={() => (
          <WithAuth>
            <MainLayout>
              <Login />
            </MainLayout>
          </WithAuth>
        )}
      />
      <Route
        exact
        path='/registration'
        render={() => (
          <WithAuth>
            <MainLayout>
              <Registration />
            </MainLayout>
          </WithAuth>
        )}
      />
      <Route
        exact
        path='/shop/headphones'
        render={() => (
          <MainLayout>
            <Headphones />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/shop/earbuds'
        render={() => (
          <MainLayout>
            <Earbuds />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/shop/earbuds/wireless'
        render={() => (
          <MainLayout>
            <Wireless />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/shop/earbuds/wired'
        render={() => (
          <MainLayout>
            <Wired />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/shop/batteries'
        render={() => (
          <MainLayout>
            <Battery />
          </MainLayout>
        )}
      />
      <Route
        exact
        path='/payment'
        render={() => (
          <MainLayout>
            <Payment />
          </MainLayout>
        )}
      />
      <Route
        path='*'
        render={() => (
          <MainLayout>
            <NoMatch />
          </MainLayout>
        )}
      />
    </Switch>
  );
};

export default App;
