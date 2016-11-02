module.exports = {
  write : function(input,filepath)
  {
    var fs = require('fs');
    fs.writeFile(filepath,input,function(err)
    {
      if(err)
      {
        return console.log(err);
      }
      else
      {
        console.log("The file was saved!");
      }
    });
  },
  open : function(filepath)
  {
    var fs = require('fs');
    fs.readFile(filepath,'utf8',function(err,data)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        return data;
      }
    });
  }
};
