import React from 'react'
import { AppBar, Tabs, Tab, Toolbar } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';


const linksArr = ["home", "diaries", "authentication"];
const loggedInLinks = ["home", "diaries", "add", "profile"];


const Header = () => {

    const { isLoggedIn } = useSelector((state) => state.loginReducer);
    const tabNo = useSelector((state) => {
        return state.tabReducer.tabNo;
    })

    const dispatch = useDispatch();

    return (
        <AppBar sx={{ bgcolor:"white",position: "sticky", height: "8vh",}}>
            <Toolbar>
                <TravelExploreIcon sx={{ color: "black" }} />
                <Tabs
                    value={tabNo}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                    sx={{ textDecoration: "none", color: "Black", ml:"auto"}}
                    onChange={(e, value) => {
                        dispatch({
                            type: "changeTabNo",
                            payload: value,
                        })
                    }}
                    className="responsive-header"
                    
                >
                    {
                        isLoggedIn ?
                            loggedInLinks.map((link) => {
                                return <Tab key={link} label={link} LinkComponent={Link} to={`/${link}`} sx={{
                                    color: "black", textDecoration: "none", ":hover": {
                                        textDecoration: "underline blue",
                                        textUnderlineOffset: "19px",
                                    }
                                }} />;
                            })
                            : linksArr.map((link) => {
                                return <Tab key={link} label={link} LinkComponent={Link} to={`/${link}`} sx={{
                                    color: "black", textDecoration: "none", ":hover": {
                                        textDecoration: "underline blue",
                                        textUnderlineOffset: "19px",
                                    }
                                }} />;
                            })
                    }
                </Tabs>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
