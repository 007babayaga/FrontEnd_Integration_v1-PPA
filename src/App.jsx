import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { SearchPage } from "./Pages/SearchPage";
import { ViewPage } from "./Pages/ViewPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { Apploader } from "./Components/Apploader";
import { AppContextProvider, useAuthContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import { BasicLayout } from "./Pages/BasicLayout";
import { CatergoryPage } from "./Pages/CatergoryPage";
import { UserInfoPage } from "./Pages/UserInfoPage";
import { CartPage } from "./Pages/CartPage";


const AppRoutes = () => {
  const { appLoading, isLoggedIn } = useAuthContext();

  if (appLoading) {
    return <Apploader />;
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:slug" element={<CatergoryPage />} />
          <Route path="/view/:productId" element={<ViewPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:slug" element={<CatergoryPage />} />
        <Route path="/view/:productId" element={<ViewPage />} />
        <Route path="/user" element={<UserInfoPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export { App };