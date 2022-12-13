import React, {useState} from "react"
import {Link, Route} from 'react-router-dom'
import UserRegister from "./User/UserRegister"
import UserLogin from "./User/UserLogin"
import PrivateRoute from "./PrivateRoute"
import UserProfile from "./User/UserProfile"
import Setting from "./Settings/Setting"
import Home from "./Home/Home"
import Print from "./Home/Print"

const NavBar = (props) => {
    const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')))

    const toggle = () => {
        setLoggedIn(!loggedIn)
    }
    return (
        <div>
            {
                loggedIn ? (
                <div className="navigation"><br/>
                    <nav className="navbar navbar-inverse bg-success text-white">
                        <div className="navbar-header">
                            <Link to="/home" className="navbar-brand  text-white">Home</Link>
                            <Link to="/setting" className="navbar-brand  text-white">Setting</Link>
                            <Link to="/user/profile" className="navbar-brand  text-white">Profile</Link>
                            <Link to="/print" className="navbar-brand  text-white" style={{position:'absolute', right:'80px', top:'4px'}}>Print</Link>
                            <Link to="/user/login" onClick={() => {
                                return (localStorage.removeItem('token'),
                                toggle())
                            }} className="navbar-brand  text-white" style={{position:'absolute', right:'0px', top:'4px'}}>Logout</Link>
                        </div>
                    </nav>
                </div> ) : (
                <div className="navigation">
                    <h1 className="text-primary text-center">Expenseeve Budget</h1><br/>
                    <nav className="navbar navbar-inverse bg-success text-white">
                        <div className="container-fluid">
                            <div className="navbar-header">
                            <Link to="/user/register" className="navbar-brand  text-white">Register</Link> 
                            <Link to="/user/login" className="navbar-brand  text-white">Login</Link> 
                            </div>
                        </div>
                    </nav>
                </div>
                )
            }
            <Route path="/user/register" component={UserRegister} exact/>
            <Route path="/user/login" render={(props) => {
                return <UserLogin {...props} toggle={toggle} />
            }} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/setting" component={Setting} />
            <PrivateRoute path="/user/profile" component={UserProfile} />
            <PrivateRoute path="/print" component={Print} />
        </div>
    )
}

export default NavBar