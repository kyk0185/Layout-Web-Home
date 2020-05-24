import React, { Component } from 'react';
import { userInfo, data } from './dummy';
import './HtmlLayout.css';

class HtmlLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dummyData: data,
            role_name: '',
            user_code: ''
        }
    }

    componentDidMount = _ => {

        //기관별 이름, 코드
        for (let i = 0; i < userInfo.roles.length; i++) {
            if (userInfo.roles[i].role_no === Number(this.props.match.params['role_no'])) {
                this.setState({ role_name: userInfo.roles[i].role_name, user_code: userInfo.roles[i].code })
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
            <div className="frame">
                <div className="header" >
                    <h2>{this.state.role_name}</h2>
                    <div className="columnAlign_header">
                        <button className="cover" onClick={this.logOut}>
                            로그아웃
                        </button>
                    </div>
                </div>
                <div className="container">
                    <div className="content1">
                        <a href="open#" className="section1 greens"></a>
                        <div className="section1 greens" />
                        <div className="section1 blueviolets" />
                        <div className="section1 blueviolets" />
                        <div className="section1 blueviolets" />
                    </div>
                    <div className="content2">
                        <div className="section2">
                            <div className="section2_1 greens" />
                            <div className="section2_2 blueviolets" >
                                <div className="filebox columnAlign">
                                    <label htmlFor="ex_file">파일 업로드</label>
                                    <input type="file" id="ex_file" onChange={e => this.fileUpload(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="section2">
                            <div className="section2_1 greens" >
                                <h3>Title</h3>
                            </div>
                            <div className="section2_2 blueviolets " >
                                <div className="columnAlign">
                                    <a href="#open" className="cover">button</a>
                                </div>
                                <div id="open" className="modal">
                                    <div className="window">
                                        <div className="window-header">
                                            <h2>Title</h2>
                                        </div>
                                        <div className="window-contents">
                                            <p>Contents</p>
                                            <div className="window-contents-button">
                                                <a href="#close" className="button">확인</a>
                                                <a href="#close" className="button line">취소</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section2">
                            <div className="section2_1 blueviolets" >
                                <h3>Title</h3>
                            </div>
                            <div className="section2_2 greens" >
                                <div className="columnAlign">
                                    <a href="#open" className="cover">button</a>
                                </div>
                                <div id="open" className="modal">
                                    <div className="window">
                                        <div className="window-header">
                                            <h2>Title</h2>
                                        </div>
                                        <div className="window-contents">
                                            <p>Contents</p>
                                            <div className="window-contents-button">
                                                <a href="#close" className="button">확인</a>
                                                <a href="#close" className="button line">취소</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section2">
                            <div className="section2_1 blueviolets" >
                                <h3>Title</h3>
                            </div>
                            <div className="section2_2 greens" >
                                <div className="columnAlign">
                                    <a href="#open" className="cover">button</a>
                                </div>
                                <div id="open" className="modal">
                                    <div className="window">
                                        <div className="window-header">
                                            <h2>Title</h2>
                                        </div>
                                        <div className="window-contents">
                                            <p>Contents</p>
                                            <div className="window-contents-button">
                                                <a href="#close" className="button">확인</a>
                                                <a href="#close" className="button line">취소</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section2">
                            <div className="section2_1 greens" />
                            <div className="section2_2 blueviolets" />
                        </div>
                    </div>
                    {dummyData.filter(item => item.code === this.state.user_code).map((item, index) => (
                        <div className="content3" key={index}>
                            {
                                item.titles.map((title, titleIndex) => (
                                    <div className="section3 grays" key={`title-${index}-${titleIndex}`}>
                                        <div className="columnAlign filebox">
                                            <h3>{title.fileName}</h3>
                                            <label htmlFor="ex_file" style={title.fileName ? {} : { display: 'none' }}>파일 업로드</label>
                                            <input type="file" id="ex_file" onChange={e => this.fileUpload(e)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                    <div className="content4">
                        <div className="section4 yellows" />
                        <div className="section4 blueviolets" />
                        <div className="section4 blueviolets" />
                        <div className="section4 blueviolets" />
                        <div className="section4 blueviolets" />
                    </div>
                </div>
                <div className="footer" />
            </div>
        );
    }

}

export default HtmlLayout;
