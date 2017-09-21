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

export {
  sort
}