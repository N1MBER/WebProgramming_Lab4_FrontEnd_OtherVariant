import React from 'react';
import {connect} from 'react-redux';
import {setMessageR,sendPoint} from "../actions/functional_actions";

class Canvas extends React.Component{
    constructor(props){
        super(props);
        this.clickCanvas = this.clickCanvas.bind(this);
    }

    drawCanvas(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        drawBackground(ctx,this.props.functional.r,this.refs.canvas.width);
        makeDots(ctx,this.props.functional.table,this.props.functional.r, this.refs.canvas.width)

    }

    sendPoint(x,y,r){
        console.log("X: "+ x + "\nY: " + y + "\nR: " +r);
        let butch = {
            x: x,
            y: y,
            r: r
        };
        this.props.sendPoint(butch);
    }

    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    clickCanvas(e){
        this.props.setMessageR("");
        if (this.props.functional.r === 0 || this.props.functional.r == null|| !(this.props.functional.r>0&&this.props.functional.r<=5)){
            this.props.setMessageR("Radius don't choose.");
        }else {
            let width = this.refs.canvas.width;
            let r = this.props.functional.r;
            let x = ((e.pageX - this.props.functional.mL)-width/2 )/(width/12);
            let y = -((e.pageY-this.props.functional.mT)-width/2)/(width/12);
            this.sendPoint(x,y,r);
        }
    }


    render() {
        const {functional} = this.props;
        return(
                <canvas id={'actionPlace'} ref='canvas' onClick={this.clickCanvas} width={functional.canvasWidth} height={functional.canvasWidth}/>
        )
    }
}

function drawBackground(context,R,width){
    R=width*R/12;
    context.lineWidth = 2/450*width;
    context.fillStyle = "rgba(255,255,255,1)"
    context.fillRect(0,0,width,width);
    context.fillStyle="#e77e40";
    context.fillRect(width/2,width/2-R,R/2,R);
    context.beginPath();
    context.arc(width/2,width/2,R/2,Math.PI/2,Math.PI,false);
    context.lineTo(width/2+1,width/2+1);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(width/2 +0.5,width/2+1);
    context.lineTo(width/2 +0.5 +R,width/2+1);
    context.lineTo(width/2+0.5,width/2+1+R);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(width/2+1,width);
    context.lineTo(width/2+1,0);
    context.moveTo(22*width/45,width/30);
    context.lineTo(width/2+1,0);
    context.lineTo(77*width/150,width/30);

    context.moveTo(0,width/2+1);
    context.lineTo(width,width/2+1);
    context.moveTo(29*width/30,22*width/45);
    context.lineTo(width,width/2+1);
    context.lineTo(29*width/30,77*width/150);
    for (let i=width/12; i<=(11*width/12);i+=width/24){
        context.moveTo(i,22*width/45);
        context.lineTo(i,77*width/150);
        context.moveTo(22*width/45,i);
        context.lineTo(77*width/150,i);
    }
    for (let j=width/12;j<=(11*width/12);j+=width/12){
        context.moveTo(j,217*width/450);
        context.lineTo(j,234*width/450);
        context.moveTo(217*width/450,j);
        context.lineTo(234*width/450,j);
    }
    context.stroke();
    // context.font = 80/450*width;
    context.font =  20/450*width +"px  Arial black";
    context.fillText("x",23*width/24,17*width/30);
    context.fillText("y",49*width/90,width/30);
}

function makeDots(context, table, r, width) {
    for(const dot of table){
        let flag = false;
        if(dot.x>=0 && dot.y>=0){
            flag =dot.y <= r&&dot.x <= r/2;
        }
        if(dot.x>=0 && dot.y<=0){
            flag = !(dot.y<= dot.x-r);
        }
        if(dot.x<0 && dot.y<=0){
            flag = Math.pow(dot.x, 2) + Math.pow(dot.y,2) <= Math.pow(r/2, 2);
        }
        if (flag){
            paintPoint(context,Number(dot.x),Number(dot.y),'yellow',width);
        }
        else
            paintPoint(context,Number(dot.x),Number(dot.y),'#2A2A2A',width);
    }
}


function paintPoint(context, x, y, color, width){
    context.fillStyle = color;
    let xPoint = x*width/12 + width/2;
    let yPoint = -y*width/12+width/2;
    context.beginPath();
    context.arc(xPoint, yPoint, 3, 0, Math.PI*2,false);
    context.closePath();
    context.fill();
}

const  mapStateToProps = store =>{
    return{
        functional: store.functional,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setMessageR: messageR => dispatch(setMessageR(messageR)),
        sendPoint: butch => dispatch(sendPoint(butch))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Canvas)