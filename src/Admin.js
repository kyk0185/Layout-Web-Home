import React, { Component } from 'react';
import './Admin.css';
import { data } from './dummy';

class Admin extends Component {
    constructor(props) {

        super(props)
        this.state = {
            dummyData: data,
        }
        this.handleChange = this.fileUpload.bind(this);
    }
    //파일 등록
    fileUpload = (index, titleIndex) => event => {
        const { dummyData } = this.state;

        let files = event.target.files;

        let copyData = Object.assign([], dummyData);
        copyData[index].titles[titleIndex].fileName = files[0].name;

        this.setState({
            dummyData: copyData
        })
    }

    //파일 삭제
    fileDelete = (index, titleIndex) => event => {
        event.preventDefault();
        const { dummyData } = this.state;

        let copyData = Object.assign([], dummyData);
        copyData[index].titles[titleIndex].fileName = "";

        this.setState({
            dummyData: copyData
        })

    }

    render() {
        const { dummyData } = this.state;
        localStorage.setItem('dummyData', JSON.stringify(dummyData));
        return (
            <div className="frame1">
                <div className="header1" >
                    <h2>관리자 페이지</h2>`
                </div>
                <div className="container">
                    {
                        dummyData.map((item, index) => (
                            <div className="container2" key={index}>
                                <div className="content">
                                    <h2>{item.sido}</h2>
                                </div>
                                {
                                    item.titles.map((title, titleIndex) => (
                                        <div className="content" key={`title-${index}-${titleIndex}`}>
                                            <div className="contentLeft">
                                                <h3>{title.name}</h3>
                                            </div>
                                            <div className="contentMiddle">
                                                <h3>{title.fileName}</h3>
                                            </div>
                                            <div className="contentRight" >
                                                <label htmlFor={`title-${index}-${titleIndex}-add`}>
                                                    등록<input type="file" id={`title-${index}-${titleIndex}-add`} onChange={this.fileUpload(index, titleIndex)} />
                                                </label>
                                                <label htmlFor={`title-${index}-${titleIndex}-delete`}>
                                                    삭제<input type="button" id={`title-${index}-${titleIndex}-delete`} onClick={this.fileDelete(index, titleIndex)} />
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="footer" />
            </div>
        );
    }

}
export default Admin;
