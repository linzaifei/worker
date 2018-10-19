import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class GWCalendars extends Component {


    constructor(props) {
        super(props);

        this.state={
            data:{
                '2018-10-23': {selected: true,startingDay:true, endingDay: true, color: 'green'},
                '2018-10-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
            }
        }

    }


    render() {
        const {
            data,
        }=this.state;
        return (
            <Calendar
                // Collection of dates that have to be colored in a special way. Default = {}
                markedDates={data}
                markingType={'period'}
                onDayPress={(day) => {
                    console.log(JSON.stringify(day))
                    this.state.data[day.dateString] =  {selected: true,startingDay:true, endingDay: true, color: 'green',}
                    this.setState({
                        data:this.state.data,
                    },()=>{
                        console.log(JSON.stringify(this.state.data))
                    })
                }}
            />
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});