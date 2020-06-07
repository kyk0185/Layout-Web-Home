import React from "react";
import { withRouter } from "react-router-dom";
import "./UsersTemplate.scss";
import { Button } from "react-bootstrap";

const UsersTemplate = ({ role_name, logo, user_name, children, history }) => {
  const logOut = (_) => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="frame-user">
      <div className="header-user">
        <img
          src={logo}
          style={{ width: 189, height: 70 }}
          alt={role_name}
        ></img>
        <div className="columnAlign_header">
          <h5 style={{ fontSize: ".9rem", marginTop: 6 }}>{user_name}님</h5>
          <Button
            variant="outline-secondary"
            onClick={logOut}
            style={{ marginLeft: 20, fontSize: ".8rem" }}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <div className="container-user">{children}</div>
    </div>
  );
};

export default withRouter(UsersTemplate);
