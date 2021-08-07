import React from 'react';
import { Switch, Route } from 'react-router-dom';

// layout
// import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout.js';
import HomeLayout from './layouts/HomeLayout.js';

// pages
import HomePage from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Shop from './pages/Shop';
import Payment from './pages/Payment';
// import Admin from './pages/Admin';
import Earbuds from './pages/Earbuds';
import Wireless from './pages/Earbuds/Wireless';
import Wired from './pages/Earbuds/Wired';
import Headphones from './pages/Headphones';
import Battery from './pages/Battery';
import ProductDetails from './pages/ProductDetails';
import NoMatch from './pages/error/NoMatch.js';

// HOC
// import WithAdminAuth from './hoc/withAdminAuth.js';
import WithAuth from './hoc/withAuth';
import WithNoAuth from './hoc/withNoAuth';

// style
import './default.scss';
import ScrollToTop from './hoc/ScrollToTop.js';

const App = () => {
  return (
    <ScrollToTop>
      <Switch>
        <Route exact path='/'>
          <HomeLayout>
            <HomePage />
          </HomeLayout>
        </Route>

        {/* <Route
        exact
        path='/admin'
        render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )}
      /> */}
        <Route exact path='/shop/product/:id'>
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        </Route>

        <Route exact path='/shop'>
          <MainLayout>
            <Shop />
          </MainLayout>
        </Route>
        <WithNoAuth exact path='/login'>
          <MainLayout>
            <Login />
          </MainLayout>
        </WithNoAuth>
        <WithNoAuth exact path='/registration'>
          <MainLayout>
            <Registration />
          </MainLayout>
        </WithNoAuth>
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
        <Route path='*'>
          <MainLayout>
            <NoMatch />
          </MainLayout>
        </Route>
      </Switch>
    </ScrollToTop>
  );
};

export default App;
