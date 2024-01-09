import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink, useNavigate, } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap";
import userContext from "../context/userContext";
import { doLogout,getCurrentUserDetails,isLoggedIn } from "../auth/authtoken";

const CustomNavbar = () => {
    let navigate = useNavigate()
    const userContextData = useContext(userContext)
    const [isOpen, setIsOpen] = useState(false)
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetails())

    }, [login])


    
const logout = () => {
console.log("hello");

        doLogout(() => {
            //logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })

            navigate("/")
        })
           //navigate("/")
          window.location.href = "http://localhost:3000/";

    }

    return (
        <div >
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed=""
                className="px-5"
            >
                <NavbarBrand tag={ReactLink} to="/">
                    MyBlogs
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >

                        <NavItem>
                            <NavLink tag={ReactLink} to="/" >
                                New Feed
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about" >
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services" >
                                Services
                            </NavLink>
                        </NavItem>



                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/services">
                                    Contact Us
                                </DropdownItem>
                                <DropdownItem>
                                    Facebook
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Youtube
                                </DropdownItem>
                                <DropdownItem>
                                    Instagram
                                </DropdownItem>
                                <DropdownItem>
                                    LinkedIn
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>


                    <Nav navbar>

                        {
                            login && (

                                <>


                                    <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
                                            Profile Info
                                        </NavLink>
                                    </NavItem>



                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard" >
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={ReactLink} onClick={logout} >
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>



                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login" >
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup" >
                                            Signup
                                        </NavLink>
                                    </NavItem>


                                </>
                            )
                        }

                    </Nav>





                </Collapse>
            </Navbar>
        </div>

    )
}

export default CustomNavbar;