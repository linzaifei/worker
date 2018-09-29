import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import ExpanableList from 'react-native-expandable-section-flatlist';
import SingleCheckBox from "./SingleCheckBox";


export default class WorkSelect extends BaseComponent{
    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>{params.title}</Text>
                </View>
            ),
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }
    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
        this._loadData();
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                selectObject:'',
                data:[],
            };
          }

          render(){
              let self=this;
              return(
                  <View style={styles.container}>
                      <ExpanableList
                          ref={ref => self.expanlist = ref}
                          dataSource={self.state.data}
                          headerKey="name"
                          memberKey="children"
                          renderRow={self._renderItem}
                          renderSectionHeaderX={self._renderSectionHeader}
                      >
                      </ExpanableList>
                  </View>
              );
          }

    _renderSectionHeader=(section, sectionId)=>{
        let self=this;
        return(
            <GWSelectItem
                title={section}
                hasBack={false}
                borderRadius={5}
                editable={false}
                onClickItem={()=>{
                    self.expanlist.setSectionState(sectionId,!self.expanlist.state.memberOpened.get(sectionId));
                    // self.setState({
                    //     selectObject:item.name
                    // });
                }}
            />
        );
    }
    _renderItem=(rowItem, rowId, sectionId)=>{
        let self=this;
        return(
            <SingleCheckBox
                marginTop={5} text={rowItem.name} index={rowId} isSelect={rowItem.selected} onClickItem={()=>{
                if( rowItem.selected==1){
                    rowItem.selected=0;
                }else{
                    rowItem.selected=1;
                }
                const tempdata=self.state.data;
                console.log("2222"+JSON.stringify(tempdata));
                console.log("rowId"+rowId+"sectionId"+sectionId);
                tempdata[sectionId].children[rowId]=rowItem;
                console.log("111"+JSON.stringify(tempdata));
                self.setState({
                    data:tempdata
                })
            }}
            />
        )
    }

    _submit=()=>{
        var self = this;
        const {
            selectObject
        }=self.state

        if (!selectObject){
            return;
        }
        console.log('======'+selectObject);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(selectObject)
        }
        this.props.navigation.goBack();
    }

    _loadData(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.querySelectedJobType,{"workerId":0},function (ret) {
            console.log("success"+JSON.stringify(ret))
            self.setState({
                data:ret,
                // data:this.state.data.concat(ret.value),
            })
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
        flex: 1,
        // paddingTop:5,
        // paddingLeft:5,
        // paddingRight:5,
        // paddingBottom:20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#fff'
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});