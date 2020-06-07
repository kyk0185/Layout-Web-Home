import React from "react";
import "./DataListItem.scss";

const DataListItem = ({ title }) => {
  return (
    <div className="card-bottom" key={`title-${title.key}`}>
      <h4>{title.name}</h4>
      <p className="card-info">{title.info}</p>
      <div className="card-version-date">
        <p>{title.version}</p>
        <p>{title.date}</p>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "right",
          marginLeft: 7.5,
        }}
      >
        <a
          download={title.fileName}
          href={title.fileUrl}
          style={title.fileName ? {} : { display: "none" }}
        >
          조회
        </a>
      </div>
    </div>
  );
};

export default DataListItem;
