import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Page_post from "./post/Post";
import Page_viwe from "./view/view";
import Page_not_found from "./page_not_found";
function Box_model() {
  let back_ground = location.pathname
  switch (back_ground) {
    case "/post":
      back_ground = "white"
      break;
    case "/put":
      back_ground = "white"
      break;
    case "/home":
      back_ground = "transparent"
      break;
      case "/":
      back_ground = "transparent"
      break;
    default:
      back_ground = "black"
      break;


  }


  return (
    <div className='box-model ' style={{ background: back_ground }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Page_not_found />} />
          <Route path="/react_project/home" element={<Page_viwe />} />
          <Route path="/react_project/post" element={<Page_post />} />
          <Route path="/react_project/put" element={<Page_post />} />
          <Route path="*" element={< Page_not_found />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Box_model