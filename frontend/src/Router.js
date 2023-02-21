import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ToDoList from "./components/ToDoList";
import AuthContext from "./context/AuthContext";

function Router() {
    const { loggedIn } = useContext(AuthContext);
    return <BrowserRouter>
        <Navbar />
        <Switch>
            {loggedIn === true && (
                <Route exact path="/">
                    <div className="app">
                        <div className="toDoContainer">
                            <ToDoList />
                        </div>
                        <ToastContainer />
                    </div>
                </Route>
            )}

            {loggedIn === false && (
                <>
                    <div className="app">
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </div>
                </>
            )}


        </Switch>
    </BrowserRouter>
}


export default Router;