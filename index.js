(function(){
  initDisplay();
  setInterval(main,20);
})();

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

  window.character = {
    display_x : (window.canvas.width / 2) - (window.tileSize.w / 2) + window.offset,
    display_y : (window.canvas.height / 2) - (window.tileSize.h / 2) + window.offset,
    x : 0,
    y : 0
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
      xpos = (x * window.tileSize.w) + offset;
      ypos = (y * window.tileSize.h) + offset;
      ctx.strokeRect(xpos,ypos,window.tileSize.w,window.tileSize.h);
    }
  }
}
