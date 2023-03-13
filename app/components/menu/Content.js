import classNames from "classnames";
import { Container } from "reactstrap";

import Topbar from "./Topbar";

const Content = ({ children, sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />

    {children}
  </Container>
);

export default Content;
