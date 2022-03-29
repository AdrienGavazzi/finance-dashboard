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

import Dashboard from "./Dashboard";
import Home from "./Home";
import History from "./History";

import "./App.scss";
import "./styles/styles.css";

const useStyles: any = makeStyles({
  drawerPaper: { width: "inherit" },
  link: { textDecoration: "none", color: "#1F1F1F" },
});

function App() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/dashboard":
        setSelectedIndex(1);
        break;
      case "/history":
        setSelectedIndex(2);
        break;

      default:
        break;
    }
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
                selected={selectedIndex === 0}
                onClick={(event) => setSelectedIndex(0)}
                className={selectedIndex === 0 ? "item-selected" : "item"}
              >
                <ListItemIcon>
                  <HomeIcon
                    sx={{ color: selectedIndex === 0 ? "white" : "black" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/dashboard" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => setSelectedIndex(1)}
                className={selectedIndex === 1 ? "item-selected" : "item"}
              >
                <ListItemIcon>
                  <DashboardIcon
                    sx={{ color: selectedIndex === 1 ? "white" : "black" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/history" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => setSelectedIndex(2)}
                className={selectedIndex === 2 ? "item-selected" : "item"}
              >
                <ListItemIcon>
                  <EventIcon
                    sx={{ color: selectedIndex === 2 ? "white" : "black" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"History"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
