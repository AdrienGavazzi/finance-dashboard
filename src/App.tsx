import React, { useEffect } from "react";
import "hammerjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";

import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Dashboard";
import Home from "./Home";
import History from "./History";

import "./App.scss";
import "./styles/styles.css";
import Login from "./panels/Login";

const useStyles: any = makeStyles({
  drawerPaper: { width: "inherit" },
  link: { textDecoration: "none", color: "#1F1F1F" },
});

function App() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState<string>("/home");

  useEffect(() => {
    setSelectedIndex(window.location.pathname);
  }, []);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Drawer
          style={{ width: "240px", padding: "1px" }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List style={{ marginTop: "70px" }}>
            <Link to="/" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === "/"}
                onClick={(event) => setSelectedIndex("/")}
                className={selectedIndex === "/" ? "item-selected" : "item"}
              >
                <ListItemIcon>
                  <HomeIcon
                    sx={{ color: selectedIndex === "/" ? "white" : "black" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/dashboard" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === "/dashboard"}
                onClick={(event) => setSelectedIndex("/dashboard")}
                className={
                  selectedIndex === "/dashboard" ? "item-selected" : "item"
                }
              >
                <ListItemIcon>
                  <DashboardIcon
                    sx={{
                      color: selectedIndex === "/dashboard" ? "white" : "black",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/history" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === "/history"}
                onClick={(event) => setSelectedIndex("/history")}
                className={
                  selectedIndex === "/history" ? "item-selected" : "item"
                }
              >
                <ListItemIcon>
                  <EventIcon
                    sx={{
                      color: selectedIndex === "/history" ? "white" : "black",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={"History"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
