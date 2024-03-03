import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/LoginCred/Login";
import EditProfile from "./components/ProfilePage/Editprofile";
import Page404 from "./components/404Error/404Error";
import UserValid from "./components/usernameValidate/usernameValidation";
import { Analytics } from "@vercel/analytics/react";
import DemoProfile from "./components/ProfilePage/Demoprofile";
import Home from "./components/Dashboard/Home";
import PublicProfile from "./components/publicProfile/PublicProfile";
import { Helmet } from "react-helmet";
import { Validation } from "./components/LoginCred/SignupForm";
import {persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import Settings from "./components/settings/Settings";
import TopPerformers from "./components/Dashboard/TopPerformers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/usernameSearch",
        element: <PublicProfile />,
      },
      {
        path: "usernameSearch/:id",
        element: <Home />,
      },
      {
        path: "profile",
        element: <DemoProfile />,
      },
      {
 
        path: "/top-performers",
        element: <TopPerformers/>
      },
       {
        path:'/settings',
        element:<Settings/>

       }
    ],
    errorElement: <Page404 />,
  },
  {
    path: "/signup",
    children:[
      {
        path:"/signup",
        element: <Login page={false} validateOTP={false}/>,
      },
      {
        path:"/signup/otpverify",
        element: <Login page={false} validateOTP={true}/>
      },
    ],
    errorElement: <Page404 />,
  },
  {
    path: "/login",
    element: <Login page={true} />,
    errorElement: <Page404 />,
  },
  {
    path: "/profile",
    element: <EditProfile />,
    errorElement: <Page404 />,
  },
  {
    path: "/validUsername",
    element: <UserValid />,
    errorElement: <Page404 />,
  },
  {
    path: "/admin-vercel-analytics",
    element: <Analytics />,
    errorElement: <Page404 />,
  },
  {
    path: "/demo",
    element: <DemoProfile />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Helmet>
        <title>Effitrack</title>
        <meta
          name="description"
          content="EffiTrack is a web application that empowers users to effortlessly track and monitor their coding profiles from popular platforms like LeetCode, CodeChef, GitHub, and Codeforces. With a user-friendly dashboard, EffiTrack provides accessibility and insights into coding accomplishments, progress, and achievements across multiple coding platforms."
        />
        <link rel="canonical" href="https://effitrack.vercel.app" />
        <meta property="og:title" content="Effitrack" />
        <meta
          property="og:description"
          content="EffiTrack is a web application that empowers users to effortlessly track and monitor their coding profiles from popular platforms like LeetCode, CodeChef, GitHub, and Codeforces. With a user-friendly dashboard, EffiTrack provides accessibility and insights into coding accomplishments, progress, and achievements across multiple coding platforms."
        />
        <meta
          property="og:image"
          content="https://effitrack.vercel.app/favicon_io/android-chrome-512x512.png"
        />
        <meta property="og:url" content="https://effitrack.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Effitrack" />
        <meta
          name="twitter:description"
          content="EffiTrack is a web application that empowers users to effortlessly track and monitor their coding profiles from popular platforms like LeetCode, CodeChef, GitHub, and Codeforces. With a user-friendly dashboard, EffiTrack provides accessibility and insights into coding accomplishments, progress, and achievements across multiple coding platforms."
        />
        <meta
          name="twitter:image"
          content="https://effitrack.vercel.app/favicon_io/android-chrome-512x512.png"
        />
        <meta
          name="twitter:card"
          content="EffiTrack is a web application that empowers users to effortlessly track and monitor their coding profiles from popular platforms like LeetCode, CodeChef, GitHub, and Codeforces. With a user-friendly dashboard, EffiTrack provides accessibility and insights into coding accomplishments, progress, and achievements across multiple coding platforms."
        />
      </Helmet>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
