import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AllPosts from "./components/pages/AllPosts";
import MyPosts from "./components/pages/MyPosts";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/alerts/Alerts";
import BlogState from "./context/blog/BlogState";
import AlertState from "./context/alert/AlertState";
import CreatePost from "./components/pages/CreatePost";
import AuthContext from "./context/auth/authContext";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <AlertState>
      <BlogState>
        <Router>
          <div className="App">
            {localStorage.token && <Navbar />}
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute path="/all-posts" exact component={AllPosts} />
                <PrivateRoute path="/my-posts" exact component={MyPosts} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/create-new" exact component={CreatePost} />
                <Route path="/" exact>
                  {isAuthenticated ? (
                    <Redirect to="/all-posts" />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </BlogState>
    </AlertState>
  );
}

export default App;
