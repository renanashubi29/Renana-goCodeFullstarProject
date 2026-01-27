//import React from "react";
import { createRoot } from "react-dom/client";

//import { createBrowserRouter,RouterProvider } from "react-router";


//import App from "./App.jsx";
import "./App.css";
//import { SingleProductPage } from "./pages/singleProductPage.jsx";
import { Router } from "./Router.jsx";
import TanstackProvider from "./QueryClientProvider.jsx";


const root = document.getElementById("root");

createRoot(root).render(    <TanstackProvider><Router/> </TanstackProvider> );
