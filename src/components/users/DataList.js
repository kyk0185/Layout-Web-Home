import React from "react";
import DataListItem from "./DataListItem";

const DataList = ({ datas, user_code }) => {
  return (
    <>
      {datas
        .filter((item) => item.code === user_code)
        .map((item, index) =>
          item.titles.map((title, titleIndex) => (
            <DataListItem title={title} key={titleIndex} />
          ))
        )}
    </>
  );
};

export default DataList;
