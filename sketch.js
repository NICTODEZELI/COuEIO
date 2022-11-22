const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var imgBackground
var imgRabbit
var imgMelon
var imgCuteBtn
var rabbit
var blink
var eat
var sad
var imgBallon

let engine;
let world;
var ground;
var rope
var fruit

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var airSound;

function preload(){
  imgBackground = loadImage("imagens/background.png");
  imgRabbit = loadImage("imagens/Rabbibis-01.png");
  sad = loadAnimation("imagens/sad_1.png","imagens/sad_2.png","imagens/sad_3.png");
  blink = loadAnimation("imagens/blink_1.png","imagens/blink_2.png","imagens/blink_3.png");
  eat = loadAnimation("imagens/eat_1.png","imagens/eat_2.png","imagens/eat_3.png");
  imgMelon = loadImage("imagens/melon.png");

  bk_song = loadSound('imagens/sound1.mp3');
  sad_sound = loadSound("imagens/sad.wav")
  cut_sound = loadSound('imagens/rope_cut.mp3');
  eating_sound = loadSound('imagens/eating_sound.mp3');
  airSound = loadSound('imagens/air.wav');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,600,600,5);
  rope = new Rope(5,{x:245,y:10});

  Ballon = createImg("imagens/balloon.png")
  Ballon.position(20,140)
  Ballon.size(100,100)
  Ballon.mouseClicked(air)

  btn = createImg("imagens/cut_btn.png")
  btn.position(220,9)
  btn.size(50,50)
  btn.mouseClicked(drop)

  btn1 = createImg("imagens/mute.png")
  btn1.position(450,650)
  btn1.size(30,30)
  btn1.mouseClicked(mute)

  rabbit = createSprite(200,601,100,100)

  blink.frameDelay = 10
  sad.frameDelay = 10
  eat.frameDelay = 10
  rabbit.addAnimation("blink",blink);
  rabbit.addAnimation("sad",sad);
  rabbit.addAnimation("eat",eat);
  rabbit.changeAnimation("blink")
  rabbit.scale = 0.3

  var fruitOptions = {density:0.001}
  fruit = Bodies.circle(245,110,15,fruitOptions);
  Matter.Composite.add(rope.body,fruit);
  linkFruit = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
  
}

function draw() 
{
  background("gray");
  image(imgBackground,width/2,height/2,500,700)
  Engine.update(engine);
  ground.show();
  rope.show();

  if (fruit!=null){
    image(imgMelon,fruit.position.x,fruit.position.y,60,60)
  }
  if (collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eat")
    eating_sound.play()
  }
  if (collide(fruit,ground.body)==true){
    rabbit.changeAnimation("sad")
    sad_sound.play()
  }
  drawSprites();
}
function drop(){
  cut_sound.play()
  rope.break()
  linkFruit.detach()
  linkFruit = null
}
function collide(body,sprite){
  if (body!=null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (distance<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true
    }else {
      return false
    }
  }
}
function air(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  airSound.play()
}
function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop()
  }else{
    bk_song.play()
  }
}