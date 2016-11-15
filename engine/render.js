module.exports = {
  clearCanvas : function()
  {
    if(window.ctx && window.canvas)
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
  drawGrid : function()
  {
    for(x=0;x<tileCount.w/tileSize.w;x++)
    {
      for(y=0;y<tileCount.h/tileSize.h;y++)
      {
        ctx.beginPath();
        ctx.rect((pixelRatio.w * ((x * tileSize.w) - player.x) + origin.x),(pixelRatio.h * ((y * tileSize.h) - player.y) + origin.y),(pixelRatio.w * tileSize.w),(pixelRatio.h * tileSize.h));
        ctx.stroke();
      }
    }
  },
  drawStaticMap : function()
  {
    const pos = require('./position.js');

    for(i in window.staticMap)
    {
      obj = pos.staticPointToDyn(staticMap[i].x, staticMap[i].y);

      ctx.fillRect(obj.x,obj.y,staticMap[i].w * window.pixelRatio.w,staticMap[i].h * window.pixelRatio.h);
    }
  },
  drawEventMap : function()
  {
    const pos = require('./position.js');

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

    this.resetStyles();
  },
  drawPlayer : function()
  {
    window.player.deg = -Math.atan2(cursor.x - (window.canvas.width / 2), cursor.y - (window.canvas.height / 2)) + Math.PI / 2;

    image = document.getElementById('player');

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(player.deg);

    ctx.drawImage(image, -(pixelRatio.w * player.size.w)/2, -(pixelRatio.h * player.size.h)/2, pixelRatio.w * player.size.w, pixelRatio.h * player.size.h);

    ctx.rotate(-player.deg);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  },
  drawCursor : function()
  {
    if(cursor.x > 0 && cursor.y > 0)
    {
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(cursor.x, cursor.y);
      ctx.stroke();
    }
  },
  drawBullets : function()
  {
    const pos = require('./position.js');

    for(i in bullets)
    {
      obj = pos.staticPointToDyn(bullets[i].dx, bullets[i].dy);

      ctx.beginPath();
      ctx.arc(obj.x, obj.y, bullets[i].size.w, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  },
  drawUI : function()
  {
    //tx2,ty2 //tx2+tw,ty2
    //tx1,ty1 //tx1+tw,ty1
    tw = 400;
    th = 20;
    to = 5;

    tx1 = to + 0;
    tx2 = to + 10;
    ty1 = canvas.height - to;
    ty2 = canvas.height - to - th;

    ctx.beginPath();
    ctx.moveTo(tx1,ty1);
    ctx.lineTo(tx2,ty2);
    ctx.lineTo(tx2 + tw, ty2);
    ctx.lineTo(tw, ty1);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#2ecc71';

    tw = 400 * (player.stats.health / player.stats.hitPoints);

    ctx.beginPath();
    ctx.moveTo(tx1 + 3,ty1 - 2);
    ctx.lineTo(tx2 + 1,ty2 + 2);
    ctx.lineTo(tx2 + tw - 3.5, ty2 + 2);
    ctx.lineTo(tw - 1, ty1 - 2);
    ctx.closePath();
    ctx.fill();

    this.resetStyles();
  },
  resetStyles : function()
  {
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';
  }
};
