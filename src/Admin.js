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

        alert('파일을 삭제하시겠습니까?')
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

        copyTitles.forEach((copyTitle, i) => {
            if (copyTitle.key === Number(title.value)) {
                copyTitles.splice(i, 1);
            }
        });
        this.setState({ dummyData: copyData });
    }
    
    //행 삭제 버튼 클릭 시
    fileColumnDelete = index => event => {

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
                alert('삭제할 대상을 선택해 주세요');
            }
        } else {
            alert('삭제할 대상을 선택해 주세요');
        }
    }
    checkFileAll = index => event=>{
        event.preventDefault();
        //(checkbox)행 전체 개수
        var titleLength = document.getElementsByName(`check-${index}`).length;
        var test = document.getElementsByName(`checkFileAll-${index}`);
        console.log(test)
    }
    render() {
        const { dummyData } = this.state;
        localStorage.setItem('dummyData', JSON.stringify(dummyData));
        return (
            <div className="frame-admin">
                <div className="header-admin">
                    <h2>관리자 페이지</h2>
                </div>
                <div className="container-admin">
                    {
                        dummyData.map((item, index) => (
                            <div className="container-title-admin" key={index}>
                                <div className="content-admin">
                                        <h4>{item.sido}</h4>
                                        <div style={{marginLeft: 'auto', height:30,lineHeight:1}}>
                                            <Button variant="outline-secondary" onClick={this.fileColumnAdd(index)} style={{marginRight:9.6,padding:'1px 6px'}}>+</Button>
                                            <Button variant="outline-secondary" onClick={this.fileColumnDelete(index)} style={{padding:'1px 8px'}}>-</Button>
                                        </div>
                                </div>
                                <Table striped bordered hover style={{textAlign :'center'}}>
                                    <thead>
                                        <tr>
                                            <th style={{width:'20%'}}>제목</th>
                                            <th style={{width:'42%'}}>설명</th>
                                            <th style={{width:'26%'}}>파일명</th>
                                            <th style={{width:'8%'}}>파일관리</th>
                                            <th style={{width:'4%'}}><input name={`checkFileAll-${index}`} value={item.key} type="checkbox" onClick={this.checkFileAll(index)} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {
                                    item.titles.map((title, titleIndex) => (
                                        <tr key={`title-${index}-${titleIndex}`}>
                                            <td>{title.name}</td>
                                            <td>{title.info}</td>
                                            <td>{title.fileName}</td>
                                                <td className="contentRight-admin">
                                                    <label htmlFor={`title-${index}-${titleIndex}-add`}>
                                                        등록<input type="file" id={`title-${index}-${titleIndex}-add`} onChange={this.fileUpload(index, titleIndex)} />
                                                    </label>
                                                    <Button variant="outline-secondary" id={`title-${index}-${titleIndex}-delete`} onClick={this.fileDelete(index, titleIndex)} style={{verticalAlign:'baseline',lineHeight:1, fontSize:'.9rem',height: 27.75}}>삭제</Button>
                                                </td>
                                                <td><input
                                                        name={`check-${index}`}
                                                        value={title.key}
                                                        type="checkbox"
                                                    /></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                </Table>
                            </div>
                        ))
                    }
                </div>
                <div className="footer-admin" />
            </div>
        );
    }
}
export default Admin;

