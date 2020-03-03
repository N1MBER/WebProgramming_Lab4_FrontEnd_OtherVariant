import React from "react";
import {Header} from "../components/Header";
import {
    getTable,
    setMessageR,
    setMessageX,
    setMessageY,
    setR,
    setX,
    setY
} from "../actions/functional_actions";
import {logout} from "../actions/user_actions";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import Canvas from "./Canvas";
import Form from "./Form";
import {Result} from "./Table";
import {Clock} from "./Clock";
import {Button} from "react-toolbox/lib/button";


class SecondPage extends React.Component{
    constructor(props){
        super(props);
        this.props.setMessageX("");
        this.props.setMessageY("");
        this.props.setMessageR("");
        this.props.setX(null);
        this.props.setY(null);
        // this.props.setR(0);
    }

    getTable(){
        this.props.getTable();
    }

    componentDidMount() {
        this.getTable()
    }


    render() {
        const {header,functional,user} = this.props;
        return(
            <div>
                {!user.isLogined && <Redirect to={"/"}/>}
                <Header topic={header.topic}
                        firstName={header.firstName}
                        secondName={header.secondName}
                        variant={header.variant}/>
                        <Canvas id={'action'}/>
                <div id={'inputPlace'}>
                    <Form />
                    <Result table={functional.table} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        header: store.header,
        functional: store.functional,
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(logout()),
        setR: r => dispatch(setR(r)),
        setX: x => dispatch(setX(x)),
        setY: y => dispatch(setY(y)),
        setMessageR: messageR => dispatch(setMessageR(messageR)),
        setMessageX: messageX => dispatch(setMessageX(messageX)),
        setMessageY: messageY => dispatch(setMessageY(messageY)),
        getTable: () => dispatch(getTable()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SecondPage)
