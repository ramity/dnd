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

  window.weapons = {
    pistol : {
      stats : {
        //damage drop
        damage : function(distance) {
          if(distance > 0 && distance <= 300)
          {
            return 15
          }
          else if (distance > 300 && distance <= 600)
          {
            return 10;
          }
        },
        reloadTime : {
          active : 1000,
          empty : 1250
        },
        magSize : 40,
        spread : Math.PI/20,
        fireRate : 2,
        mobility : 1
      },
      bullet : {
        size : 2,
        color : '#000',
        speed : 5
      }
    }
  }

  //player variable logic
  window.player = {
    x : 20,
    y : 20,
    deg : 0,
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
    },
    inventory : [],

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
  angle = Math.atan2(cursor.y - (window.canvas.height / 2), cursor.x - (window.canvas.width / 2));

  xv = 5 * Math.cos(angle);
  yv = 5 * Math.sin(angle);

  bullets.push({
    dx : player.x + (player.size.w / 2),
    dy : player.y + (player.size.h / 2),
    ox : player.x + (player.size.w / 2),
    oy : player.y + (player.size.h / 2),
    xv : xv,
    yv : yv,
    //overwrite size via weapon in use
    size : {
      w : 2,
      h : 2
    },
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
  const pos = require('./engine/position.js');

  for(var i in bullets)
  {
    console.log(bullets[i]);

    if(bullets[i].distance <= 600)
    {
      if(pos.checkCollision(bullets[i].dx, bullets[i].dy, bullets[i].xv, bullets[i].yv))
      {
        bullets[i].dx += bullets[i].xv;
        bullets[i].dy += bullets[i].yv;

        movement = Math.sqrt(Math.pow(bullets[i].xv, 2) + Math.pow(bullets[i].yv, 2));

        bullets[i].distance += movement;

        console.log(bullets[i].distance);
      }
      else
      {
        bullets.splice(i, 1);
      }
    }
    else
    {
      bullets.splice(i, 1);
    }
  }
}

function render()
{
  //requires
  const ren = require('./engine/render.js');

  //init fillStyle
  ctx.fillStyle = '#000';

  ren.clearCanvas();
  ren.drawGrid();
  ren.drawStaticMap();
  ren.drawEventMap();
  ren.drawPlayer();
  ren.drawCursor();
  ren.drawBullets();
  ren.drawUI();
}
