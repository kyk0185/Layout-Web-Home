import React, { Component } from 'react';
import './Admin.css';
import './lib/Bootstrap.css';
import { data } from './dummy';
import {Table,Button} from 'react-bootstrap';

class Admin extends Component {
    constructor(props) {

        super(props)
        this.state = {
            dummyData: data,
        }
        this.handleChange = this.fileUpload.bind(this);
        this.handleInputChange = this.handleCheckedState.bind(this);
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
        localStorage.setItem('dummyData', JSON.stringify(dummyData));
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

    //테이블 행 추가
    fileColumnAdd = index => event =>{
        event.preventDefault();
        const { dummyData } = this.state;

        let copyData = Object.assign([], dummyData);
        copyData[index].titles.push({key:copyData[index].titles.length + 1, name: `제목${copyData[index].titles.length + 1}`}); 

        this.setState({
            dummyData: copyData
        })
    }

    //테이블 행 삭제
    //@Param1 : 시도 Index, @param2 : 타이틀 객체( {key, index} )
    fileColumnRemove =(index, title) => {
        //event.preventDefault();
        const { dummyData } = this.state;

        let copyData = Object.assign([], dummyData);
        let copyTitles = copyData[index].titles;

        console.log(title.value);

        copyTitles.forEach((copyTitle, i) => {
            if (copyTitle.key === Number(title.value)) {
                copyTitles.splice(i, 1);
            }
        });

        this.setState({ dummyData: copyData });
    }
    
    //행 삭제 버튼 클릭 시
    fileColumnDelete = index => event => {

        console.log(event);

        //(checkbox)행 전체 개수
        var titleLength = document.getElementsByName(`check-${index}`).length;

        //Title 존재 유무 체크 > 0
        
        if (titleLength > 0) {
            let removeIndexs = [];

            for (var i=0; i < titleLength; i++) {
                let check = document.getElementsByName(`check-${index}`)[i];
                if (check.checked === true) {
                    removeIndexs.push(check);
                }
            }

            //삭제할 Index(대상)이 존재할 때 
            if (removeIndexs.length > 0) {
                if (removeIndexs.length === titleLength) {
                    //모든 행 삭제 방어 코드
                    alert('전체 행을 삭제할 수 없습니다.');
                } else if (removeIndexs.length < titleLength) {
                    //삭제대상 < 전체 행
                    for (let titleIndex = 0; titleIndex < removeIndexs.length; titleIndex++) {

                        //(임시코드) 삭제할 행의 checkbox checked = false; //체크해제
                        //v1 : document.getElementsByName(`check-${index}`)[removeIndexs[titleIndex].index].checked = false;
                        removeIndexs[titleIndex].checked = false;

                        //행 삭제
                        this.fileColumnRemove(index, removeIndexs[titleIndex]);
                    }
                }
            } else {
                alert('삭제할 대상을 선택해 주세요.2');
            }
        } else {
            alert('삭제할 대상을 선택해 주세요.1');
        }
    }

    //체크 활성화/비활성화 토글(?????)
    handleCheckedState(event) {
        const target = event.target;
        const value = target.name === 'isCheck' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
    }

    render() {
        const { dummyData } = this.state;

        return (
            <div className="frame1">
                <div className="header1" >
                    <h2>관리자 페이지</h2>
                </div>
                <div className="container1">
                    {
                        dummyData.map((item, index) => (
                            <div className="container2" key={index}>
                                <div className="content">
                                    <h4>{item.sido}</h4>
                                        <Button onClick={this.fileColumnAdd(index)}>행 추가</Button>
                                        <Button onClick={this.fileColumnDelete(index)}>행 삭제</Button>
                                </div>
                                <Table striped bordered hover style={{textAlign :'center'}} variant="dark">
                                    <thead>
                                        <tr>
                                            <th style={{width:'30%'}}>기관별 제목</th>
                                            <th>파일이름</th>
                                            <th style={{width:'30%'}}>#</th>
                                        </tr>
                                    </thead>
                                {
                                    item.titles.map((title, titleIndex) => (
                                        <tbody key={`title-${index}-${titleIndex}`}>
                                            <tr>
                                                <td>{title.name}</td>
                                                <td>{title.fileName}</td>
                                                <div className="contentRight">
                                                    <label htmlFor={`title-${index}-${titleIndex}-add`}>
                                                        등록<input type="file" id={`title-${index}-${titleIndex}-add`} onChange={this.fileUpload(index, titleIndex)} />
                                                    </label>
                                                    <label htmlFor={`title-${index}-${titleIndex}-delete`}>
                                                        삭제<input type="button" id={`title-${index}-${titleIndex}-delete`} onClick={this.fileDelete(index, titleIndex)} />
                                                    </label>
                                                    <input
                                                        name={`check-${index}`}
                                                        value={title.key}
                                                        type="checkbox"
                                                    />
                                                </div>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                                </Table>
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
