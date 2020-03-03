import React from "react";
import {connect} from 'react-redux';
import {login, registration, setMessage} from "../actions/user_actions";
import Input  from "react-toolbox/lib/input";
import Button from "react-toolbox/lib/button";
import {Link} from "react-toolbox/lib/link";


class Authorization extends React.Component{
    constructor(props){
        super(props);
        this.props.setMessage("");
        this.authorization = this.authorization.bind(this);
        this.registration = this.registration.bind(this);
        this.focus = this.focus.bind(this)
    }

    focus(e){
        this.props.setMessage("");
    }

    authorization(e){
        this.props.setMessage("");
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === "" || login == null ){
            this.props.setMessage("Please, write your login.");
        } else if (password === "" || password == null){
            this.props.setMessage("Please, write your password.");
        }else {
            let data = {
                username: login,
                password: password
            }
            this.props.login(data);
        }
    }

    registration(e){
        this.props.setMessage("");
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === "" || login == null ){
            this.props.setMessage("Please, write your login.");
        } else if (password === "" || password == null){
            this.props.setMessage("Please, write your password.");
        }else {
            let data = {
                username: login,
                password: password
            }
            this.props.registration(data);
        }
    }

    render() {
        const {user} = this.props;
        return (
            <div >
                <Input type="email" placeholder='Login'onFocus={this.focus} maxlengs={20} id={"login"}/>
                <div id={"message"}>
                    {user.message === "" ? <br/> : user.message}
                </div>
                <Input type="password" placeholder='Password' onFocus={this.focus} maxlengs={20} id={"password"}/>
                <Button  id={'loginButton'} label={"Login"} onClick={this.authorization} />
                <Button id={'registerButton'} label={"Register"} onClick={this.registration}/>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch =>{
        return{
            setMessage: message => dispatch(setMessage(message)),
            registration: data => dispatch(registration(data)),
            login: data => dispatch(login(data))
        }
};

const mapStateToProps = store => {
    return{
        user: store.user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);