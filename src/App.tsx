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
  ListItemButton,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Dashboard";
import Home from "./Home";
import History from "./History";

import "./App.scss";
import "./styles/styles.css";
import Login from "./panels/Login";
import { element } from "prop-types";
import EtfPanel from "./panels/Components/details/EtfPanel";
import ActionPanel from "./panels/Components/details/ActionPanel";
import CryptoPanel from "./panels/Components/details/CryptoPanel";

const useStyles: any = makeStyles({
  drawerPaper: { width: "inherit" },
  link: { textDecoration: "none", color: "#1F1F1F" },
});

function App() {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState<string>("/home");
  const [open, setOpen] = React.useState<boolean>(true);

  const detailslist: { id: string; name: string; icon: any; component: any }[] =
    [
      {
        id: "etf",
        name: "Etf",
        icon: (
          <ShoppingBasketIcon
            sx={{
              color: selectedIndex === "/details/etf" ? "white" : "black",
            }}
          />
        ),
        component: <EtfPanel />,
      },
      {
        id: "action",
        name: "Action",
        icon: (
          <AccountBalanceIcon
            sx={{
              color: selectedIndex === "/details/action" ? "white" : "black",
            }}
          />
        ),
        component: <ActionPanel />,
      },
      {
        id: "crypto",
        name: "Crypto",
        icon: (
          <CurrencyBitcoinIcon
            sx={{
              color: selectedIndex === "/details/crypto" ? "white" : "black",
            }}
          />
        ),
        component: <CryptoPanel />,
      },
    ];

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
            <ListItemButton
              style={{
                padding: "5px 15px",
                margin: "0px 10px",
                borderRadius: "5px",
              }}
              onClick={() => setOpen(!open)}
            >
              <ListItemText primary="Details" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {detailslist.map((element: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      to={"/details/" + element.id}
                      className={classes.link}
                    >
                      <ListItem
                        button
                        sx={{ pl: 4 }}
                        selected={selectedIndex === "/details/" + element.id}
                        onClick={() =>
                          setSelectedIndex("/details/" + element.id)
                        }
                        className={
                          selectedIndex === "/details/" + element.id
                            ? "item-selected"
                            : "item"
                        }
                      >
                        <ListItemIcon>{element.icon}</ListItemIcon>
                        <ListItemText primary={element.name} />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            {detailslist.map((element: any, index: number) => {
              return (
                <Route
                  key={index}
                  path={"/details/" + element.id}
                  element={element.component}
                />
              );
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
