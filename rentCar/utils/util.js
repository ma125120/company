function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')

  //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var req=function(options,fn=wx.request) {
    var options=options||{},url;
    if(typeof options=='string') {
      url=options;
      options={};
      options.url=url;
    }
    return new Promise((resolve, reject) => {
      options.success=resolve;
      options.fail=reject;
      options.dataType='json';
      fn(options);
    });
}

var toDate=function(data) {
  var obj=data;
  for(let i=0,len=obj.length;i<len;i++) {
    obj[i].times=formatTime(new Date(obj[i].created));
  }
  return obj
}
var toast=function(title='未知错误') {
  wx.showToast({
    title: title,
    duration: 1500
  })
};
var sort=function(array,type,asc) {
    var asc=asc||false;
    array.sort(function(a,b) {
      if(!asc) {
        return parseFloat(b[type])-parseFloat(a[type]);
      } else {
        return parseFloat(a[type])-parseFloat(b[type]);
      }
    });
};
var toPre=function(obj) {
  var arr=[],
      o={};
  if(Array.isArray(obj)) {
    let i=0,len=obj.length;
    obj.map((v)=>{
      let str="";
      if(v.type==1) {
        str=`满${v.thrshold}减${v.minus_price}`;
      } else if(v.type==2) {
        str=`打${v.discount}折`;
      }
      v.descript=str;
      return v;
    });
    return obj;
  }
};

var checkForm=function(data,...args) {
  var result={},flag=true;
  var reg={
    username:/^\w{4,}$/,
    password:/^\w{4,}$/,
    tel:/^\d{11}$/,
    real_name:/^\w{2,5}$/
  };
  for( let i=0,len=args.length;i<len;i++) {
    let r=args[i].reg||reg[args[i].type];
    if(data[args[i].name]=="") {
      result={
        flag:false,
        msg:'输入不能为空'
      };
      break;
    }
    if(!r.test(data[args[i].name])) {
      result={
        flag:false,
        msg:args[i].msg
      };
      break;
    }
  }
  return result;
};
var filter=function(array,type,value) {
    var arr=[];
    arr=array.filter(function(a) { 
      if(a[type])
      return a[type].toString().indexOf(value)!=-1;
    });
    return arr;
};

var checkSpace=function(data,...args) {
  var space=false;
  if(args.length>0) {
    for(let i=0,len=args.length;i<len;i++) {
      if(data[args[i]]=="") {
        space=true;
        break;
      }
    }
  } else {
    for(let i in data) {
      if(data.hasOwnProperty(i)&&data[i]==""&&data[i]!=0) {
        space=true;
      }
    }
  }
  return space;
}

export {
  formatTime,
  req,
  toPre,
  toast,
  sort,
  checkForm,
  toDate,
  filter,
  checkSpace
}

