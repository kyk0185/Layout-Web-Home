import React from "react";

import "./LoginTemplate.scss";

const LoginTemplate = ({ children }) => {
  return (
    <div>
      <h3>로그인 페이지</h3>
      <div className="login-container">
        <div className="login-content">
          <h3 className="login-header-container">
            <span style={{ color: "rgb(20, 166, 233)" }}>재해복구</span>
            <span style={{ color: "rgb(206, 151, 37)" }}>문서관리솔루션</span>
          </h3>
          <h1
            className="login-header-container"
            style={{
              color: "rgb(255, 255, 255)",
              fontWeight: "bold",
              fontSize: 64,
            }}
          >
            BCPMS
          </h1>
          <div className="login-pannel">
            <div className="login-pannel-body">
              <div className="pannel-body-left">
                <img src="/img/standard_logo.png"></img>
              </div>
              <div className="pannel-body-right">
                <div style={{ width: 253, marginBottom: 20 }}>
                  <div style={{ height: 45 }}>&nbsp;</div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
