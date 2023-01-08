import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from '../../../assets/images/header/logo.png';
// "../../assets/images/header/logo.png";

import './index.scss';

const useStyles = makeStyles((theme) => ({
    navlinks: {
        // marginLeft: theme.spacing(70),
        marginLeft: "auto",
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        marginLeft: theme.spacing(10),
        // fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "22px",
        /* identical to box height */

        textAlign: "right",
        textTransform: "uppercase",

        color: "#6B6B6B"

    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static" className="navbarSection">
            <CssBaseline />
            <Toolbar>
                <img src={Logo} alt="Champhunt" />
                <label className="firstSection_logo_text">ChampHunt</label>
                {/* <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}>
                        ABOUT US
                    </Link>
                    <Link to="/" className={classes.link}>
                        PARTNER WITH US
                    </Link>
                    <Link to="/" className={classes.link}>
                        CONTACT US
                    </Link>
                </div> */}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;