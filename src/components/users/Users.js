import React, { useState, useEffect } from "react";
import { userInfo, data } from "../../dummy";
import DataTemplate from "./DataTemplate";
import DataList from "./DataList";

const Users = ({ match }) => {
  const params_role_no = match.params["role_no"];
  const [items, setItems] = useState(data);
  const [role_name, setRole_name] = useState("");
  const [user_code, setUser_code] = useState("");
  const [user_name, setUser_name] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    for (let i = 0; i < userInfo.roles.length; i++) {
      if (userInfo.roles[i].role_no === Number(params_role_no)) {
        setRole_name(userInfo.roles[i].role_name);
        setUser_code(userInfo.roles[i].code);
        setUser_name(userInfo.users[i].user_name);
        setLogo(userInfo.roles[i].logo);
      }
    }
    setInterval(onRefresh, 1000);
  }, []);

  const onRefresh = (_) => {
    const storageData = JSON.parse(window.localStorage.getItem("dummyData"));

    if (storageData !== null && storageData.length > 0) {
      setItems(storageData);
    }
  };
  return (
    <DataTemplate role_name={role_name} logo={logo} user_name={user_name}>
      <DataList datas={items} user_code={user_code} />
    </DataTemplate>
  );
};

export default Users;
