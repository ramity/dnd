module.exports = {
  staticPointToDyn : function(x,y) {
    //return object with corrected x & y
    return {
      x : (window.pixelRatio.w * (x - window.character.x) + window.origin.x),
      y : (window.pixelRatio.h * (y - window.character.y) + window.origin.y)
    };
  },
  tileMapToStaticMap : function(tilemap)
  {
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

      tilemap[i].y = ty;
      tilemap[i].x = tx;
      tilemap[i].w = tw;
      tilemap[i].h = th;
    }

    return tilemap;
  }
};
