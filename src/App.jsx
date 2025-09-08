import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { SearchPage } from "./Pages/SearchPage";
import { ViewPage } from "./Pages/ViewPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUpPage";

const App = ()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/view/:productId" element={<ViewPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signUp" element={<SignUpPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </BrowserRouter>,
    </>
  )
}

export{App}