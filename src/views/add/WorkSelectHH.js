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
import ExpanableList from 'react-native-expandable-section-flatlist';
import SingleCheckBox from "./SingleCheckBox";


export default class WorkSelectHH extends BaseComponent{
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
        this._loadData(this.props.navigation.state.params.workId);
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
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
                      {this._Alert()}
                  </View>
              );
          }

    _renderSectionHeader=(section, sectionId)=>{
        let self=this;
        let headerItem=self.state.data[sectionId];
        return(
            <SingleCheckBox
                marginTop={5} text={section} backgroundColor={'#e8eef6'} index={sectionId} isSelect={headerItem.selected} onClickItem={()=>{
                self.expanlist.setSectionState(sectionId,!self.expanlist.state.memberOpened.get(sectionId));
            }}
                onCLickImgItem={()=>{
                    if( headerItem.selected==1){
                        headerItem.selected=0;
                    }else{
                        headerItem.selected=1;
                    }
                    const tempdata=self.state.data;
                    tempdata[sectionId]=headerItem;
                    for(let i=0;i< tempdata[sectionId].children.length;i++){
                        tempdata[sectionId].children[i].selected=headerItem.selected;
                    }
                    self.expanlist.setSectionState(sectionId,self.expanlist.state.memberOpened.get(sectionId));
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
                tempdata[sectionId].children[rowId]=rowItem;
                var childerSelect=0;
                for(let i=0;i<tempdata[sectionId].children.length;i++){
                    if(tempdata[sectionId].children[i].selected==1){
                        childerSelect=1;
                        break;
                    }
                }
                if(childerSelect==0){
                    tempdata[sectionId].selected=0;
                }else{
                    tempdata[sectionId].selected=1;
                }
                self.expanlist.setSectionState(sectionId,self.expanlist.state.memberOpened.get(sectionId));
            }}
                onCLickImgItem={()=>{
                    if( rowItem.selected==1){
                        rowItem.selected=0;
                    }else{
                        rowItem.selected=1;
                    }
                    const tempdata=self.state.data;
                    tempdata[sectionId].children[rowId]=rowItem;
                    var childerSelect=0;
                    for(let i=0;i<tempdata[sectionId].children.length;i++){
                        if(tempdata[sectionId].children[i].selected==1){
                            childerSelect=1;
                            break;
                        }
                    }
                    if(childerSelect==0){
                        tempdata[sectionId].selected=0;
                    }else{
                        tempdata[sectionId].selected=1;
                    }
                    self.expanlist.setSectionState(sectionId,self.expanlist.state.memberOpened.get(sectionId));
                }}
            />
        )
    }

    _submit=()=>{
        var self = this;
        const {
            data
        }=self.state;
        var selectItem=[];
        var tempData=JSON.parse( JSON.stringify(data));
        for(let i=0;i<tempData.length;i++){
            let headerItem=tempData[i];
            for(let j=0;j<headerItem.children.length;j++){
                if(headerItem.children[j].selected==1){
                    selectItem.push(headerItem.children[j]);
                }
            }
        }
        if(selectItem.length<=0){
            self.dropdown.alertWithType('info','请选择工种','');
            return;
        }
        var workstr='';
        for(let i=0;i<selectItem.length;i++){
            // selectItem[i].children=null;//去掉大类中的子类
            if(i==selectItem.length-1){
                workstr=workstr+selectItem[i].name;
            }else{
                workstr=workstr+selectItem[i].name+",";
            }
        }
        console.log('======'+workstr);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(selectItem,workstr)
        }
        this.props.navigation.goBack();
    }

    _loadData(workerId){
        var self = this;
        gwrequest.gw_tokenRequest(urls.querySelectedJobType,{"workerId":workerId},function (ret) {
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