module.exports = {
  staticPointToDyn : function(x,y) {
    cx = (pixelRatio.w * (x - character.x) + origin.x);
    cy = (pixelRatio.h * (y - character.y) + origin.y);

    //return object with corrected x & y
    return {
      x : cx,
      y : cy
    };
  },
  tileMapToStaticMap : function(tilemap)
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

      if(tilemap[i].style)
      {
        object.style = tilemap[i].style
      }

      map.push(object);
    }

    return map;
  }
};
