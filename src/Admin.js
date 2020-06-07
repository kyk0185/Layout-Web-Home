import React, { Component } from 'react';
import './Admin.css';
import './lib/Bootstrap.css';
import { data } from './dummy';
import {Table,Button} from 'react-bootstrap';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyData: data
        }
        this.handleChange = this.fileUpload.bind(this);
        this.handleChange = this.handleChangeTitle.bind(this);
        this.handleChange = this.handleChangeInfo.bind(this);
        this.handleChange = this.handleChangeVersion.bind(this);
        this.handleChange = this.handleChangeDate.bind(this);
    }
    //파일 등록
    fileUpload = (index, titleIndex) => event => {
        const { dummyData } = this.state;

        let files = event.target.files;
        let objectURL = URL.createObjectURL(files[0]);

        let copyData = Object.assign([], dummyData);
        copyData[index].titles[titleIndex].fileName = files[0].name;
        copyData[index].titles[titleIndex].fileUrl = objectURL;

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

    //더블 클릭 시 text모드로 변환
    changEditTitle = (index,titleIndex) => {
        const {dummyData} = this.state;
        
        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].isEditName = true;

        this.setState({
            dummyData:copyData
        });

  
    }
    //더블 클릭 시 text모드로 변환
    changEditInfo = (index,titleIndex) => {
        const {dummyData} = this.state;
        
        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].isEditInfo = true;

        this.setState({
            dummyData:copyData
        });
    }

    //더블 클릭 시 text모드로 변환
    changEditVersion = (index,titleIndex) => {
        const {dummyData} = this.state;
        
        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].isEditVersion = true;

        this.setState({
            dummyData:copyData
        });
    }

    //더블 클릭 시 text모드로 변환
    changEditDate = (index,titleIndex) =>{
        const {dummyData} = this.state;
        
        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].isEditDate = true;

        this.setState({
            dummyData:copyData
        });
    }
    //text모드 수정해서 local DB에 저장
    handleChangeTitle = (index,titleIndex) => event => {
        const {dummyData} = this.state;

        let text = event.target.value;

        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].name = text;

        this.setState({
            dummyData:copyData
        });
    }
    //text모드 수정해서 local DB에 저장
    handleChangeInfo = (index,titleIndex) => event => {
        const {dummyData} = this.state;

        let text = event.target.value;

        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].info = text;

        this.setState({
            dummyData:copyData
        });
    }
    //text모드 수정해서 local DB에 저장
    handleChangeVersion = (index,titleIndex) => event => {
        const {dummyData} = this.state;

        let text = event.target.value;

        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].version = text;

        this.setState({
            dummyData:copyData
        });
    }
    //text모드 수정해서 local DB에 저장
    handleChangeDate = (index,titleIndex) => event => {
        const {dummyData} = this.state;

        let text = event.target.value;

        let copyData = Object.assign([],dummyData);
        copyData[index].titles[titleIndex].date = text;

        this.setState({
            dummyData:copyData
        });
    }
    //엔터 누를 시 view모드 전환
    handleKeyDownTitle = (index,titleIndex) => event => {
        if(event.key === "Enter"){
            const {dummyData} = this.state;

            let copyData = Object.assign([],dummyData);
            copyData[index].titles[titleIndex].isEditName = false;

            this.setState({
                dummyData:copyData
            });
        }
    }
    //엔터 누를 시 view모드 전환
    handleKeyDownInfo = (index,titleIndex) => event => {
        if(event.key === "Enter"){
            const {dummyData} = this.state;

            let copyData = Object.assign([],dummyData);
            copyData[index].titles[titleIndex].isEditInfo = false;

            this.setState({
                dummyData:copyData
            });
        }
    }
    //엔터 누를 시 view모드 전환
    handleKeyDownVersion = (index,titleIndex) => event => {
        if(event.key === "Enter"){
            const {dummyData} = this.state;

            let copyData = Object.assign([],dummyData);
            copyData[index].titles[titleIndex].isEditVersion = false;

            this.setState({
                dummyData:copyData
            });
        }
    }
    //엔터 누를 시 view모드 전환
    handleKeyDownDate = (index,titleIndex) => event => {
        if(event.key === "Enter"){
            const {dummyData} = this.state;

            let copyData = Object.assign([],dummyData);
            copyData[index].titles[titleIndex].isEditDate = false;

            this.setState({
                dummyData:copyData
            });
        }
    }
    //전체 체크박스 활성화/비활성화
    checkFileAll = index => event=>{
        
        //각 테이블 인덱스 체크 상태 값
        var title = document.getElementsByName(`checkAll-${index}`)[0].checked;
        //해당 테이블 자식 인덱스 길이
        var titlesLength = document.getElementsByName(`check-${index}`).length;
        
        //전체 체크박스 클릭 시 체크 상태 활성화
        if(title === true){
            for(var i = 0; i < titlesLength; i++){
                let check = document.getElementsByName(`check-${index}`)[i];
                check.checked = true;
            }
        }else{
            //전체 체크박스 클릭 시 체크 상태 비활성화
            for(var j = 0; j < titlesLength; j++){
                let check = document.getElementsByName(`check-${index}`)[j];
                check.checked = false;
            }
        }

    }
    render() {
        const { dummyData } = this.state;
        localStorage.setItem('dummyData', JSON.stringify(dummyData));
        return (
            <div className="frame-admin">
                <div className="header-admin">
                    <h2>BCPMS Administrator</h2>
                </div>
                <div className="container-admin">
                    {
                        dummyData.map((item, index) => (
                            <div className="container-title-admin" key={index}>
                                <div className="content-admin">
                                        <img src={item.logo} style={{ width: 189, height: 70 }} alt={item.sido}></img>
                                        <div style={{marginLeft: 'auto', height:30,lineHeight:1}}>
                                            <Button variant="outline-secondary" onClick={this.fileColumnAdd(index)} style={{marginRight:9.6,padding:'1px 6px'}}>+</Button>
                                            <Button variant="outline-secondary" onClick={this.fileColumnDelete(index)} style={{padding:'1px 8px'}}>-</Button>
                                        </div>
                                </div>
                                <Table striped bordered hover>
                                    <thead style={{textAlign :'center'}}>
                                        <tr>
                                            <th style={{width:'4%'}}>구분</th>
                                            <th style={{width:'20%'}}>제목</th>
                                            <th style={{width:'32%'}}>설명</th>
                                            <th style={{width:'7%'}}>버전</th>
                                            <th style={{width:'7%'}}>날짜</th>
                                            <th style={{width:'20%'}}>파일명</th>
                                            <th style={{width:'10%'}}>파일관리</th>
                                            <th style={{width:'5%'}}><input name={`checkAll-${index}`} value={item.key} type="checkbox" onClick={this.checkFileAll(index)} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {
                                    item.titles.map((title, titleIndex) => (
                                        <tr key={`title-${index}-${titleIndex}`}>
                                        <td style={{textAlign :'center'}}>{title.key}</td>
                                        {title.isEditName ? 
                                            (<td style={{textAlign :'left'}}><input type="text" value={title.name} onChange={this.handleChangeTitle(index,titleIndex)} onKeyDown={this.handleKeyDownTitle(index,titleIndex)} size='20' style={{width:'100%'}}/></td>)    
                                            :
                                            (<td onDoubleClick={() => this.changEditTitle(index,titleIndex)} style={{textAlign :'left'}}>{title.name}</td>)
                                        }
                                        {title.isEditInfo ? 
                                            (<td style={{textAlign :'left'}}><input type="text" value={title.info} onChange={this.handleChangeInfo(index,titleIndex)} onKeyDown={this.handleKeyDownInfo(index,titleIndex)} style={{width:'100%'}}/></td>)    
                                            :
                                            (<td onDoubleClick={() => this.changEditInfo(index,titleIndex)} style={{textAlign :'left'}}>{title.info}</td>)
                                        }
                                        {title.isEditVersion ? 
                                            (<td><input type="text" value={title.version} onChange={this.handleChangeVersion(index,titleIndex)} onKeyDown={this.handleKeyDownVersion(index,titleIndex)} style={{textAlign:'center', width:'100%'}} /></td>)    
                                            :
                                            (<td onDoubleClick={() => this.changEditVersion(index,titleIndex)} style={{textAlign :'center'}}>{title.version}</td>)
                                        }
                                        {title.isEditDate ? 
                                            (<td><input type="text" value={title.date} onChange={this.handleChangeDate(index,titleIndex)} onKeyDown={this.handleKeyDownDate(index,titleIndex)} style={{textAlign:'center', width:'100%'}}/></td>)    
                                            :
                                            (<td onDoubleClick={() => this.changEditDate(index,titleIndex)} style={{textAlign :'center'}}>{title.date}</td>)
                                        }
                                            <td style={{textAlign :'center'}}>{title.fileName}</td>
                                                <td className="contentRight-admin" style={{textAlign :'center'}}>
                                                    <label htmlFor={`title-${index}-${titleIndex}-add`}>
                                                        등록<input type="file" id={`title-${index}-${titleIndex}-add`} onChange={this.fileUpload(index, titleIndex)} />
                                                    </label>
                                                    <Button variant="outline-secondary" id={`title-${index}-${titleIndex}-delete`} onClick={this.fileDelete(index, titleIndex)} style={{verticalAlign:'baseline',lineHeight:1, fontSize:'.9rem',height: 27.75}}>삭제</Button>
                                                </td>
                                                <td style={{textAlign :'center'}}><input
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

