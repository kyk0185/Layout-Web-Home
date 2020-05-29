import React, { Component } from 'react';
import { userInfo, data } from './dummy';
import './HtmlLayout.css';
import { Button } from 'react-bootstrap';

class HtmlLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dummyData: data,
            role_name: '',
            user_code: '',
            user_name: ''
        }
    }
    componentDidMount = _ => {

        //기관별 이름, 코드
        for (let i = 0; i < userInfo.roles.length; i++) {
            if (userInfo.roles[i].role_no === Number(this.props.match.params['role_no'])) {
                this.setState({ role_name: userInfo.roles[i].role_name, user_code: userInfo.roles[i].code ,user_name:userInfo.users[i].user_name})
            }
        }
        setInterval(this.onRefresh, 1000);
    }

    componentWillUnmount = _ => {
        clearInterval(this.onRefresh);
    }

    //1초 씩 변경 값 적용 
    onRefresh = _ => {
        const data = JSON.parse(window.localStorage.getItem('dummyData'));

        if (data !== null && data.length > 0) {
            this.setState({ dummyData: data })
        }
    }
    // 로그아웃
    logOut = _ => {
        localStorage.clear();
        this.props.history.goBack();
    }
    // 파일업로드
    fileUpload = e => {
        //let files = e.target.files;
        //this.setState({ fileName: files[0].name });
    }
    render() {
        const { dummyData } = this.state;
        return (
            <div className="frame-user">
                <div className="header-user" >
                    <h2>{this.state.role_name}</h2>
                    <div className="columnAlign_header">
                        <h5>{this.state.user_name}님</h5>
                        <Button variant="outline-secondary" onClick={this.logOut} style={{marginLeft:20}}>로그아웃</Button>
                    </div>
                </div>
                <div className="container-user">
                    {dummyData.filter(item => item.code === this.state.user_code).map((item, index) => (
                        item.titles.map((title, titleIndex) => (
                            <div className="card-bottom" key={`title-${index}-${titleIndex}`} style={{margin:10}}>
                                <h4 className="card-title">{title.name}</h4>
                                <p className="card-info">{title.fileInfo}</p>
                                <div className="button-layout filebox">
                                    <label htmlFor="ex_file" style={title.fileName ? {} : { display: 'none' }}>조회</label>
                                    <input type="file" id="ex_file" onChange={e => this.fileUpload(e)} />
                                </div>
                            </div>
                        ))
                    ))}
                   
                </div>
                <div className="footer-user" />
            </div>
        );
    }

}

export default HtmlLayout;
