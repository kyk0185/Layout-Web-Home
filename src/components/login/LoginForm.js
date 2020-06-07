import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { userInfo } from "../../dummy";
import "./LoginForm.scss";

const LoginForm = ({ history }) => {
  const [form, setForm] = useState({ id: "", password: "" });
  const { id, password } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let i = 0; i < userInfo.users.length; i++) {
      if (id === userInfo.users[i].id) {
        console.log("id체크 성공");
        if (password === userInfo.users[i].pw) {
          alert("로그인 성공하였습니다.");
          if (userInfo.users[i].role_no === 1) {
            history.push("/admin");
          } else {
            //사용자 정보 저장
            localStorage.setItem("userData", JSON.stringify(userInfo.users[i]));
            //사용자 정보 호출
            const data = JSON.parse(window.localStorage.getItem("userData"));
            history.push(`/users/${data.role_no}`);
          }
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="login-input">
        <input
          name="id"
          type="text"
          value={id}
          onChange={onChange}
          placeholder="User ID"
          maxlength="50"
        />
      </div>
      <div className="login-input" style={{ display: "inline-block" }}>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="User Password"
          style={{
            background: "url(/img/icon_pass.png) no-repeat 5% 50%",
          }}
        />
      </div>
      <div className="login-button">
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default withRouter(LoginForm);
