import React, { Component } from "react";
import { userInfo, data } from "../../dummy";
import "./Users.css";
import { Button } from "react-bootstrap";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dummyData: data,
      role_name: "",
      user_code: "",
      user_name: "",
      logo: "",
    };
  }
  componentDidMount = (_) => {
    //기관별 이름, 코드
    for (let i = 0; i < userInfo.roles.length; i++) {
      if (
        userInfo.roles[i].role_no === Number(this.props.match.params["role_no"])
      ) {
        this.setState({
          role_name: userInfo.roles[i].role_name,
          user_code: userInfo.roles[i].code,
          user_name: userInfo.users[i].user_name,
          logo: userInfo.roles[i].logo,
        });
      }
    }
    setInterval(this.onRefresh, 1000);
  };

  componentWillUnmount = (_) => {
    clearInterval(this.onRefresh);
  };

  //1초 씩 변경 값 적용
  onRefresh = (_) => {
    const data = JSON.parse(window.localStorage.getItem("dummyData"));

    if (data !== null && data.length > 0) {
      this.setState({ dummyData: data });
    }
  };
  // 로그아웃
  logOut = (_) => {
    localStorage.clear();
    this.props.history.goBack();
  };
  render() {
    const { dummyData } = this.state;
    return (
      <div className="frame-user">
        <div className="header-user">
          <img
            src={this.state.logo}
            style={{ width: 189, height: 70 }}
            alt={this.state.role_name}
          ></img>
          <div className="columnAlign_header">
            <h5 style={{ fontSize: ".9rem" }}>{this.state.user_name}님</h5>
            <Button
              variant="outline-secondary"
              onClick={this.logOut}
              style={{ marginLeft: 20, fontSize: ".8rem" }}
            >
              로그아웃
            </Button>
          </div>
        </div>
        <div className="container-user">
          {dummyData
            .filter((item) => item.code === this.state.user_code)
            .map((item, index) =>
              item.titles.map((title, titleIndex) => (
                <div
                  className="card-bottom"
                  key={`title-${index}-${titleIndex}`}
                >
                  <h4 className="card-title">{title.name}</h4>
                  <p className="card-info">{title.info}</p>
                  <div className="card-insertDate">
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
              ))
            )}
        </div>
      </div>
    );
  }
}

export default Users;
