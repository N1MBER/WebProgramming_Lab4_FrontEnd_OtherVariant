import React from "react";
import Avatar from "react-toolbox/lib/avatar";

export class Header extends React.Component{
    constructor(props){
        super(props);
        this.showDescription = this.showDescription.bind(this);
        this.state={
            flag: true
        }
    }
    showDescription(e){
        this.setState({flag:!this.state.flag})
        let flag = this.state.flag;
        let block = document.getElementById('person')
        if (flag) {
            block.style.display = 'block';
        }else
            block.style.display = 'none';

    }

    render() {
        const{topic,firstName,secondName,variant} = this.props;
        return(
            <div id={'header'} >
                        <div id={"topic"}  >
                            {topic}
                        </div>
                        <div id={"name"} >
                            <p>Student: {secondName + " " + firstName} </p>
                            <p>Variant: {variant}</p>
                        </div>
                        <Avatar  id={'menu'}><img id={'imgmenu'} onClick={this.showDescription}  src='https://cdn4.iconfinder.com/data/icons/general-office-solid-style/91/General_-_Office_30-512.png'/></Avatar>

                <div id={'person'} >
                    <p>Student: {secondName + " " + firstName} </p>
                    <p>Variant: {variant}</p>
                </div>
            </div>
        )
    }
}
