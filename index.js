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

  kd.W.down(function(){testMove(player.x,player.y-player.speed.y)});
  kd.A.down(function(){testMove(player.x-player.speed.x,player.y)});
  kd.S.down(function(){testMove(player.x,player.y+player.speed.y)});
  kd.D.down(function(){testMove(player.x+player.speed.x,player.y)});
}

function testMove(x,y)
{
  clear = true;

  for(i in window.staticMap)
  {
    //cx1 //cx2
    //cy1 //cy2

    cx1 = x;
    cx2 = x + player.size.w;
    cy1 = y;
    cy2 = y + player.size.h;

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
    player.x = x;
    player.y = y;
  }
}

function initDisplay()
{
  const pos = require('./engine/position.js');

  window.bullets = [];

  //define canvas related variables
  window.canvas = document.getElementById('display');
  window.canvas.width = window.innerWidth;
  window.canvas.height = window.innerHeight;

  //player variable logic
  window.player = {
    x : 20,
    y : 20,
    size : {
      w : 10,
      h : 10
    },
    speed : {
      x : 1,
      y : 1
    },
    stats : {
      health : 100,
      mana : 100,
      stamina : 100,

      xp : 0,
      level : 1,
      attack : 1,
      defense : 1,
      hitPoints : 100,
      range : 1,
      magic : 1,
      cooking : 1,
      woodCutting : 1,
      fishing : 1,
      fireMaking : 1,
      crafting : 1,
      smithing : 1,
      mining : 1,
      steal : 1,
    }
  }

  window.ctx = canvas.getContext('2d');

  window.cursor = {
    x : -1,
    y : -1
  };

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

  canvas.addEventListener('mousemove', function(event)
  {
    window.cursor = {
      x : event.clientX,
      y : event.clientY
    };
  });

  canvas.addEventListener('click', function(event)
  {
    createBullet();
  });

  window.eventMap = pos.tileMapToStaticMap(tileEventMap);

  window.staticMap = pos.tileMapToStaticMap(tileMap);

  //defines pixelPerTile
  window.pixelRatio = {
    w : canvas.width / tileCount.w,
    h : canvas.height / tileCount.h
  }

  //screen origin variable
  window.origin = {
    x : (canvas.width / 2) - (pixelRatio.w * (player.size.w / 2)),
    y : (canvas.height / 2) - (pixelRatio.h * (player.size.h / 2))
  }
}

function createBullet()
{
  angle = Math.atan2(cursor.x - (window.canvas.width / 2), cursor.y - (window.canvas.height / 2));

  xv = 10 * Math.sin(angle);
  yv = 10 * Math.cos(angle);

  bullets.push({
    angle : angle,
    x : (window.pixelRatio.w * (player.size.w / 2)) + origin.x,
    xs : player.x + (player.size.w / 2),
    xv : xv,
    y : (window.pixelRatio.h * (player.size.h / 2)) + origin.y,
    ys : player.y + (player.size.h / 2),
    yv : yv,
    distance : 0
  });
}

function main()
{
  render();
  updateBulletPositions();
}

function updateBulletPositions()
{
  for(var i in bullets)
  {
    if(bullets[i].distance < 666)
    {
      bullets[i].x += bullets[i].xv;
      bullets[i].y += bullets[i].yv;

      movement = Math.sqrt(Math.pow(bullets[i].xv, 2) + Math.pow(bullets[i].yv, 2));

      bullets[i].distance += movement;
    }
    else
    {
      bullets.splice(i, 1);
    }
  }
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
      ctx.rect((pixelRatio.w * ((x * tileSize.w) - player.x) + origin.x),(pixelRatio.h * ((y * tileSize.h) - player.y) + origin.y),(pixelRatio.w * tileSize.w),(pixelRatio.h * tileSize.h));
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
  ctx.fillRect(origin.x + offset, origin.y + offset, pixelRatio.w * player.size.w, pixelRatio.h * player.size.h);

  if(cursor.x > 0 && cursor.y > 0)
  {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();
  }

  for(i in bullets)
  {
    obj = pos.staticPointToDyn(
      (bullets[i].xs - (player.x + (player.size.w / 2))),
      (bullets[i].ys - (player.y + (player.size.h / 2)))
    );

    ctx.beginPath();
    ctx.arc(
      bullets[i].x + obj.x - (canvas.width / 2) + ((player.x + (player.size.w / 2)) * pixelRatio.w),
      bullets[i].y + obj.y - (canvas.height / 2) + ((player.y + (player.size.h / 2)) * pixelRatio.h),
      2,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }
}
