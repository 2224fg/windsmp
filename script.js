const SERVER_IP = "WindSMP.pl";

function copyIP(){
  navigator.clipboard.writeText(SERVER_IP);
  alert("Skopiowano IP: " + SERVER_IP);
}

async function checkServer(){
  const text = document.getElementById("statusText");
  text.textContent = "Sprawdzanie...";
  try{
    const res = await fetch("https://api.mcsrvstat.us/2/" + SERVER_IP);
    const data = await res.json();
    if(data.online){
      text.textContent = "Online • Gracze: " + data.players.online + "/" + data.players.max;
    }else{
      text.textContent = "Serwer offline albo IP jest jeszcze niepodpięte.";
    }
  }catch(e){
    text.textContent = "Nie udało się sprawdzić statusu.";
  }
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize(){canvas.width = innerWidth; canvas.height = innerHeight;}
resize(); addEventListener("resize", resize);
for(let i=0;i<80;i++){
  particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+1,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(220,90,255,.8)";
  for(const p of particles){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(animate);
}
animate();
