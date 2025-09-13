import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { SearchPage } from "./Pages/SearchPage";
import { ViewPage } from "./Pages/ViewPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { useState } from "react";

const App = ()=>{
  const[user,setUser] = useState({isLoggedIn:false})

  const{isLoggedIn} = user;

  if(!isLoggedIn){
    return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage setUser={setUser}/>} />
      <Route path="/signUp" element={<SignUpPage/>} />
      <Route path="*" element={<NotFoundPage user={user}/>} />
    </Routes>
    </BrowserRouter>
  )}

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/view/:productId" element={<ViewPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </BrowserRouter>,
    </>
  )
}

export{App}