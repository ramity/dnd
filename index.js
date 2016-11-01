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

  for(i in window.staticMap)
  {
    //cx1 //cx2
    //cy1 //cy2

    cx1 = x;
    cx2 = x + character.size.w;
    cy1 = y;
    cy2 = y + character.size.h;

    ox1 = window.staticMap[i].x;
    ox2 = window.staticMap[i].x + window.staticMap[i].w;
    oy1 = window.staticMap[i].y;
    oy2 = window.staticMap[i].y + window.staticMap[i].h;

    if(cx1 < ox2 && cx2 > ox1 && cy1 < oy2 && cy2 > oy1)
    {
      clear = false;
    }
  }

  if(clear)
  {
    character.x = x;
    character.y = y;
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
    x : 20,
    y : 20,
    size : {
      w : 10,
      h : 10
    },
    speed : {
      x : 1,
      y : 1
    }
  }

  window.tileMap = [
    {
      x : 0,
      y : 0,
      w : 5,
      h : 1
    },
  ];

  window.staticMap = tileMapToStaticMap(tileMap);

  //screen origin variable
  window.origin = {
    x : (canvas.width / 2) - (pixelRatio.w * (character.size.w / 2)),
    y : (canvas.height / 2) - (pixelRatio.h * (character.size.h / 2))
  }
}

function staticPointToDyn(x,y)
{
  cx = (pixelRatio.w * (x - character.x) + origin.x);
  cy = (pixelRatio.h * (y - character.y) + origin.y);

  //return object with corrected x & y
  return {
    x : cx,
    y : cy
  };
}

function tileMapToStaticMap(tilemap)
{
  map = [];

  for(i in tilemap)
  {
    tx = (tilemap[i].x * window.tileSize.w);
    ty = (tilemap[i].y * window.tileSize.h);

    if(!tilemap[i].w && !tilemap[i].h)
    {
      tw = (window.tileSize.w);
      th = (window.tileSize.h);
    }
    else
    {
      tw = (window.tileSize.w * tilemap[i].w);
      th = (window.tileSize.h * tilemap[i].h);
    }

    object = {
      x : tx,
      y : ty,
      w : tw,
      h : th
    };

    map.push(object);
  }

  return map;
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
      ctx.beginPath();
      ctx.rect((pixelRatio.w * ((x * tileSize.w) - character.x) + origin.x),(pixelRatio.h * ((y * tileSize.h) - character.y) + origin.y),(pixelRatio.w * tileSize.w),(pixelRatio.h * tileSize.h));
      ctx.stroke();
    }
  }

  for(i in window.staticMap)
  {
    obj = staticPointToDyn(staticMap[i].x, staticMap[i].y);

    ctx.fillRect(obj.x,obj.y,staticMap[i].w * window.pixelRatio.w,staticMap[i].h * window.pixelRatio.h);
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
