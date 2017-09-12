import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform ,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native';
export class Masonry extends Component {
  createRows(rows,cols,odd,gridWidth,i){
  var rowsR=[]
  let gridPadding=this.props.gridPadding;
  let gridMargin=this.props.gridMargin;


  var eRow=(odd>0)?1:0;
    for (var j = 0; j < cols+eRow; j++) {
      rowsR.push(
            <View key={Math.random()}>
                {this.props.renderView(
                    {
                      data:(this.props.data[(i+(j*rows))]),
                      style:{padding:gridPadding,margin:gridMargin},
                      gridWidth:gridWidth
                    }
                  )
               }
            </View>
          )

      }
    return rowsR;
  }

  createCols(width,cols){
    var rowsR=[];
    let gridPadding=this.props.gridPadding;
    let gridMargin=this.props.gridMargin;
    let gWidth=width/cols;
    gWidth=gWidth-(gridPadding+gridMargin)*2
    let odd=this.props.data.length%cols;
    let rows=(this.props.data.length-odd)/cols;

    for (var i = 0; i < cols; i++) {
      rowsR.push(<View style={{flex:1}} key={Math.random()}>{this.createRows(cols,rows,odd--,gWidth,i)}</View>)
    }
    return(
      rowsR
    )
  }
  render() {
    let props=this.props;
    let cols=props.cols;
    var width = Dimensions.get('window').width;
    let gridPadding=this.props.gridPadding;
    let gridMargin=this.props.gridMargin;
    return (
      <ScrollView onScroll={this.props.onScroll} >
        <View style={{flexDirection:'row',flex:1,marginLeft:gridMargin/2,marginRight:gridMargin/2}}>
          {this.createCols(width,cols)}
        </View>
      </ScrollView>

    )
  }
}
Masonry.defaultProps = {
  onScroll: () => {},
  cols: 2,
  gridPadding: 4,
  gridMargin: 4,
  data:[]
};

Masonry.propTypes = {
  onScroll: React.PropTypes.func,
  cols: React.PropTypes.number,
  gridPadding: React.PropTypes.number,
  gridMargin: React.PropTypes.number
};

export class MasonryImage extends Component {
  constructor(props){
    super(props)
  }
  findPoint(a,b,c){
    return (a*c/b);
  }
  state={
    height:this.props.gridWidth
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.state.height!==nextState.height;
 }
  getImage(){
    Image.getSize(this.props.source.uri, (width, height) => {
      let pImageHeight=this.findPoint(this.props.gridWidth,width,height);
        this.setState({
          height:pImageHeight
        })
    })
    return (<Image
      source={this.props.source}
      resizeMode={this.props.resizeMode}
      style={[this.props.style,{height:this.state.height,
        backgroundColor:'transparent'}]}
      >
      {this.props.children}
    </Image>)

  }
  render() {
    return (
      <View>
        {this.getImage()}
      </View>
    )
  }
}

MasonryImage.defaultProps = {
  gridWidth: 200,
  source: {},
  resizeMode: "cover",
  style:{}
};

MasonryImage.propTypes = {
  gridWidth: React.PropTypes.number,
  source: React.PropTypes.object,
  resizeMode: React.PropTypes.string,
  style: React.PropTypes.object
};
