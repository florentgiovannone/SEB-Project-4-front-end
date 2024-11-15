import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { useState } from "react";
import logo from "../assets/images/Logo.png"
import inverted from "../assets/images/Logo_inverted.png"
interface NavbarProps {
    user: null | IUser;
    setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState(logo);

    function handleMouseEnter(imagePath: any) {
        return () => {
            setImage(imagePath);
        };
    }



    function toggleNavbar() {
        setIsActive(!isActive);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);

    }

    return (
        <nav
            className="navbar has-background-black"
            role="navigation"
            aria-label="main navigation "
        >
            <div className="navbar-brand "
                onMouseEnter={handleMouseEnter(inverted)}
                onMouseLeave={handleMouseEnter(logo)}>
                <Link to="/" className="navbar-item m-0 p-4">
                    <figure className="image" >
                        <img
                            className="p-0 imgNav"
                            src={image}
                            alt="Logo"
                            style={{ width: "70px", height: "70px" }}
                        />
                    </figure>
                </Link>

                <a
                    role="button"
                    className={`navbar-burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleNavbar}
                    style={{ padding: "1rem" }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                <div className="navbar-start" >
                    <Link
                        to="/aboutus"
                        className="navbar-item is-size-6 has-text-weight-semibold py-4 has-text-green " // Increase font size and padding
                    >
                        About us
                    </Link>
                    <Link
                        to="/contactus"
                        className="navbar-item is-size-6 has-text-weight-semibold py-4 has-text-green" // Increase font size and padding
                    >
                        Contact us
                    </Link>
                    <Link
                        to="/stream"
                        className="navbar-item is-size-6 has-text-weight-semibold py-4 has-text-green" // Increase font size and padding
                    >
                        Stream
                    </Link>
                </div>

                <div className="navbar-end">

                    {user ? (
                        <>
                            <Link
                                to={"/"}
                                onClick={logout}
                                className="navbar-item is-light is-size-6 has-text-weight-semibold has-text-green"
                            >
                                Logout
                            </Link>
                            <Link
                                to="/mystream"
                                className="navbar-item is-size-6 has-text-weight-semibold has-text-green"
                            >
                                My Stream
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signup"
                                className="  navbar-item is-light is-size-5 has-text-weight-semibold button-wrapper has-text-green"
                            >
                                <strong>Sign up</strong>
                            </Link>
                            <Link
                                to="/login"
                                className=" navbar-item is-light is-size-5 has-text-weight-semibold button-wrapper has-text-green"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>

        </nav>
    );
}

export default Navbar;