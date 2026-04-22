let cam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 256);
}

function draw() {
  // 配信時は clear(); に書き換え
  //background(20);
  clear();
  
  orbitControl();

  let s = second();
  let m = minute();
  let h = hour();

  // --- 正三角錐の座標計算 ---
  let trasize = 350; 
  let h_pyr = trasize * (sqrt(6) / 3); // 高さ
  
  // 頂点（上）
  let pTop = createVector(0, -h_pyr, 0);
  
  // 底面の3点（床の角）
  let p1 = createVector(0, 0, trasize * (sqrt(3) / 3));
  let p2 = createVector(trasize / 2, 0, -trasize * (sqrt(3) / 6));
  let p3 = createVector(-trasize / 2, 0, -trasize * (sqrt(3) / 6));

  // --- 底面の辺上を移動する点の計算 ---
  // 秒：p1 から p2 へ移動
  let vS = p5.Vector.lerp(p1, p2, s / 59.0); 
  // 分：p2 から p3 へ移動
  let vM = p5.Vector.lerp(p2, p3, m / 59.0); 
  // 時：p3 から p1 へ移動
  let vH = p5.Vector.lerp(p3, p1, h / 23.0); 

  // --- 面の描画 ---
  noStroke();

  // 1. 秒の面（頂点-p1-vS）：秒が進むにつれて扇状に広がる
  fill(255, 0, 0, 150);
  drawTriangle(pTop, p1, vS);
           
  // 2. 分の面（頂点-p2-vM）
  fill(0, 0, 255, 150);
  drawTriangle(pTop, p2, vM);
           
  // 3. 時の面（頂点-p3-vH）
  fill(0, 255, 0, 150);
  drawTriangle(pTop, p3, vH);
           
  // 4. 時・分・秒の点がつくる内側の面
  fill(255, 255, 255, 120);
  drawTriangle(vS, vM, vH);
  
  // 5. 固定された床面（一番下）
  fill(255, 255, 255, 40);
  drawTriangle(p1, p2, p3);

  // --- ワイヤーフレーム（外枠） ---
  stroke(255);
  strokeWeight(2);
  drawEdge(pTop, p1);
  drawEdge(pTop, p2);
  drawEdge(pTop, p3);
  drawEdge(p1, p2);
  drawEdge(p2, p3);
  drawEdge(p3, p1);
  
  // 動く点を目立たせるためのポインター（小さな球体）
  /*
  noStroke();
  fill(255, 255, 255);
  push(); translate(vS.x, vS.y, vS.z); sphere(4); pop();
  push(); translate(vM.x, vM.y, vM.z); sphere(4); pop();
  push(); translate(vH.x, vH.y, vH.z); sphere(4); pop();
  */
}

function drawTriangle(pA, pB, pC) {
  beginShape();
  vertex(pA.x, pA.y, pA.z);
  vertex(pB.x, pB.y, pB.z);
  vertex(pC.x, pC.y, pC.z);
  endShape(CLOSE);
}

function drawEdge(pA, pB) {
  line(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
