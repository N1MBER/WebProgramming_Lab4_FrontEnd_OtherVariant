import React from 'react';
import {BrowserRouter, HashRouter, Route} from 'react-router-dom';
import '../App.css';
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import {setCof,setClockSize, setDevice,setMarginLeft,setMarginTop, setPageWidth, setWidth} from "../actions/functional_actions";
import {setLogin} from "../actions/user_actions";
import {connect} from "react-redux";
import { RouterGuard } from "react-router-guard";


class App extends React.Component{

    constructor(props) {
        super(props);
        let size = window.screen.availWidth;
        this.props.setPageWidth(0.3 * size);
        if (size > 1085) {
            this.props.setCof(0.3);
            this.props.setWidth(size * 0.3);
            this.props.setClockSize(size / 2)
            this.props.setMarginLeft(60);
            this.props.setMarginTop(210);
        } else if (size >= 851) {
            this.props.setWidth(size * 0.7);
            this.props.setCof(0.2);
            this.props.setClockSize(size / 2)
            this.props.setMarginLeft(0.15 * size);
            this.props.setMarginTop(150);
        } else {
            this.props.setWidth(size * 0.9);
            this.props.setCof(0.9);
            this.props.setClockSize(size / 1.5)

            this.props.setMarginLeft(0.05 * size);
            this.props.setMarginTop(100);
        }
        if (localStorage.getItem("User_Person") != null || localStorage.getItem("User_Person") != undefined) {
            this.props.setLogin(true)
        } else {
            this.props.setLogin(false)
        }

    }

    render() {
        return (
            <div className="App" >
                <HashRouter hashType={"noslash"} >
                    {/*exact={true}*/}
                  <Route exact={true} strict={true} path={"/"} component={FirstPage}/>
                  <Route exact={true} strict={true} path={"/action"} component={SecondPage}/>
                </HashRouter>
            </div>
        );
    }
}

const mapStateToProps = store =>{
    return {
        functional: store.functional,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setClockSize: size => dispatch(setClockSize(size)),
        setCof: cof => dispatch(setCof(cof)),
        setWidth: width => dispatch(setWidth(width)),
        setPageWidth: width =>dispatch(setPageWidth(width)),
        setDevice: type => dispatch(setDevice(type)),
        setLogin: flag => dispatch(setLogin(flag)),
        setMarginTop: margin => dispatch(setMarginTop(margin)),
        setMarginLeft: margin => dispatch(setMarginLeft(margin))

}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)