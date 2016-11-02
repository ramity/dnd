(function(){
  //write('Hi','./engine/data/1.json');
  //open('./engine/data/1.json');
  const file = require('./engine/file.js');

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
  const pos = require('./engine/position.js');

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
      w : 10,
      h : 1
    },
    {
      x : 0,
      y : 1,
      w : 1,
      h : 3
    },
    {
      x : 0,
      y : 4,
      w : 10,
      h : 1
    },
  ];

  window.staticMap = pos.tileMapToStaticMap(tileMap);

  window.tileEventMap = [
    {
      x : 7,
      y : 1,
      w : 3,
      h : 3,
      style : {
        color : '#2ecc71'
      }
    }
  ];

  window.eventMap = pos.tileMapToStaticMap(tileEventMap);

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
  const pos = require('./engine/position.js');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';

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
    obj = pos.staticPointToDyn(staticMap[i].x, staticMap[i].y);

    ctx.fillRect(obj.x,obj.y,staticMap[i].w * window.pixelRatio.w,staticMap[i].h * window.pixelRatio.h);
  }

  for(i in window.eventMap)
  {
    obj = pos.staticPointToDyn(eventMap[i].x, eventMap[i].y);

    if(window.eventMap[i].style)
    {
      if(window.eventMap[i].style.color)
      {
        ctx.fillStyle = window.eventMap[i].style.color;
      }
    }

    ctx.fillRect(obj.x,obj.y,eventMap[i].w * window.pixelRatio.w,eventMap[i].h * window.pixelRatio.h);
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(origin.x + offset, origin.y + offset, pixelRatio.w * character.size.w, pixelRatio.h * character.size.h);
}
