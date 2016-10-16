(function(){
  setInterval(main,20);

  initDisplay();

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'lcb005',
    password : 'Gr33ndayadminuark',
    database : 'dnd'
  });

  connection.connect();

  connection.query("SELECT * FROM users", function(err, rows, fields)
  {
    if(err) throw err;

    console.log(rows);
  });

  connection.end();
})();

function initDisplay()
{
  window.canvas = document.getElementById('display');
  window.canvas.width = window.innerWidth;
  window.canvas.height = window.innerHeight;
  window.ctx = canvas.getContext('2d');
  window.character = {
    display_x : (window.canvas.width / 2),
    display_y : (window.canvas.height / 2),
    x : 0,
    y : 0
  };
  window.bullets = [];
  window.cursor = {
    x : 0,
    y : 0
  };
  canvas.addEventListener('mousemove', function(event)
  {
    cursor = {
      x : event.clientX,
      y : event.clientY
    };
  });
  canvas.addEventListener('click', function(event)
  {
    createBullet();
  });
}

function createBullet()
{
  angle = Math.atan2(cursor.x - character.display_x, cursor.y - character.display_y);
  xv = 50 * Math.sin(angle);
  yv = 50 * Math.cos(angle);

  bullets.push({
    angle : angle,
    x : character.display_x,
    xv : xv,
    y : character.display_y,
    yv : yv
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
    bullets[i].x += bullets[i].xv;
    bullets[i].y += bullets[i].yv;
  }
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

  for(i in bullets)
  {
    ctx.beginPath();
    ctx.arc(bullets[i].x + 0.5, bullets[i].y + 0.5, 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
