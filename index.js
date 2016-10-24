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

  window.tileCount = {
    x : 36,
    y : 27
  };

  window.tileSize = {
    x : canvas.width / tileCount.x,
    y : canvas.height / tileCount.y
  };

  window.character = {
    display_x : (window.canvas.width / 2),
    display_y : (window.canvas.height / 2),
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

  ctx.beginPath();
  ctx.arc(character.display_x + 0.5, character.display_y + 0.5, 5, 0, 2 * Math.PI, false);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(character.display_x + 0.5, character.display_y + 0.5);
  ctx.lineTo(cursor.x + 0.5, cursor.y + 0.5);
  ctx.stroke();
}
