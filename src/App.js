import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { setUser } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import router from "./routing/routes/Routes/Routes";

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  // console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatch(setUser(user?.email));
      }
    });
  }, []);

  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
