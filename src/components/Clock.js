import React from "react";

export class Clock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.newTime(),
            700
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    newTime(){
        this.setState({
            date: new Date()
        });

        this.makeElectricStyle(this.props.type);
    }

    makeElectricStyle(type){
        const clock = this.refs.canvas.getContext('2d');
        let width = this.refs.canvas.width;
        clock.clearRect(0,0,width,width);
        clock.fillStyle = 'black';
        let now = new Date();
        let date =now.toDateString();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let firstCountHours = Math.floor(hours/10);
        let secondCountHours = hours%10;
        let firstCountMinutes = Number(Math.floor(minutes/10));
        let secondCountMinutes = Number(minutes%10);
        switch (type) {
            case 1:
                width = width/2;
                this.paintCount(clock,50*width/1000,160*width/1000,firstCountHours,800,width);
                this.paintCount(clock,250*width/1000,160*width/1000,secondCountHours,800,width);
                this.paintStick(clock,465*width/1000,260*width/1000,6,800,width);
                // switch (firstCountMinutes) {
                //     case 1:
                //         this.paintCount(clock,450*width/1000,160*width/1000,firstCountMinutes,800,width);
                //         this.paintCount(clock,650*width/1000,160*width/1000,secondCountMinutes,800,width);
                //         break;
                //     case 2 :
                        this.paintCount(clock,550*width/1000,160*width/1000,firstCountMinutes,800,width);
                        this.paintCount(clock,750*width/1000,160*width/1000,secondCountMinutes,800,width);
                    //     break;
                    // case 0:
                    //     this.paintCount(clock,550*width/1000,160*width/1000,firstCountMinutes,800,width);
                    //     this.paintCount(clock,750*width/1000,160*width/1000,secondCountMinutes,800,width);
                    //     break;
                // }
                clock.font = 0.08 * width + 'px Arial';
                clock.fillText('Now is:' + date,0.05*width,0.6*width,4000);
                break;
            case 2:
                this.paintCount(clock,280*width/1000,50*width/1000,firstCountHours,700,width);
                this.paintCount(clock,520*width/1000,50*width/1000,secondCountHours,700,width);
                this.paintCount(clock,280*width/1000,450*width/1000,firstCountMinutes,700,width);
                this.paintCount(clock,520*width/1000,450*width/1000,secondCountMinutes,700,width);
                clock.font = 0.08 * width + 'px Arial';
                let arr  = date.split(" ");
                clock.fillText( arr[1]+" "+arr[2]+" "+arr[3],0.27*width,910*width/1000,4000);

                break;
            default:
                break
        }
    }

    paintStick(clock,x,y,type,coef,width){
        let cof = coef;
        switch (type) {
            case 1:
                clock.fillStyle = 'black';
                clock.beginPath();
                clock.moveTo(x,y+5*width/cof);
                clock.lineTo(x+10*width/cof,y);
                clock.lineTo(x+100*width/cof,y);
                clock.lineTo(x+110*width/cof,y+5*width/cof);
                clock.lineTo(x+95*width/cof,y+10*2*width/cof);
                clock.lineTo(x+15*width/cof,y+10*2*width/cof);
                clock.closePath();
                clock.fill();
                break;
            case 2:
                clock.fillStyle = 'black';
                clock.beginPath();
                clock.moveTo(x+5*width/cof,y);
                clock.lineTo(x,y+10*width/cof);
                clock.lineTo(x,y+100*width/cof);
                clock.lineTo(x+5*width/cof,y+110*width/cof);
                clock.lineTo(x+10*2*width/cof,y+95*width/cof);
                clock.lineTo(x+10*2*width/cof,y+15*width/cof);
                clock.closePath();
                clock.fill();
                break;
            case 3:
                clock.fillStyle ='black';
                clock.beginPath();
                clock.moveTo(x+15*width/cof,y);
                clock.lineTo(x+20*width/cof,y+10*width/cof);
                clock.lineTo(x+20*width/cof,y+100*width/cof);
                clock.lineTo(x+15*width/cof,y+110*width/cof);
                clock.lineTo(x,y+95*width/cof);
                clock.lineTo(x,y+15*width/cof);
                clock.closePath();
                clock.fill();
                break;
            case 4:
                clock.fillStyle = 'black';
                clock.beginPath();
                clock.moveTo(x,y+10*width/cof);
                clock.lineTo(x+10*width/cof,y);
                clock.lineTo(x+100*width/cof,y);
                clock.lineTo(x+110*width/cof,y+10*width/cof);
                clock.lineTo(x+100*width/cof,y+10*2*width/cof);
                clock.lineTo(x+10*width/cof,y+10*2*width/cof);
                clock.closePath();
                clock.fill();
                break;
            case 5:
                clock.fillStyle = 'black';
                clock.beginPath();
                clock.moveTo(x,y+15*width/cof);
                clock.lineTo(x+15*width/cof,y);
                clock.lineTo(x+95*width/cof,y);
                clock.lineTo(x+110*width/cof,y+15*width/cof);
                clock.lineTo(x+100*width/cof,y+10*2*width/cof);
                clock.lineTo(x+10*width/cof,y+10*2*width/cof);
                clock.closePath();
                clock.fill();
                break;
            case 6:
                clock.fillStyle = 'black';
                clock.beginPath();
                clock.fillRect(x+width/(cof),y+width/(cof),width/(cof/25),width/(cof/25));
                clock.fillRect(x+width/(cof),y+100*width/(cof),width/(cof/25),width/(cof/25));
                clock.closePath();
                clock.fill();
                break;
            default:break;
        }
    }

    paintCount(clock,x,y,count,coef,width){
        let cof=coef;
        switch (count) {
            case 0:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x,y+150*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 1:
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                break;
                break;
            case 2:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+150*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 3:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 4:
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                break;
            case 5:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 6:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x,y+150*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 7:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                break;
            case 8:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x,y+150*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
            case 9:
                this.paintStick(clock,x+10*width/cof,y+10*width/cof,1,cof,width);
                this.paintStick(clock,x,y+20*width/cof,2,cof,width);
                this.paintStick(clock,x+110*width/cof,y+20*width/cof,3,cof,width);
                this.paintStick(clock,x+110*width/cof,y+150*width/cof,3,cof,width);
                this.paintStick(clock,x+10*width/cof,y+130*width/cof,4,cof,width);
                this.paintStick(clock,x+10*width/cof,y+250*width/cof,5,cof,width);
                break;
        }
    }

    render() {
        const {clockSize} = this.props;
        return(
            <div id={'clockPlace'}>
                <canvas ref={'canvas'} id={'clock'} width={clockSize} height={clockSize} />
            </div>
        )
    }
}