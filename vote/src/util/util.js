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
var u={};
u.setStore=function(name,value) {
	switch(typeof name) {
		case 'string':
			window.localStorage[name]=value;
			break;
		case 'object':
			for(let i in name) {
				if(name.hasOwnProperty(i)) {
					window.localStorage[i]=name[i];
				}
			}
			break;
	}
}
u.getStore=function(name) {
	return window.localStorage[name];
}
u.setCookie=function(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//取回cookie
u.getCookie=function(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
}

export {
  sort,
  u
}
