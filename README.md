## rn-masonry

## Installation
```
npm install rn-masonry --save
```


A easy to use react-native component to render a masonry layout for local and remote images with support for dynamic column rendering, Custom view inside masonry.





## Preview

![App preview](/ios.png)
![App preview](/android.png)



## Props

### Masonry props

| Props    | type   | description                                                                                             | required | default                          |
|:----------|:--------|:---------------------------------------------------------------------------------------------------------|:----------------------------------|:------------|
| data    | array | array of data for the data to be rendered | required |[]
| renderView    | func(props) | function to render the card based on the View| required |
| cols    | number | number of cols want to show | required | 2
| gridPadding    | number | padding inside card | | 4
| gridMargin    | number | space between two card	 | | 4
| onScroll    | func | onScroll Event	 | |

### MasonryImage props

| Props    | type   | description                                                                                             | required | default                          |
|:----------|:--------|:---------------------------------------------------------------------------------------------------------|:----------------------------------|:------------|
| source    |object | source object like image | required |
| resizeMode    | string| resizeMode object like image | | cover
| style    |object|  | |

source will only work on object  **(required('../img.jpg') will not work)**







## Usage example 1


```javascript
import {
MasonryImage,Masonry
} from 'rn-masonry';





class CustomView extends Component {

  render() {

    return (
      <View style={[this.props.style,{backgroundColor:'#ccc'
      ,borderRadius:5}]}>
        <MasonryImage
          resizeMode={"cover"}
          gridWidth={this.props.gridWidth}
          style={{borderRadius:5}}
          source={{uri:this.props.data.uri}}>
        </MasonryImage>
        <Text>{this.props.data.title}</Text>
      </View>

    )
  }
}

class MasonryExample extends Component {
  renderView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }
  render() {  
    let data=[]
    var image=[
        'http://image1.jpg',
        'http://image2.jpg',
        'http://image3.jpg'
    ]
    for (var i = 0; i < 50; i++) {
      data.push({"title":"Item "+i,uri:image[parseInt(Math.random()*5)%3]})
    }
    return (
      <View style={{flex:1}}>

        <View style={{flex:1}}>
          <Masonry
            cols={3}
            renderView={this.renderView}
            gridPadding={5}
            gridMargin={5}
            data={data}
            ></Masonry>
        </View>
      </View>

    )
  }
}

export default MasonryExample ;

```

## Usage example 2 (pass onPress event )


```javascript

import {
MasonryImage,Masonry
} from 'rn-masonry';

class CustomView extends Component {

  render() {

    return (
      <TouchableOpacity style={[this.props.style,{backgroundColor:'#ccc'
      ,borderRadius:5}]}
        onPress={this.props.data.onPress}
      >
        <MasonryImage
          resizeMode={"cover"}
          gridWidth={this.props.gridWidth}
          style={{borderRadius:5}}
          source={{uri:this.props.data.uri}}>
        </MasonryImage>
        <Text>{this.props.data.title}</Text>
      </TouchableOpacity>

    )
  }
}

class MasonryExample extends Component {
  renderView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  onPress(data){
    return () =>{
      console.warn(data.title)
    }
  }
  render() {

    let data=[]

    var image=[
        'http://image1.jpg',
        'http://image2.jpg',
        'http://image3.jpg'
    ]
    //this.onPress(data object)
    for (var i = 0; i < 50; i++) {
      data.push({onPress:this.onPress({"title":"Item "+i}),"title":"Item "+i,uri:image[parseInt(Math.random()*5)%3]})
    }

    return (
      <View style={{flex:1}}>

        <View style={{flex:1}}>
          <Masonry
            cols={3}
            renderView={this.renderView}
            gridPadding={5}
            gridMargin={5}
            data={data}
            ></Masonry>
        </View>



      </View>

    )
  }
}

export default MasonryExample ;



```
