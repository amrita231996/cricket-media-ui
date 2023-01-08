import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



import './index.scss';
import { clearStorage, getStorageItem } from '../../utils/sessionStorage';

const HeaderMenu = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        const accessToken = getStorageItem('access-token');
        const refreshToken = getStorageItem('refresh-token');
        var logOutOptions = {
            method: 'post',
            url: global.config.ROOTURL.prod + '/api/v0/logout/',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            data: {'refresh_token': refreshToken}
        };
        axios(logOutOptions)
            .then(response => {
                localStorage.removeItem('access-token');
                localStorage.removeItem('refresh-token');
                window.localStorage.clear();
                navigate('/login');

            })
            .catch(error => {
                if (error?.response?.status == 401) { 
                    clearStorage()
                    navigate('/login'); }
            })
    };


    return <div className="header-menu">
          
    <nav>
      <div className="navbar">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="menu-items">
                    <li>
                        <NavLink to='/feed' className={isActive => `nav-link ${isActive?'active':''}`}>
                                    Feed
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/news' className={isActive => `nav-link ${isActive?'active':''}`}>
                                News
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to='/deals' className={isActive => `nav-link ${isActive?'active':''}`}>
                                Deals
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/support' className={isActive => `nav-link ${isActive?'active':''}`}>
                                I Support
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to='/about-us' className={isActive => `nav-link ${isActive?'active':''}`}>
                                    About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog' className={isActive => `nav-link ${isActive?'active':''}`}>
                                    Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-profile' className={isActive => `nav-link ${isActive?'active':''}`}>
                                    My Profile
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={() => {handleLogout()}} className={"nav-link"}>
                            Log out
                        </a>
                    </li>
            </div>
        </div>
      </div>
    </nav>
    </div>
}

export default HeaderMenu;