{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab560
\pard\pardeftab560\slleading20\pardirnatural\partightenfactor0

\f0\fs26 \cf0 let cam;\
\
function setup() \{\
  createCanvas(windowWidth, windowHeight, WEBGL);\
  colorMode(RGB, 256);\
\}\
\
function draw() \{\
  // \uc0\u37197 \u20449 \u26178 \u12399  clear(); \u12395 \u26360 \u12365 \u25563 \u12360 \
  background(20);\
\pard\pardeftab560\slleading20\partightenfactor0
\cf0   //clear();\
\pard\pardeftab560\slleading20\pardirnatural\partightenfactor0
\cf0   \
  orbitControl();\
\
  let s = second();\
  let m = minute();\
  let h = hour();\
\
  // --- \uc0\u27491 \u19977 \u35282 \u37648 \u12398 \u24231 \u27161 \u35336 \u31639  ---\
  let trasize = 350; \
  let h_pyr = trasize * (sqrt(6) / 3); // \uc0\u39640 \u12373 \
  \
  // \uc0\u38914 \u28857 \u65288 \u19978 \u65289 \
  let pTop = createVector(0, -h_pyr, 0);\
  \
  // \uc0\u24213 \u38754 \u12398 3\u28857 \u65288 \u24202 \u12398 \u35282 \u65289 \
  let p1 = createVector(0, 0, trasize * (sqrt(3) / 3));\
  let p2 = createVector(trasize / 2, 0, -trasize * (sqrt(3) / 6));\
  let p3 = createVector(-trasize / 2, 0, -trasize * (sqrt(3) / 6));\
\
  // --- \uc0\u24213 \u38754 \u12398 \u36794 \u19978 \u12434 \u31227 \u21205 \u12377 \u12427 \u28857 \u12398 \u35336 \u31639  ---\
  // \uc0\u31186 \u65306 p1 \u12363 \u12425  p2 \u12408 \u31227 \u21205 \
  let vS = p5.Vector.lerp(p1, p2, s / 59.0); \
  // \uc0\u20998 \u65306 p2 \u12363 \u12425  p3 \u12408 \u31227 \u21205 \
  let vM = p5.Vector.lerp(p2, p3, m / 59.0); \
  // \uc0\u26178 \u65306 p3 \u12363 \u12425  p1 \u12408 \u31227 \u21205 \
  let vH = p5.Vector.lerp(p3, p1, h / 23.0); \
\
  // --- \uc0\u38754 \u12398 \u25551 \u30011  ---\
  noStroke();\
\
  // 1. \uc0\u31186 \u12398 \u38754 \u65288 \u38914 \u28857 -p1-vS\u65289 \u65306 \u31186 \u12364 \u36914 \u12416 \u12395 \u12388 \u12428 \u12390 \u25159 \u29366 \u12395 \u24195 \u12364 \u12427 \
  fill(255, 0, 0, 150);\
  drawTriangle(pTop, p1, vS);\
           \
  // 2. \uc0\u20998 \u12398 \u38754 \u65288 \u38914 \u28857 -p2-vM\u65289 \
  fill(0, 0, 255, 150);\
  drawTriangle(pTop, p2, vM);\
           \
  // 3. \uc0\u26178 \u12398 \u38754 \u65288 \u38914 \u28857 -p3-vH\u65289 \
  fill(0, 255, 0, 150);\
  drawTriangle(pTop, p3, vH);\
           \
  // 4. \uc0\u26178 \u12539 \u20998 \u12539 \u31186 \u12398 \u28857 \u12364 \u12388 \u12367 \u12427 \u20869 \u20596 \u12398 \u38754 \
  fill(255, 255, 255, 120);\
  drawTriangle(vS, vM, vH);\
  \
  // 5. \uc0\u22266 \u23450 \u12373 \u12428 \u12383 \u24202 \u38754 \u65288 \u19968 \u30058 \u19979 \u65289 \
  fill(255, 255, 255, 40);\
  drawTriangle(p1, p2, p3);\
\
  // --- \uc0\u12527 \u12452 \u12516 \u12540 \u12501 \u12524 \u12540 \u12512 \u65288 \u22806 \u26528 \u65289  ---\
  stroke(255);\
  strokeWeight(2);\
  drawEdge(pTop, p1);\
  drawEdge(pTop, p2);\
  drawEdge(pTop, p3);\
  drawEdge(p1, p2);\
  drawEdge(p2, p3);\
  drawEdge(p3, p1);\
  \
  // \uc0\u21205 \u12367 \u28857 \u12434 \u30446 \u31435 \u12383 \u12379 \u12427 \u12383 \u12417 \u12398 \u12509 \u12452 \u12531 \u12479 \u12540 \u65288 \u23567 \u12373 \u12394 \u29699 \u20307 \u65289 \
\pard\pardeftab560\slleading20\partightenfactor0
\cf0   /*\
  noStroke();\
\pard\pardeftab560\slleading20\pardirnatural\partightenfactor0
\cf0   fill(255, 255, 255);\
  push(); translate(vS.x, vS.y, vS.z); sphere(4); pop();\
  push(); translate(vM.x, vM.y, vM.z); sphere(4); pop();\
  push(); translate(vH.x, vH.y, vH.z); sphere(4); pop();\
\pard\pardeftab560\slleading20\partightenfactor0
\cf0   */\
\}\
\pard\pardeftab560\slleading20\pardirnatural\partightenfactor0
\cf0 \
function drawTriangle(pA, pB, pC) \{\
  beginShape();\
  vertex(pA.x, pA.y, pA.z);\
  vertex(pB.x, pB.y, pB.z);\
  vertex(pC.x, pC.y, pC.z);\
  endShape(CLOSE);\
\}\
\
function drawEdge(pA, pB) \{\
  line(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);\
\}\
\
function windowResized() \{\
  resizeCanvas(windowWidth, windowHeight);\
\}}