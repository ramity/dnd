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

  for(i in window.map.logic)
  {
    if(between(x,window.map.logic[i].x,window.map.logic[i].x+window.tileSize.w))
    {
      if(between(y,window.map.logic[i].y,window.map.logic[i].y+window.tileSize.h))
      {
        clear = false;
      }
    }
    if(between(x+window.tileSize.w,window.map.logic[i].x,window.map.logic[i].x+window.tileSize.w))
    {
      if(between(y,window.map.logic[i].y,window.map.logic[i].y+window.tileSize.h))
      {
        clear = false;
      }
    }
    if(between(x,window.map.logic[i].x,window.map.logic[i].x+window.tileSize.w))
    {
      if(between(y+window.tileSize.h,window.map.logic[i].y,window.map.logic[i].y+window.tileSize.h))
      {
        clear = false;
      }
    }
    if(between(x+window.tileSize.w,window.map.logic[i].x,window.map.logic[i].x+window.tileSize.w))
    {
      if(between(y+window.tileSize.h,window.map.logic[i].y,window.map.logic[i].y+window.tileSize.h))
      {
        clear = false;
      }
    }
  }

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

function between(value,min,max)
{
  if(min <= value)
  {
    if(value <= max)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}

function initDisplay()
{
  window.canvas = document.getElementById('display');
  window.canvas.width = window.innerWidth;
  window.canvas.height = window.innerHeight;
  window.ctx = canvas.getContext('2d');

  window.offset = 0.5;

  window.tileCount = {
    w : 31,
    h : 19
  };

  window.tileSize = {
    w : canvas.width / tileCount.w,
    h : canvas.height / tileCount.h
  };

  window.stepsPerTile = {
    x : 10,
    y : 10
  };

  window.map = {
    display : [
      {
        x: -2 * window.tileSize.w,
        y: -2 * window.tileSize.h
      }
    ],
    logic : [
      {
        x: -2 * window.stepsPerTile.x,
        y: -2 * window.stepsPerTile.y
      }
    ]
  };

  window.character = {
    display_x : (window.canvas.width / 2) - (window.tileSize.w / 2) + window.offset,
    display_y : (window.canvas.height / 2) - (window.tileSize.h / 2) + window.offset,
    x : 0,
    y : 0,
    speed : {
      x : window.tileSize.w / window.stepsPerTile.x,
      y : window.tileSize.h / window.stepsPerTile.y
    }
  };
}

function main()
{
  render();
}

function render()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(window.character.display_x,window.character.display_y,window.tileSize.w,window.tileSize.h);

  for(y=0;y<window.tileCount.h;y++)
  {
    for(x=0;x<window.tileCount.w;x++)
    {
      xpos = -window.character.x + (x * window.tileSize.w) + offset;
      ypos = -window.character.y + (y * window.tileSize.h) + offset;
      ctx.strokeRect(xpos,ypos,window.tileSize.w,window.tileSize.h);
    }
  }

  for(i in window.map.display)
  {
    ctx.fillStyle="#F00";
    mapx = -window.character.x + window.character.display_x + window.map.display[i].x;
    mapy = -window.character.y + window.character.display_y + window.map.display[i].y;
    ctx.fillRect(mapx,mapy,window.tileSize.w,window.tileSize.h);
    ctx.fillStyle="#000";
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
