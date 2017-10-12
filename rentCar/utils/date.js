var myDate={};
/*小于10时在之前加0*/
function formatTime(str) {
	var str=parseInt(str);
	return str>=10?str:('0'+str);
}
/*将时间转换为日期对象*/
function getDateObj() {
	var now=new Date(),
			year=now.getFullYear(),
			month=now.getMonth()+1,
			date=now.getDate(),
			day=now.getDay();
	month=month<10?('0'+month):month;
	date=date<10?('0'+date):date;
	return {
		year,
		month,
		date,
		day
	}
}
/*根据月份获取天数*/
function monthToDate(month) {
	var months=[1,2,3,4,5,6,7,8,9,10,11,12],
			dates=[31,28,31,30,31,30,31,31,30,31,30,31],
			i=months.filter(v=>v==parseInt(month))[0]-1;
	return dates[i];
}
/*根据日期和星期确定月初的星期数*/
function startWeek(date,day) {
	var date=parseInt(date),
			day=parseInt(day),
			remainder=date%7;
	if(remainder>day) {
		return remainder+2-day;
	} else {
		return day+1-remainder;
	}
}
/*有本月初的星期计算下月的星期数*/
function startToNext(start,date) {
	var week=parseInt(date)%7+parseInt(start);
	return week>7?week-7:week;
}
/*日历*/
function getCalendar() {
	var obj=getDateObj(),
			{year,month,date,day}=obj,
			now,
			endDate,
			first,
			last;
	obj.startDate=`${year}${formatTime(month)}${formatTime(date)}`;
	obj.others=[(parseInt(month)),(parseInt(month)+1),(parseInt(month)+2)].map((_month,index)=>{
		let _year=year;
		if(_month>12) {
			_year=_year+1;
			_month=_month%12;
		}
		let i,j,arr=[],dates=[],_dates=monthToDate(_month);
		if(index==0) {
			first=startWeek(date,day);
		} else {
			first=startToNext(first,last);
		}
		for(i=0;i<first;i++) {
			arr.push('');
		}
		for(j=1;j<=_dates;j++) {
			let o={
				num:formatTime(j),
				dates:`${_year}${formatTime(_month)}${formatTime(j)}`,
				disable:false,
			};
			if(index==0) {
				o.disable=(j<date);
			}
			dates.push(o);
		}
		last=_dates;
		return {
			title:`${_year}年${_month}月`,
			dates:arr.concat(dates)
		}
	});
	obj.endDate=`${obj.others[2].dates[obj.others[2].dates.length-1].dates}`;
	return obj;
}
export {
	getCalendar
}