import { createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import WishList from "../Pages/WishList/WishList";
import BookPage from "../Pages/BookPage/BookPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/wishlist",
                element: <WishList/>,
            },
            {
                path: "/book-page/:id", // Notice the ":id" here
                element: <BookPage />,
            }

        ]
    },
]);
export default router