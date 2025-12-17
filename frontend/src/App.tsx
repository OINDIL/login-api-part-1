import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./components/blocks/SignUp"
import Root from "./components/blocks/Root"
import Feed from "./components/blocks/Feed"
import SignIn from "./components/blocks/SignIn"
import VerifyEmail from "./components/blocks/VerifyEmail"
import Profile from "./components/blocks/Profile"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

      children: [
        {
          path: "/",
          element: <div>This is a very secure page</div>
        },
        {
          path: "/feed",
          element: <Feed />
        },
        {
          path: "/sign-up",
          element: <SignUp />
        },
        {
          path: "/sign-in",
          element: <SignIn />
        },
        {
          path: "/verify-account",
          element: <VerifyEmail />
        },
        {
          path: "/profile",
          element: <Profile />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App