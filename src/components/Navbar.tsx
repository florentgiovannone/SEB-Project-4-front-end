import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { useState } from "react";

interface NavbarProps {
    user: null | IUser;
    setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    function toggleNavbar() {
        setIsActive(!isActive);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    return (
        <nav
            className="navbar is-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link
                    to="/"
                    className="navbar-item is-size-6 has-text-weight-semibold py-4" // Increase font size and padding
                >
                    Home
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
                        className="navbar-item is-size-6 has-text-weight-semibold py-4" // Increase font size and padding
                    >
                        About us
                    </Link>
                    <Link
                        to="/contactus"
                        className="navbar-item is-size-6 has-text-weight-semibold py-4" // Increase font size and padding
                    >
                        Contact us
                    </Link>
                    <Link
                        to="/stream"
                        className="navbar-item is-size-6 has-text-weight-semibold py-4" // Increase font size and padding
                    >
                        Stream
                    </Link>
                    {user && (
                        <Link
                            to="/post"
                            className="navbar-item is-size-6 has-text-weight-semibold py-4" // Increase font size and padding
                        >
                            Post on stream
                        </Link>
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item py-0 px-3">
                        <div className="buttons py-4">
                            {user ? (
                                <>
                                    <button
                                        onClick={logout}
                                        className="button is-light is-size-6 has-text-weight-semibold "
                                    >
                                        Logout
                                    </button>
                                    <Link
                                        to="/mystream"
                                        className="navbar-item is-size-6 has-text-weight-semibold"
                                    >
                                        My Stream
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="button is-rouge is-light is-size-5 has-text-weight-semibold button-wrapper"
                                    >
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="button is-rouge is-light is-size-5 has-text-weight-semibold button-wrapper"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;