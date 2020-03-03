import React from "react";
import {Autocomplete} from "react-toolbox/lib/autocomplete";
import {
    getTable,
    sendPoint,
    setMessageR,
    setMessageX,
    setMessageY,
    setR,
    setX,
    setY
} from "../actions/functional_actions";
import {logout} from "../actions/user_actions";
import {connect} from 'react-redux';
import {Input} from "react-toolbox/lib/input";
import $ from 'jquery'
import {Button} from "react-toolbox/lib/button";

const valueX = ['-5','-4','3','2','1','0','-1','-2','-3'];
const valueR = ['1','2','3','4','5'];

class Form extends React.Component{
    constructor(props){
        super(props);
        this.sendPoint = this.sendPoint.bind(this);
        this.chooseX = this.chooseX.bind(this);
        this.chooseY = this.chooseY.bind(this);
        this.chooseR = this.chooseR.bind(this);
        this.submitPoint = this.submitPoint.bind(this);
        this.logout = this.logout.bind(this);
        this.focusX = this.focusX.bind(this);
        this.blurX = this.blurX.bind(this);
        this.focusR = this.focusR.bind(this);
        this.blurR = this.blurR.bind(this);
    }

    logout(e){
        this.props.logout()
    }

    submitPoint(e){
        this.props.setMessageX("");
        this.props.setMessageY("");
        this.props.setMessageR("");
        let flag = true;
        if(this.props.functional.x==null || this.props.functional.x ==="" || this.props.functional.x<-5 || this.props.functional.x>3){
            this.props.setMessageX("Please choose X");
            flag = false;
        }
        let x = this.props.functional.x;
        if(x=="" || x==null){
            this.props.setMessageX("Please choose X");
            flag = false;
        } else {
            if(!/^(-?\d+)([.,]\d+)?$/.test(x)) {
                this.props.setMessageX("X must be a number");
            } else {
                x = x.replace(',','.');
                x = Number(x);
                if (!(x >= -5 && x <= 3)) {
                    flag = false;
                    this.props.setMessageX("X must be in the range (-5;3)");
                }
            }
        }
        let y = this.props.functional.y;
        if(y=="" || y==null){
            this.props.setMessageY("Please enter Y");
            flag = false;
        } else {
            if(!/^(-?\d+)([.,]\d+)?$/.test(y)) {
                this.props.setMessageY("Y must be a number");
            } else {
                y = y.replace(',','.');
                y = Number(y);
                if (!(y >= -3 && y <= 5)) {
                    flag = false;
                    this.props.setMessageY("Y must be in the range (-3;5)");
                }
            }
        }
        if(this.props.functional.r==0 || this.props.functional.r ==="" || this.props.functional.r == null || this.props.functional.r>5 || this.props.functional.r<0){
            flag = false;
            this.props.setMessageR("Please choose R");
        }
        let r = this.props.functional.r;
        if(r=="" || r==null){
            this.props.setMessageR("Please choose R");
            flag = false;
        } else {
            if(!/^(-?\d+)([.,]\d+)?$/.test(r)) {
                this.props.setMessageR("R must be a number");
            } else {
                r = r.replace(',','.');
                r = Number(r);
                if (!(r > 0 && r <=5)) {
                    flag = false;
                    this.props.setMessageY("R must be in the range (0;5)");
                }
            }
        }
        // console.log(flag);
        if(flag){
            this.sendPoint(this.props.functional.x, this.props.functional.y, this.props.functional.r)
        }
    }

    focusX(e){
        $('.xSelector ul').css('display','block');
    }

    blurX(e){
        $('.xSelector ul').css('display','none');
    }

    focusR(e){
        $('.rSelector ul').css('display','block');
    }

    blurR(e){
        $('.rSelector ul').css('display','none');

    }

    chooseX = (value) => {
        this.props.setX(value);
        this.props.setMessageX("");
    };

    chooseY = (value) => {
        this.props.setY(value);
        this.props.setMessageY("");
    }

    chooseR = (value) => {
        this.props.setR(value);
        this.props.setMessageR("");
        console.log(this.props.functional.r)

    };


    sendPoint(x,y,r){
        console.log("X: "+ x + "\nY: " + y + "\nR: " +r);
        let butch = {
            x: Number(x),
            y: Number(y),
            r: Number(r),
        };
        this.props.sendPoint(butch);
    }

    render() {
        const {functional} = this.props;
        return(
            <div id={'inputField'}>
                <Button id={'logout'} label={"Logout"} onClick={this.logout} />
                <p id={'description'}>Please choose X</p>
                <Autocomplete
                    direction="down"
                    multiple={false}
                    onFocus={this.focusX}
                    onBlur={this.blurX}
                    onChange={this.chooseX}
                    source={valueX}
                    className={'xSelector'}
                    suggestionMatch={"anywhere"}
                    value={functional.x}
                    id={'xSelector'}
                />
                <div id={"valuesMessage"}>
                    {functional.messageX === "" ? <br/> : functional.messageX}
                </div>
                <p id={'description'}>Please write Y</p>
                <Input  id={'yInput'} maxLength={10} onChange={this.chooseY} />
                <div id={"valuesMessage"}>
                    {functional.messageY === "" ? <br/> : functional.messageY}
                </div>
                <p id={'description'}>Please choose R</p>
                <Autocomplete
                    direction="down"
                    multiple={false}
                    onChange={this.chooseR}
                    source={valueR}
                    onBlur={this.blurR}
                    onFocus={this.focusR}
                    suggestionMatch={"anywhere"}
                    value={functional.r}
                    className={'rSelector'}
                    id={'rSelector'}
                />
                <div id={"valuesMessage"}>
                    {functional.messageR === "" ? <br/> : functional.messageR}
                </div>
                <Button id={'send'} label={"Send"} type={"submit"} onClick={this.submitPoint}/>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        functional: store.functional
    }
};

const mapDispatchToProps = dispatch => {
    return{
        setR: r => dispatch(setR(r)),
        setX: x => dispatch(setX(x)),
        setY: y => dispatch(setY(y)),
        setMessageX: message => dispatch(setMessageX(message)),
        setMessageY: message => dispatch(setMessageY(message)),
        setMessageR: message => dispatch(setMessageR(message)),
        getTable: () => dispatch(getTable()),
        logout: () => dispatch(logout()),
        sendPoint: data => dispatch(sendPoint(data))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Form);