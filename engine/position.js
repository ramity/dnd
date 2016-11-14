module.exports = {
  staticPointToDyn : function(x,y) {
    //return object with corrected x & y
    return {
      x : (window.pixelRatio.w * (x - window.player.x) + window.origin.x),
      y : (window.pixelRatio.h * (y - window.player.y) + window.origin.y)
    };
  },
  tileMapToStaticMap : function(tilemap) {
    for(i in tilemap) {
      tx = (tilemap[i].x * window.tileSize.w);
      ty = (tilemap[i].y * window.tileSize.h);

      if(!tilemap[i].w && !tilemap[i].h) {
        tw = (window.tileSize.w);
        th = (window.tileSize.h);
      } else {
        tw = (window.tileSize.w * tilemap[i].w);
        th = (window.tileSize.h * tilemap[i].h);
      }

      tilemap[i].y = ty;
      tilemap[i].x = tx;
      tilemap[i].w = tw;
      tilemap[i].h = th;
    }

    return tilemap;
  },
  checkCollision : function(x, y, w, h)
  {
    for(i in window.staticMap)
    {
      //cx1 //cx2
      //cy1 //cy2

      cx1 = x;
      cx2 = x + w;
      cy1 = y;
      cy2 = y + h;

      ox1 = window.staticMap[i].x;
      ox2 = window.staticMap[i].x + window.staticMap[i].w;
      oy1 = window.staticMap[i].y;
      oy2 = window.staticMap[i].y + window.staticMap[i].h;

      if(cx1 < ox2 && cx2 > ox1 && cy1 < oy2 && cy2 > oy1)
      {
        return false;
      }
    }

    return true;
  }
};
