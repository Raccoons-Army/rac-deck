import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faRobot,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import Link from 'next/link'
import { useEffect } from "react";

export default function SideBar({ isOpen, toggle, connections }) {


  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>Rac Deck 🦝</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <Link href="/connections">
            <NavItem className="nav-link">
              <FontAwesomeIcon icon={faLink} className="mr-2" />
              {' '}Your Connections
            </NavItem>
          </Link>

          {connections.discordAccessToken ?
            <Link href="/changeNameBot" >
              <NavItem className="nav-link">
                <FontAwesomeIcon icon={faRobot} className="mr-2" />
                {' '}Change Name Bot
              </NavItem>
            </Link>
            :
            <></>}


          {connections.twitchAccessToken ?
            <Link href="/rewards">
              <NavItem className="nav-link">
                <FontAwesomeIcon icon={faCoins} className="mr-2" />
                {' '}Reward Manager
              </NavItem>
            </Link>
            :
            <></>
          }

        </Nav>
      </div>
    </div>
  )
}

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];
