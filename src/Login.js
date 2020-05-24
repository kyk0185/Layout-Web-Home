import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userInfo } from './dummy';
import './Admin.css';

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
                <div className="loginBody">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            id:
                        <input type="text" value={this.state.id} onChange={this.handleChangeId} />
                        </label>
                        <label>
                            password:
                        <input type="text" value={this.state.password} onChange={this.handleChangePwd} />
                        </label>
                        <input type="submit" value="로그인" />
                    </form>
                </div>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        delData: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updtDelData: (delData) => dispatch({ type: 'SELECT_YN', delData: delData })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




