import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from './view/login';
import Register from './view/register';
import Staff from './view/staff';
import Guest from './view/guest';

import AdminDashboard from './view/admin/dashboard';
import AdminLayout from './view/admin/layout';
import AdminProductList from './view/admin/product/list';
import AdminProductCreate from './view/admin/product/create';
import AdminProductEdit from './view/admin/product/create';

const NoneOutlet =function(){
  return (
      <Outlet />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminLayout/>}>
          {/* <Route exact  path="/user" element={} /> */}
            {/* <Route path="/discount" element={<Discount/>} /> */}
            {/* <Route path="/table" element={<Table/>} /> */}
            <Route  path="product">
              <Route path="create" element={<AdminProductCreate/>} />
              <Route path="edit" element={<AdminProductEdit/>} />
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
