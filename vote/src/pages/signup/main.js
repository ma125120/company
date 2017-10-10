$(function() {
	var isUpload=false,
		form={
			us_pic1:true,
			us_pic2:true,
			us_pic3:true,
			us_name:true,
			us_sex:false,
			us_age:true,
			introduce:true,
			activity_id:false
		};
	/*触发图片选择*/
	$(document).on("click",".file_div",function() {
		var id=$(this).data("id");
		$("#"+id).click();
	});
	/*图片预览*/
	$(document).on("change",".file input",function(e) {
		var t=$(this),file=t[0].files[0]; 
	    if(!/image\/\w+/.test(file.type)){  
	        alert("看清楚呦，这个需要图片！");  
	        return false;  
	    } 
	    //form[t.name]=false;
	    var reader = new FileReader();  
	    reader.readAsDataURL(file);  
	    reader.onload=function(e){  
	        var imgEle=t.siblings("img");
	        imgEle.attr("src",this.result).show();
	        t.siblings(".file_div").hide();
	    }   
	});
	/*输入框的值改变时判断是否为空*/
	$("input,textarea,select").on("change",function(e) {
		var t=$(this),val=$(this).val(),
			name=t.attr("name");console.log(val)
		if(val.trim()=="") {
			form[name]=true;
		} else {
			form[name]=false;
		}
	});
	/*为空时不进行表单录入*/
	$(document).on("click","#submit",function() {
		if(!isUpload) {
			var flag=true;console.log(form)
			for(var i in form) {
				if(form.hasOwnProperty(i)) {	
					if(form[i])	{
						flag=false;
						break;
					}
				}
			}
			if(!flag) {
				alert("请检查您的输入!");
			}
			return flag;
		} else {
			alert("正在提交，请稍后！");
			return false;
		}
		
	});

	/*获取活动id*/
	$.getJSON("https://dev.bchltech.cn/activity/getac.htm",function(res) {
		var lists=res.data.activityList,
				str="";
		for(var i=0,len=lists.length;i<len;i++) {
			if(i==0) {
				str+="<option value='"+lists[i]._id+"' selected>"+lists[i].ac_title+"</option>"
			} else {
				str+="<option value='"+lists[i]._id+"'>"+lists[i].ac_title+"</option>";
			}
		}
		$("#ac_id").empty().append(str);
	})
});