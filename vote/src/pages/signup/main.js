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
			name=t.attr("name");
		if(val.trim()=="") {
			form[name]=true;
		} else {
			form[name]=false;
		}
	});
	/*为空时不进行表单录入*/
	$(document).on("click","#submit",function(e) {
		e.preventDefault();
		var age=$("#us_age1").val();
		if(!age.match(/^(\d){1,3}$/g)) {
			alert("年龄必须为数字");
			return false;
		} else if(parseInt(age)<=0||parseInt(age)>110) {
			alert("年龄大小填写不合法！");
			return false;
		}
 		if(!isUpload) {
			var flag=true;
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
				return false;
			}
			var data=new FormData($("#form")[0]);
			$.ajax({
				url:'https://dev.bchltech.cn/activity/apply.htm',
				data:data,  
        type: 'POST',   
        dataType: 'JSON',  
        cache: false,  
        processData: false,  
        contentType: false,
        success:function(json) {
        	if(json.state==0) {
        		alert("报名成功");
        	} else {
        		alert("报名失败");
        	}
        }
			});
			return false;
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