import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User";

import config from "../config";
import OrderHis from "../pages/OrderHis";
import OrderDetail from "../pages/OrderDetail";

const publicsRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.product, component: Product },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.user, component: User },
    { path: config.routes.orderHis, component: OrderHis },
    { path: config.routes.orderDetail, component: OrderDetail },
];

export { publicsRoutes };
