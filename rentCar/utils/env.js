var fileHost="https://szzclh.oss-cn-beijing.aliyuncs.com";

var env = {
  //aliyun OSS env
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: '09FvAQdhQonblIdhyOX1uNXVEEVMD8',
  OSSAccessKeyId: 'LTAIFXmaOUJOrdpI',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = env
