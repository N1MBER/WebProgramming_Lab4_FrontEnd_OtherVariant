import React from "react";
import {Redirect} from "react-router";
import {Header} from "./Header";
import {connect} from "react-redux";
import Authorization from "./Authorization";
import {Clock} from "./Clock";
import {Avatar} from "react-toolbox/lib/avatar";
import {Link} from "react-toolbox/lib/link";


class FirstPage extends React.Component{

    render() {
        const {header,functional,user} = this.props;
        return(
            <div id={"firstPage"}  >
                {user.isLogined && <Redirect to={"/action"}/>}
                <Header topic={header.topic}
                    firstName={header.firstName}
                    secondName={header.secondName}
                    variant={header.variant}/>
                    <Clock clockSize={functional.clockSize} type={2} />
                    <div id={'authorization'}>
                        {window.screen.availWidth>1085 ?<img id={'imguser'} src={'data:image/png;base64,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'} />:<br/>}
                        <Authorization/>
                    </div>
                </div>
        )
    }

}

const mapStateToProps = store =>{
    return{
        header: store.header,
        user: store.user,
        functional: store.functional
    }
};

export default connect(mapStateToProps)(FirstPage);