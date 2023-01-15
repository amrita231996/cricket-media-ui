import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
} from "@material-ui/core";
import Logo from '../../../assets/images/header/logo.png';

import './index.scss';

function Navbar() {

    return (
        <AppBar position="static" className="navbarSection">
            <CssBaseline />
            <Toolbar>
                <img src={Logo} alt="CricketMedia" />
                {/* <label className="firstSection_logo_text">Cricket Media</label> */}
                
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;