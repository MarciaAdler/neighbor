import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ViewProfile from "./Pages/ViewProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./Pages/Profile";
import Yelp from "./Pages/Yelp";
import AddGroup from "./Pages/AddGroup";
import Group from "./Pages/Group";
import EditGroup from "./Pages/EditGroup";
import ChatPage from "./Pages/ChatPage";
import About from "./Pages/About";
import Resources from "./Pages/Resources";
import AddResource from "./Pages/AddResource";
import AdminDashboard from "./Pages/AdminDashboard";
import "./App.sass";
import { StoreProvider } from "../src/utils/GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/viewprofile" component={ViewProfile} />
            <Route path="/search" component={Yelp} />
            <Route path="/addgroup" component={AddGroup} />
            <Route path="/group" component={Group} />
            <Route path="/editgroup" component={EditGroup} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/about" component={About} />
            <Route path="/resources" component={Resources} />
            <Route path="/addresource" component={AddResource} />
            <Route path="/admindashboard" component={AdminDashboard} />
          </Switch>
        </Router>
      </StoreProvider>
      <Footer />
    </div>
  );
}

export default App;
