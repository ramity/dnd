(function(){
  //write('Hi','./engine/data/1.json');
  //open('./engine/data/1.json');
  initDisplay();
  initMovement();
  setInterval(main,20);
})();

function initMovement()
{
  const kd = require('keydrown');

  kd.run(function () {
    kd.tick();
  });

  kd.W.down(function(){testMove(character.x,character.y-character.speed.y)});
  kd.A.down(function(){testMove(character.x-character.speed.x,character.y)});
  kd.S.down(function(){testMove(character.x,character.y+character.speed.y)});
  kd.D.down(function(){testMove(character.x+character.speed.x,character.y)});
}

function testMove(x,y)
{
  clear = true;

  if(clear)
  {
    character.x = x;
    character.y = y;
    console.log("T " + x,y);
  }
  else
  {
    console.log("F " + x,y);
  }
}

function initDisplay()
{
  //define canvas related variables
  window.canvas = document.getElementById('display');
  window.canvas.width = window.innerWidth;
  window.canvas.height = window.innerHeight;
  window.ctx = canvas.getContext('2d');

  //defines offset placed onto canvas
  window.offset = 0.5;

  //defines number of total tiles per w/h
  window.tileCount = {
    w : 310,
    h : 190
  };

  window.tileSize = {
    w : 10,
    h : 10
  }

  //defines pixelPerTile
  window.pixelRatio = {
    w : canvas.width / tileCount.w,
    h : canvas.height / tileCount.h
  }

  //character variable logic
  window.character = {
    x : 0,
    y : 0,
    size : {
      w : 10,
      h : 10
    },
    speed : {
      x : 1,
      y : 1
    }
  }

  //screen origin variable
  window.origin = {
    x : (canvas.width / 2) - (pixelRatio.w * (character.size.w / 2)),
    y : (canvas.height / 2) - (pixelRatio.h * (character.size.h / 2))
  }
}

function main()
{
  render();
}

function render()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(origin.x + offset, origin.y + offset, pixelRatio.w * character.size.w, pixelRatio.h * character.size.h);

  for(x=0;x<tileCount.w/tileSize.w;x++)
  {
    for(y=0;y<tileCount.h/tileSize.h;y++)
    {
      ctx.rect((pixelRatio.w * (x * tileSize.w)),(pixelRatio.h * (y * tileSize.h)),(pixelRatio.w * tileSize.w),(pixelRatio.h * tileSize.h));
      ctx.stroke();
    }
  }
}

function write(input,filepath)
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
}

function open(filepath)
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
