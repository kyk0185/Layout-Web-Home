import React from "react";
import UsersListItem from "./UsersListItem";

const UsersList = ({ datas, user_code }) => {
  return (
    <>
      {datas
        .filter((item) => item.code === user_code)
        .map((item, index) =>
          item.titles.map((title, titleIndex) => (
            <UsersListItem title={title} key={titleIndex} />
          ))
        )}
    </>
  );
};

export default UsersList;
