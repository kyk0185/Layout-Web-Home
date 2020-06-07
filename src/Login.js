import React, { Component } from 'react';
import { userInfo } from './dummy';
import './Login.css';

class Login extends Component {
    constructor(props) {
        console.log(props);
        super(props)
        this.state = {
            id: "",
            password: ""
        }
        this.handleChange = this.handleChangeId.bind(this);
        this.handleChange = this.handleChangePwd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeId = (event) => {
        this.setState({ id: event.target.value });
    }
    handleChangePwd = (event) => {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        for (let i = 0; i < userInfo.users.length; i++) {
            if (this.state.id === userInfo.users[i].id) {
                console.log('id체크 성공');
                if (this.state.password === userInfo.users[i].pw) {
                    alert('로그인 성공하였습니다.');
                    if (userInfo.users[i].role_no === 1) {
                        this.props.history.push('/admin');
                    } else {
                        //사용자 정보 저장
                        localStorage.setItem('userData', JSON.stringify(userInfo.users[i]));
                        //사용자 정보 호출
                        const data = JSON.parse(window.localStorage.getItem('userData'));

                        this.props.history.push(`/users/${data.role_no}`);
                    }
                }
            }
        }
    }
    render() {
        return (
            <div>
                <h3>로그인 페이지</h3>
                <div className="login-container">
                    <div className="login-content">
                        <h3 className="login-header-container">
                            <span style={{ color: "rgb(20, 166, 233)" }}>재해복구</span>
                            <span style={{ color: "rgb(206, 151, 37)" }}>문서관리솔루션</span>
                        </h3>
                        <h1 className="login-header-container" style={{ color: "rgb(255, 255, 255)", fontWeight: "bold", fontSize: 64 }}>BCPMS</h1>
                        <div className="login-pannel">
                            <div className="login-pannel-body">
                                <div className="pannel-body-left">
                                    <img src="/img/standard_logo.png"></img>
                                </div>
                                <div className="pannel-body-right">
                                    <div style={{ width: 253, marginBottom: 20 }}>
                                        <div style={{ height: 45 }}>&nbsp;</div>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="login-input">
                                                <input type="text" value={this.state.id} onChange={this.handleChangeId} placeholder="User ID" maxlength="50" />
                                            </div>
                                            <div className="login-input" style={{ display: "inline-block" }}>
                                                <input type="password" value={this.state.password} onChange={this.handleChangePwd} placeholder="User Password" style={{ background: "url(/img/icon_pass.png) no-repeat 5% 50%" }} />
                                            </div>
                                            <div className="login-button">
                                                <input type="submit" value="Login" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;




