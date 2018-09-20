
import Picker from 'react-native-picker'


function _createDateData(hasDay) {
    let date = [];
    for(let i=1970;i<2020;i++){
        let month = [];
        for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k);
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k);
                    }
                }
                let _month = {};
                _month[j] = day;
                month.push(_month);
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
    return date;
}

function _createDate() {
    let date = [];
    for(let i=1970;i<2020;i++){
        let month = [];
        for(let j = 1;j<13;j++){
           month.push(j)
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
    return date;
}


function _getDate() {
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [];

    for(let i=1;i<51;i++){
        years.push(i+1980);
    }
    for(let i=1;i<13;i++){
        months.push(i);
        // hours.push(i);
    }
    for(let i=1;i<24;i++){
        // months.push(i);
        hours.push(i);
    }

    for(let i=1;i<32;i++){
        days.push(i);
    }
    for(let i=1;i<60;i++){
        minutes.push(i);
    }
    return [years, months, days, hours, minutes];
}

function showTimePicker(title,select) {

    let date = new Date();
    let selectedValue = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours() ,
        date.getMinutes()
    ];
    Picker.init({
        pickerData:_getDate(),
        selectedValue,
        pickerTitleText:title,
        pickerConfirmBtnText:'确定',
        pickerCancelBtnText:'取消',
        pickerConfirmBtnColor:[51,51,51,1],
        pickerCancelBtnColor:[51,51,51,1],
        pickerToolBarBg:[220,220,220,1],
        pickerBg:[255,255,255,1],
        wheelFlex: [2, 1, 1, 1, 1],
        onPickerConfirm: (pickedValue, pickedIndex) => {
            select(pickedValue,pickedIndex)
        },
        onPickerCancel: pickedValue => {
            console.log('area', pickedValue);
        },
        onPickerSelect: pickedValue => {
            let targetValue = [...pickedValue];
            if(parseInt(targetValue[1]) === 2){
                if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                    targetValue[2] = 29;
                }
                else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                    targetValue[2] = 28;
                }
            }
            else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                targetValue[2] = 30;

            }
            // forbidden some value such as some 2.29, 4.31, 6.31...
            if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                // android will return String all the time，but we put Number into picker at first
                // so we need to convert them to Number again
                targetValue.map((v, k) => {
                    if(k !== 3){
                        targetValue[k] = parseInt(v);
                    }
                });
                Picker.select(targetValue);
                pickedValue = targetValue;
            }
        }
    });
    Picker.show();
}


//普通选择
function showPicker(data,title,select) {
    Picker.init({
        pickerTitleText:title,
        pickerConfirmBtnText:'确定',
        pickerCancelBtnText:'取消',
        pickerConfirmBtnColor:[51,51,51,1],
        pickerCancelBtnColor:[51,51,51,1],
        pickerToolBarBg:[220,220,220,1],
        pickerBg:[255,255,255,1],
        pickerData: data,
        onPickerConfirm: (pickedValue, pickedIndex) => {
            select(pickedValue,pickedIndex)
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
        }
    });
    Picker.show();
}

function showDatePicker(title,day,select) {
    let date = new Date();

    let selectedValue = [
        date.getFullYear(),
        date.getMonth()+1,
    ];
    Picker.init({
        pickerTitleText:title,
        pickerConfirmBtnText:'确定',
        pickerCancelBtnText:'取消',
        pickerConfirmBtnColor:[51,51,51,1],
        pickerCancelBtnColor:[51,51,51,1],
        pickerToolBarBg:[220,220,220,1],
        pickerBg:[255,255,255,1],
        pickerData:day? _createDateData():_createDate(),
        pickerFontColor: [51,51,51,1],
        selectedValue,
        onPickerConfirm: (pickedValue, pickedIndex) => {
            select(pickedValue,pickedIndex)
        },
        onPickerCancel: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
        },
        onPickerSelect: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
        }
    });
    Picker.show();
}


export default {
    showPicker,showDatePicker,showTimePicker
}