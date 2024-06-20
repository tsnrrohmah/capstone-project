import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';
import classes from './Navbar.module.css';
import jasaku from '../assets/jasaku.png';
import { PrimaryButton, SecondaryButton } from './Button';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const [showLogout, setShowLogout] = useState(false);


    const handleToggle = () => {
        setToggle(!toggle);
    };

    const getNavLinkClass = (path) => {
        return location.pathname === path ? classes.active : '';
    };

    const profileImage = user && user.gambar ? `http://localhost:5000/uploads/${user.gambar}` : jasaku;

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <div>
            <div className={classes.navbar}>
                <Link to="/" className={classes.noUnderline}>
                    <div className={classes.navbarIcon}>
                        <img src={jasaku} alt="Icon Jasaku" />
                        <span>JasaKu</span>
                    </div>
                </Link>
                <div className={classes.navbarList}>
                    <Link to="/" className={`${classes.list} ${getNavLinkClass('/')}`}>
                        Home
                    </Link>
                    <Link to="/catalog" className={`${classes.list} ${getNavLinkClass('/catalog')}`}>
                        Layanan
                    </Link>
                    <Link to="/about" className={`${classes.list} ${getNavLinkClass('/about')}`}>
                        About Us
                    </Link>
                </div>
                <div className={classes.navbarButton}>
                    {isLoggedIn ? (
                        <div className={classes.profileSection}>
                        <img
                            src={profileImage}
                            alt="Profile"
                            className={classes.profilePicture}
                            onClick={() => setShowLogout(!showLogout)}
                        />
                        {showLogout && (
                            <button onClick={handleLogout} className={classes.logoutButton}>
                                <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                    ) : (
                        <>
                            <Link to="/signup"><SecondaryButton>Register</SecondaryButton></Link>
                            <Link to="/login"><PrimaryButton>Login</PrimaryButton></Link>
                        </>
                    )}
                </div>
                <div className={classes.toggleButton}>
                    <button onClick={handleToggle}>
                        <FaBars />
                    </button>
                </div>
            </div>

            <div className={classes.navMobile} style={{ display: toggle ? 'block' : 'none' }}>
                <div className={classes.navbarListMobile}>
                    <Link to="/" className={`${classes.listMobile} ${getNavLinkClass('/')}`}>
                        Home
                    </Link>
                    <Link to="/catalog" className={`${classes.listMobile} ${getNavLinkClass('/catalog')}`}>
                        Layanan
                    </Link>
                    <Link to="/about" className={`${classes.listMobile} ${getNavLinkClass('/about')}`}>
                        About Us
                    </Link>
                </div>
                <div className={classes.navbarButtonMobile}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile">
                                <img src={profileImage} alt="Profile" className={classes.profilePicture} />
                            </Link>
                            <button onClick={handleLogout} className={classes.logoutButton}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup"><SecondaryButton>Register</SecondaryButton></Link>
                            <Link to="/login"><PrimaryButton>Login</PrimaryButton></Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
