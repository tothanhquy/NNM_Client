import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from './view/login';
import Register from './view/register';
import Staff from './view/staff';
import Guest from './view/guest';

import AdminDashboard from './view/admin/dashboard';
import AdminLayout from './view/admin/layout';
import AdminProductList from './view/admin/product/list';
import AdminProductCreate from './view/admin/product/create';
import AdminProductEdit from './view/admin/product/edit';
import AdminDiscountList from './view/admin/discount/list';
import AdminDiscountCreate from './view/admin/discount/create';
import AdminDiscountEdit from './view/admin/discount/edit';
import AdminTableList from './view/admin/table/list';
import AdminTableCreate from './view/admin/table/create';
import AdminTableEdit from './view/admin/table/edit';
import AdminUserList from './view/admin/user/list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminLayout/>}>
          <Route exact  path="user" >
            <Route index element={<AdminUserList/>} />
          </Route>
          <Route path="discount" >
            <Route path="create" element={<AdminDiscountCreate/>} />
            <Route path="edit/:id" element={<AdminDiscountEdit/>} />
            <Route index element={<AdminDiscountList/>} />
          </Route>
          <Route path="table">
            <Route path="create" element={<AdminTableCreate/>} />
            <Route path="edit/:id" element={<AdminTableEdit/>} />
            <Route index element={<AdminTableList/>} />
          </Route>
          <Route  path="product">
            <Route path="create" element={<AdminProductCreate/>} />
            <Route path="edit/:id" element={<AdminProductEdit/>} />
            <Route index element={<AdminProductList/>} />
          </Route>
          <Route  path="dashboard" element={<AdminDashboard/>} />
          <Route index element={<AdminDashboard/>} />
        </Route>
        <Route path="/staff" element={<Staff/>} />
        <Route index  path="/" element={<Guest/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
