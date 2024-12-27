import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Layout = React.lazy(() => import("../containers/Layout"));

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={""}>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
