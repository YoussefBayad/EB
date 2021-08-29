import React from 'react';
import { Switch, Route } from 'react-router-dom';

// layout
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout.js';
import HomeLayout from './layouts/HomeLayout.js';

// pages
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Payment from './pages/Payment';
import Order from './pages/Order';
import OrderById from './pages/OrderById';
import Admin from './pages/Admin';
import AdminUsers from './pages/Admin/users';
import AdminOrders from './pages/Admin/orders';
import Earbuds from './pages/Earbuds';
import Wireless from './pages/Earbuds/Wireless';
import Wired from './pages/Earbuds/Wired';
import Headphones from './pages/Headphones';
import Battery from './pages/Battery';
import Product from './pages/Product';
import CartPage from './pages/Cart';
import NoMatch from './pages/error/NoMatch.js';

// HOC
import WithAdminAuth from './hoc/withAdminAuth.js';
import WithAuth from './hoc/withAuth';
import WithNoAuth from './hoc/withNoAuth';

// style
import './default.scss';
import ScrollToTop from './hoc/ScrollToTop.js';
import AdminToolBar from './features/admin/AdminToolBar/index.js';
import Shipping from './pages/Shipping';

const App = () => {
  return (
    <ScrollToTop>
      <AdminToolBar />
      <Switch>
        <Route exact path='/'>
          <HomeLayout>
            <HomePage />
          </HomeLayout>
        </Route>

        <WithAdminAuth exact path='/admin'>
          <AdminLayout>
            <Admin />
          </AdminLayout>
        </WithAdminAuth>

        <WithAdminAuth exact path='/admin/users'>
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        </WithAdminAuth>

        <WithAdminAuth exact path='/admin/orders'>
          <AdminLayout>
            <AdminOrders />
          </AdminLayout>
        </WithAdminAuth>

        <WithNoAuth exact path='/login'>
          <MainLayout>
            <Login />
          </MainLayout>
        </WithNoAuth>

        <WithNoAuth exact path='/register'>
          <MainLayout>
            <Register />
          </MainLayout>
        </WithNoAuth>

        <Route exact path='/shop'>
          <MainLayout>
            <Shop />
          </MainLayout>
        </Route>

        <Route exact path='/search/:keyword'>
          <MainLayout>
            <Shop />
          </MainLayout>
        </Route>

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
          path='/shop/batteries'
          render={() => (
            <MainLayout>
              <Battery />
            </MainLayout>
          )}
        />

        <Route exact path='/shop/product/:id'>
          <MainLayout>
            <Product />
          </MainLayout>
        </Route>

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

        <Route path='/cart'>
          <MainLayout>
            <CartPage />
          </MainLayout>
        </Route>

        <WithAuth exact path='/Shipping'>
          <MainLayout>
            <Shipping />
          </MainLayout>
        </WithAuth>

        <WithAuth exact path='/payment'>
          <MainLayout>
            <Payment />
          </MainLayout>
        </WithAuth>

        <WithAuth exact path='/order'>
          <MainLayout>
            <Order />
          </MainLayout>
        </WithAuth>

        <WithAuth exact path='/order/:id'>
          <MainLayout>
            <OrderById />
          </MainLayout>
        </WithAuth>

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
