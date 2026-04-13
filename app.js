/* global confetti */
(function () {
  "use strict";

  const PHASES = {
    ENTRANCE: "entrance",
    COLOR_SHIFT: "color_shift",
    CURTAIN: "curtain",
    REMEMBER: "remember",
    MEMORIES: "memories",
    QUIZ: "quiz",
    BUDGET: "budget", 
    FLOOR: "floor",
    FRIDGE: "fridge",
    RECEIPT: "receipt",
    ENDING: "ending",
  };

  /** Small-caps section labels � same gold tint as Memory 02 */
  const SUBHEADING_COLOR = "rgba(255,215,0,0.5)";
  const EYEBROW_GOLD = "rgba(255,215,0,0.7)";
  const BAQLALAND_BLUE = "#00D1FF";

  /** Local 2�2 cloud sprite (top-left, top-right, bottom-left, bottom-right) */
  const CLOUD_IMG =
    "https://media.base44.com/images/public/69cd0dc172e585ffe71e3110/5ee33b51e_image.png";
  const BALL_IMG =
    "https://media.base44.com/images/public/69cd0dc172e585ffe71e3110/e994aa93e_image.png";
  const AWNING_IMG =
    "https://media.base44.com/images/public/69cd0dc172e585ffe71e3110/5e2b20ae4_Asset7.png";
  /** Place your bag PNG at `assets/plastic-bag.png` (same folder as index.html). */
  const ENDING_BAG_IMG = "./assets/plastic-bag.png";
  const BASE = "https://media.base44.com/images/public/69cd0dc172e585ffe71e3110/";

  const CLOUDS = [
    { size: 210, top: 6, left: 7, op: 0.88, parallax: 0.52, drift: 22, driftDur: 18 },
    { size: 162, top: 4, left: 52, op: 0.55, parallax: 0.28, drift: -18, driftDur: 24 },
    { size: 138, top: 16, left: 28, op: 0.5, parallax: 0.36, drift: 28, driftDur: 20 },
    { size: 116, top: 10, left: 74, op: 0.5, parallax: 0.22, drift: -14, driftDur: 16 },
    { size: 185, top: 21, left: 18, op: 0.9, parallax: 0.68, drift: 20, driftDur: 22 },
    { size: 148, top: 13, left: 63, op: 0.85, parallax: 0.48, drift: -24, driftDur: 19 },
    { size: 122, top: 24, left: 40, op: 0.76, parallax: 0.4, drift: 16, driftDur: 26 },
    { size: 190, top: 2, left: -4, op: 0.7, parallax: 0.44, drift: 30, driftDur: 21 },
    { size: 145, top: 8, left: 88, op: 0.65, parallax: 0.32, drift: -20, driftDur: 17 },
    { size: 105, top: 1, left: 70, op: 0.55, parallax: 0.2, drift: 18, driftDur: 23 },
    { size: 170, top: 18, left: -6, op: 0.8, parallax: 0.58, drift: 26, driftDur: 28 },
    { size: 130, top: 20, left: 92, op: 0.6, parallax: 0.38, drift: -22, driftDur: 15 },
  ];

  const BALLS = [
    { size: 82, top: 72, pad: 20, yM: 130, Rpx: 30, riseVh: 14, r: 340, delay: 0, duration: 18 },
    { size: 68, top: 78, pad: 16, yM: 110, Rpx: 24, riseVh: 12, r: 300, delay: -9, duration: 18 },
  ];

  const INTRO_LINES = [
    "In the corner of our neighborhoods stood the baqala, a world entered through smudged plastic curtains and defined by the rhythmic hum of a cooling fridge.",
    "It is not remembered through a single event, but through patterns: choosing a snack, counting coins, knowing which shelf to check.",
    "Baqalaland invites you into the heart of our collective memory, offering glimpses of the small things that shaped us. Here, your wins become your budget, allowing you to (re)visit the snacks that once shaped our childhoods.",
  ];

  const SNACKS = [
    { id: "chipsticks", name: "Chipsticks", price: 0.5, img: BASE + "2dc4fdc49_1.png" },
    { id: "salad_chips", name: "Salad Chips", price: 1, img: BASE + "52a18141c_2.png" },
    { id: "square_crisps", name: "Square Crisps", price: 1, img: BASE + "9ae26c1fd_3.png" },
    { id: "safari_grills", name: "Safari Grills", price: 1, img: BASE + "0968e99e0_4.png" },
    { id: "mazoon", name: "Mazoon", price: 1.5, img: BASE + "1cc097fc5_5.png" },
    { id: "majid_crispy", name: "Majid Crispy", price: 0.5, img: BASE + "7ca857f36_6.png" },
    { id: "super_ring", name: "Super Ring", price: 1, img: BASE + "b7e1a3e31_7.png" },
    { id: "qrakers", name: "Qrakers", price: 1, img: BASE + "626e806c3_8.png" },
    { id: "ali_baba", name: "Ali Baba", price: 1, img: BASE + "0eb68be80_9.png" },
    { id: "raja", name: "Raja", price: 1, img: BASE + "2eb84a7f8_10.png" },
    { id: "al_mudhish", name: "Al Mudhish", price: 1.5, img: BASE + "745219236_11.png" },
    { id: "oishi", name: "Oishi Prawns", price: 1, img: BASE + "5ae7f1637_12.png" },
    { id: "areej", name: "Areej Juice", price: 1, img: BASE + "4cce014cf_13.png" },
    { id: "rani", name: "Rani Juice", price: 1, img: BASE + "1ae6dc06d_14.png" },
    { id: "caprisun", name: "Capri-Sun", price: 1.5, img: BASE + "34a5a4045_15.png" },
    { id: "suntop", name: "Sun Top Mango", price: 0.75, img: BASE + "fdd82f4e1_16.png" },
    { id: "fruit_shoot", name: "Fruit Shoot", price: 2, img: BASE + "c51d107cf_17.png" },
    { id: "funfare", name: "Fun Fare", price: 1, img: BASE + "f4b01209f_19.png" },
    { id: "polo", name: "Polo Mints", price: 0.5, img: BASE + "7e236964f_20.png" },
    { id: "funtime_fizzy_bottle", name: "Funtime Fizzy Bottle", price: 1, img: "./assets/shelf/funtime-fizzy-bottle.png" },
    { id: "fusen_bubble_gum", name: "Fusen Bubble Gum", price: 0.5, img: "./assets/shelf/fusen-bubble-gum.png" },
    { id: "toffo", name: "Toffo", price: 0.5, img: "./assets/shelf/toffo.png" },
    { id: "sourpunk", name: "Sourpunk", price: 0.75, img: "./assets/shelf/sourpunk.png" },
    { id: "choco_rocco", name: "Choco Rocco", price: 1, img: "./assets/shelf/choco-rocco.png" },
    { id: "choki_choki", name: "Choki Choki", price: 0.75, img: "./assets/shelf/choki-choki.png" },
    { id: "choco_pound_cake", name: "Chocolate Pound Cake", price: 1.5, img: "./assets/shelf/chocolate-pound-cake.png" },
    { id: "yan_yan", name: "Yan Yan", price: 1.25, img: "./assets/shelf/yan-yan.png" },
    { id: "bubbly_candy", name: "Bubbly", price: 0.5, img: "./assets/shelf/bubbly-candy.png" },
    { id: "papy_snacks", name: "Papy Snacks", price: 1, img: "./assets/shelf/papy-snacks.png" },
    { id: "juicy_fruit", name: "Juicy Fruit", price: 0.5, img: "./assets/shelf/juicy-fruit.png" },
    { id: "smarties_eight", name: "Smarties", price: 0.75, img: "./assets/shelf/smarties-eight.png" },
    { id: "milk_chews", name: "Milk Chews", price: 0.5, img: "./assets/shelf/milk-chews.png" },
    { id: "pepero_funzels", name: "Pepero Funzels", price: 1.5, img: "./assets/shelf/pepero-funzels.png" },
    { id: "quality_street", name: "Quality Street", price: 2, img: "./assets/shelf/quality-street.png" },
    { id: "jewels_chocolates", name: "Jewels Chocolates", price: 2, img: "./assets/shelf/jewels-assorted-chocolates.png" },
    { id: "hello_panda", name: "Hello Panda", price: 1.5, img: "./assets/shelf/hello-panda.png" },
    { id: "magic_pops", name: "Magic Pops", price: 0.5, img: "./assets/shelf/magic-pops.png" },
    { id: "chips_oman", name: "Chips Oman", price: 1, img: "./assets/shelf/chips-oman.png" },
    { id: "canada_dry", name: "Canada Dry", price: 1.5, img: "./assets/fridge/canada-dry.png" },
    { id: "star_mango", name: "Star Mango", price: 1.25, img: "./assets/fridge/star-mango.png" },
    { id: "frenzy_drink", name: "Frenzy", price: 1, img: "./assets/fridge/frenzy.png" },
    { id: "danao", name: "Danao", price: 1.5, img: "./assets/fridge/danao.png" },
    { id: "bandung", name: "Bandung Milk", price: 1.5, img: "./assets/fridge/bandung-milk.png" },
  ];

  const FLOOR_SHOWCASE_IDS = [
    "chipsticks",
    "salad_chips",
    "chips_oman",
    "papy_snacks",
    "funtime_fizzy_bottle",
    "fusen_bubble_gum",
    "toffo",
    "sourpunk",
    "choco_rocco",
    "choki_choki",
    "choco_pound_cake",
    "yan_yan",
    "bubbly_candy",
    "juicy_fruit",
    "smarties_eight",
    "milk_chews",
    "pepero_funzels",
    "quality_street",
    "jewels_chocolates",
    "hello_panda",
    "magic_pops",
  ];
  const FLOOR_SHOWCASE_ITEMS = FLOOR_SHOWCASE_IDS.map((id) => SNACKS.find((item) => item.id === id)).filter(Boolean);
  const FLOOR_SHOWCASE_ROWS = [
    FLOOR_SHOWCASE_ITEMS.slice(0, 7),
    FLOOR_SHOWCASE_ITEMS.slice(7, 14),
    FLOOR_SHOWCASE_ITEMS.slice(14, 21),
  ];

  const MEMORIES_END = [
    "That was always the one.",
    "You knew before you even opened the bag.",
    "Some things haven't changed.",
    "The right choice. Every time.",
    "You saved the best for first.",
    "Nobody argued with that pick.",
  ];

  const CLOSING_LINES = [
    "Nostalgia looks different for everyone.",
    "We are glad to share a few of the memories that are instilled in us, and we hope they echoed something familiar in you.",
    "Thank you for spending this visit with us in Baqalaland.",
  ];

  const MAX_BUDGET = 10;

  function applyBudgetFromQuizScores() {
    st.budget = Math.min(MAX_BUDGET, st.quizScores.reduce((a, b) => a + b, 0));
  }

  function scoreSpeedRound() {
    if (st.spTargetsSpawned > 0 && st.spHits === st.spTargetsSpawned) return 3;
    if (st.spHits >= 8) return 3;
    if (st.spHits >= 5) return 2;
    if (st.spHits >= 2) return 1;
    return 0;
  }

  // Audio (ported from src/lib/audioEngine.js)
  let ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function noise(duration = 0.3, gain = 0.15, filterFreq = 800) {
    const c = getCtx();
    const bufferSize = c.sampleRate * duration;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = c.createBufferSource();
    source.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.5;
    const gainNode = c.createGain();
    gainNode.gain.setValueAtTime(gain, c.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(c.destination);
    source.start();
    source.stop(c.currentTime + duration);
  }
  function tone(freq, duration = 0.2, gain = 0.1, type = "sine", detune = 0) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gainNode = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    gainNode.gain.setValueAtTime(gain, c.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gainNode);
    gainNode.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  }
  const loops = {};
  function startLoop(key, fn, interval) {
    if (loops[key]) return;
    fn();
    loops[key] = setInterval(fn, interval);
  }
  function stopLoop(key) {
    if (loops[key]) {
      clearInterval(loops[key]);
      delete loops[key];
    }
  }
  function startFridgeHum() {
    startLoop("fridgeHum", () => {
      tone(60, 0.6, 0.04, "sawtooth");
      tone(120, 0.6, 0.02, "sine");
    }, 500);
  }
  function stopFridgeHum() {
    stopLoop("fridgeHum");
  }
  function playGlassWipe() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, c.currentTime);
    osc.frequency.linearRampToValueAtTime(800, c.currentTime + 0.12);
    gain.gain.setValueAtTime(0.05, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.12);
  }
  function playFound() {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => tone(f, 0.25, 0.12, "sine"), i * 80);
    });
  }
  function playRise(heightFraction) {
    if (heightFraction < 0.05) return;
    const freq = 200 + heightFraction * 600;
    tone(freq, 0.05, 0.04 * heightFraction, "sine");
  }
  function playLand() {
    tone(120, 0.12, 0.08, "triangle");
    noise(0.06, 0.06, 400);
  }
  function playGrab() {
    noise(0.12, 0.1, 1200);
    setTimeout(() => tone(880, 0.15, 0.08, "sine"), 80);
  }
  function playCurtainSwoosh() {
    noise(0.4, 0.12, 600);
    tone(300, 0.3, 0.06, "sawtooth");
  }
  function playClick() {
    tone(440, 0.06, 0.08, "square");
    noise(0.04, 0.04, 2000);
  }
  function playCoin() {
    tone(1200 + Math.random() * 200, 0.18, 0.1, "sine");
    tone(800, 0.1, 0.04, "sine");
  }
  function startShopAmbience() {
    startLoop("shop", () => {
      tone(55, 0.8, 0.025, "sawtooth");
      noise(0.4, 0.008, 300);
    }, 700);
  }
  function stopShopAmbience() {
    stopLoop("shop");
  }
  function playProductPick() {
    noise(0.1, 0.08, 800);
    setTimeout(() => tone(660, 0.12, 0.06, "sine"), 50);
  }
  function playWhoosh() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(400, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.35);
    gain.gain.setValueAtTime(0.08, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.35);
  }

  // DOM helpers
  const root = document.getElementById("root");
  function mount(node) {
    root.replaceChildren(node);
  }
  function h(tag, className, attrs = {}, children = []) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "style" && v && typeof v === "object") Object.assign(el.style, v);
      else if (k === "disabled") el.disabled = !!v;
      else if (k.startsWith("on") && typeof v === "function") {
        const ev = k.slice(2).toLowerCase();
        el.addEventListener(ev, v);
      } else if (v != null && k !== "disabled") el.setAttribute(k, v);
    }
    for (const c of children) {
      if (c == null || c === false) continue;
      if (typeof c === "string") el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    }
    return el;
  }

  /** Open stroke arrow (no fill): stem + chevron, for scroll hint. */
  function svgDownArrowOutline() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "26");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.style.display = "block";
    svg.style.opacity = "0.9";
    svg.style.animation = "floatBounce 1.4s ease-in-out infinite";
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", "M12 5v10M8 14l4 4 4-4");
    p.setAttribute("stroke", "#1a4e6e");
    p.setAttribute("stroke-width", "2");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    svg.appendChild(p);
    return svg;
  }

  // Ball keyframes (EntrancePhase)
  const BALL_STYLE_ID = "baqala-ball-keyframes";
  function injectBallKeyframes() {
    if (document.getElementById(BALL_STYLE_ID)) return;
    const container = document.createElement("style");
    container.id = BALL_STYLE_ID;
    let allCSS = "";
    BALLS.forEach((b, i) => {
      const { size: sz, pad, yM, Rpx, riseVh, r } = b;
      const rise = `calc(${riseVh}vh + ${Rpx}px)`;
      const xr = `translateX(calc(100vw + ${sz + pad}px))`;
      const quadY = (u) => {
        const A = 2 * Rpx + 4 * yM;
        const B = -3 * Rpx - 4 * yM;
        const C = Rpx;
        return A * u * u + B * u + C;
      };
      const xRL = (u) => {
        const uu = Math.min(Math.max(u, 0), 1);
        const vw = 100 - 100 * uu;
        const px = (1 - uu) * pad - uu * (sz + pad);
        return `translateX(calc(${vw.toFixed(3)}vw + ${px.toFixed(1)}px))`;
      };
      const xLeft = xRL(1);
      const xLR = (u) => (u <= 0 ? xLeft : u >= 1 ? xr : xRL(1 - u));
      const rotRL = (u) => (-r * (1 - u) + r * u).toFixed(1);
      const rotLR = (u) => (r * (1 - u) + -r * u).toFixed(1);
      const steps = 16;
      let kfBody = `0%,100%{opacity:0;transform:${xr} translateY(${rise}) rotate(${-r}deg)}`;
      kfBody += `1%{opacity:0;transform:${xr} translateY(${rise}) rotate(${-r}deg)}`;
      const t0 = 2,
        t1 = 20;
      for (let k = 0; k <= steps; k++) {
        const u = k / steps;
        const pct = (t0 + (t1 - t0) * u).toFixed(2);
        kfBody += `${pct}%{opacity:1;transform:${xRL(u)} translateY(${quadY(u).toFixed(1)}px) rotate(${rotRL(u)}deg)}`;
      }
      kfBody += `22%{opacity:0;transform:${xLeft} translateY(0) rotate(${r}deg)}`;
      kfBody += `23%,32%{opacity:0;transform:${xLeft} translateY(0) rotate(${r}deg)}`;
      kfBody += `33%{opacity:0;transform:${xLeft} translateY(calc(${riseVh * 0.35}vh + 28px)) rotate(${r}deg)}`;
      kfBody += `35%{opacity:0;transform:${xLeft} translateY(${Rpx}px) rotate(${r}deg)}`;
      const u0 = 37,
        u1 = 55;
      for (let k = 0; k <= steps; k++) {
        const u = k / steps;
        const pct = (u0 + (u1 - u0) * u).toFixed(2);
        kfBody += `${pct}%{opacity:1;transform:${xLR(u)} translateY(${quadY(u).toFixed(1)}px) rotate(${rotLR(u)}deg)}`;
      }
      kfBody += `56%{opacity:0;transform:${xr} translateY(0) rotate(${-r}deg)}`;
      kfBody += `58%{opacity:0;transform:${xr} translateY(calc(${riseVh * 0.4}vh + 36px)) rotate(${-r}deg)}`;
      kfBody += `60%,99%{opacity:0;transform:${xr} translateY(${rise}) rotate(${-r}deg)}`;
      allCSS += `.ball-toss-${i}{animation:ballToss${i} ${b.duration}s ${b.delay}s linear infinite;}@keyframes ballToss${i}{${kfBody}}`;
    });
    container.textContent = allCSS;
    document.head.appendChild(container);
  }
  const BAG_DROP_STYLE_ID = "baqala-bag-drop-keyframes";
  function injectBagDropKeyframes() {
    if (document.getElementById(BAG_DROP_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = BAG_DROP_STYLE_ID;
    style.textContent =
      "@keyframes bagDropIn{0%{opacity:0;transform:translateY(-88vh) scale(0.82) rotate(-12deg)}52%{opacity:1;transform:translateY(12px) scale(1.04) rotate(5deg)}78%{opacity:1;transform:translateY(-6px) scale(0.98) rotate(-2deg)}100%{opacity:1;transform:translateY(0) scale(1) rotate(0deg)}}@keyframes bagWeightSettle{0%{transform:translateY(0) scaleY(1)}35%{transform:translateY(2px) scaleY(0.992)}62%{transform:translateY(7px) scaleY(0.975)}78%{transform:translateY(4px) scaleY(0.984)}100%{transform:translateY(0) scaleY(1)}}";
    document.head.appendChild(style);
  }
  const COLOR_SHIFT_STYLE_ID = "baqala-color-shift-keyframes";
  function injectColorShiftKeyframes() {
    if (document.getElementById(COLOR_SHIFT_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = COLOR_SHIFT_STYLE_ID;
    style.textContent = "@keyframes baqalaColorShift{0%{opacity:0}100%{opacity:1}}";
    document.head.appendChild(style);
  }
  const CLOUD_DRIFT_STYLE_ID = "baqala-cloud-drift-keyframes";
  function injectCloudDriftKeyframes() {
    if (document.getElementById(CLOUD_DRIFT_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = CLOUD_DRIFT_STYLE_ID;
    style.textContent =
      "@keyframes baqalaCloudDrift{0%{transform:translateX(0)}50%{transform:translateX(var(--cloud-drift))}100%{transform:translateX(0)}}";
    document.head.appendChild(style);
  }
  const REMEMBER_BUBBLE_STYLE_ID = "baqala-remember-bubble-keyframes";
  function injectRememberBubbleKeyframes() {
    if (document.getElementById(REMEMBER_BUBBLE_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = REMEMBER_BUBBLE_STYLE_ID;
    style.textContent =
      "@keyframes rememberBubblePopIn{0%{opacity:0;transform:scale(0.82) translateY(10px)}62%{opacity:1;transform:scale(1.04) translateY(0)}100%{opacity:1;transform:scale(1) translateY(0)}}";
    document.head.appendChild(style);
  }

  const MG_ITEMS = [
    { id: "chipsticks", img: BASE + "2dc4fdc49_1.png", label: "Chipsticks" },
    { id: "salad_chips", img: BASE + "52a18141c_2.png", label: "Salad Chips" },
    { id: "square_crisps", img: BASE + "9ae26c1fd_3.png", label: "Square Crisps" },
    { id: "areej", img: BASE + "4cce014cf_13.png", label: "Areej Juice" },
    { id: "caprisun", img: BASE + "34a5a4045_15.png", label: "Capri-Sun" },
    { id: "rani", img: BASE + "1ae6dc06d_14.png", label: "Rani Juice" },
    { id: "suntop", img: BASE + "fdd82f4e1_16.png", label: "Sun Top" },
    { id: "laban_up", img: "./assets/fridge/laban-up.png", label: "Laban Up" },
    { id: "canada_dry", img: "./assets/fridge/canada-dry.png", label: "Canada Dry" },
    { id: "bandung", img: "./assets/fridge/bandung-milk.png", label: "Bandung Milk" },
    { id: "papy_snacks", img: "./assets/shelf/papy-snacks.png", label: "Papy Snacks" },
    { id: "yan_yan", img: "./assets/shelf/yan-yan.png", label: "Yan Yan" },
  ];
  const MG_SHOW = 5;
  const MG_SHOW_MS = 7000;
  const SP_TARGETS = [
    { id: "vimto", img: BASE + "4cce014cf_13.png", label: "Areej Juice", isTarget: true },
    { id: "pepsi", img: BASE + "1ae6dc06d_14.png", label: "Rani Juice", isTarget: false },
    { id: "laban", img: BASE + "c51d107cf_17.png", label: "Fruit Shoot", isTarget: false },
    { id: "suntop", img: BASE + "fdd82f4e1_16.png", label: "Sun Top", isTarget: false },
    { id: "caprisun", img: BASE + "34a5a4045_15.png", label: "Capri-Sun", isTarget: false },
    { id: "mirinda", img: BASE + "2eb84a7f8_10.png", label: "Raja", isTarget: false },
  ];
  const SQ_ITEMS = [
    { id: "chips", img: BASE + "2dc4fdc49_1.png", label: "Chipsticks", color: "#FF6B35" },
    { id: "vimto", img: BASE + "4cce014cf_13.png", label: "Areej", color: "#7B2FF2" },
    { id: "kinder", img: BASE + "f4b01209f_19.png", label: "Fun Fare", color: "#5C3317" },
    { id: "polo", img: BASE + "7e236964f_20.png", label: "Polo", color: "#00D1FF" },
    { id: "suntop", img: BASE + "fdd82f4e1_16.png", label: "Sun Top", color: "#FFD700" },
    { id: "candy", img: BASE + "34a5a4045_15.png", label: "Capri-Sun", color: "#FF2E63" },
  ];
  const SQ_LEN = 5;
  const FRIDGE_DRINKS = [
    { id: "areej", img: BASE + "4cce014cf_13.png", label: "Areej", x: "12%", y: "16%" },
    { id: "fruit_shoot", img: BASE + "c51d107cf_17.png", label: "Fruit Shoot", x: "30%", y: "16%" },
    { id: "rani", img: BASE + "1ae6dc06d_14.png", label: "Rani Juice", x: "48%", y: "16%" },
    { id: "suntop", img: BASE + "fdd82f4e1_16.png", label: "Sun Top", x: "66%", y: "16%" },
    { id: "caprisun", img: BASE + "34a5a4045_15.png", label: "Capri-Sun", x: "84%", y: "16%" },
    { id: "canada_dry", img: "./assets/fridge/canada-dry.png", label: "Canada Dry", x: "12%", y: "50%" },
    { id: "star_mango", img: "./assets/fridge/star-mango.png", label: "Star Mango", x: "30%", y: "50%" },
    { id: "frenzy_drink", img: "./assets/fridge/frenzy.png", label: "Frenzy", x: "48%", y: "50%" },
    { id: "danao", img: "./assets/fridge/danao.png", label: "Danao", x: "66%", y: "50%" },
    { id: "bandung", img: "./assets/fridge/bandung-milk.png", label: "Bandung Milk", x: "84%", y: "50%" },
    { id: "igloo_mango_tub", img: "./assets/fridge/igloo-mango-tub.png", label: "Igloo Mango", x: "21%", y: "84%" },
    { id: "igloo_evens", img: "./assets/fridge/igloo-evens-chocolate.png", label: "Igloo Evens", x: "39%", y: "84%" },
    { id: "igloo_maxi_sup", img: "./assets/fridge/igloo-maxi-sup.png", label: "Igloo Maxi Sup", x: "57%", y: "84%" },
    { id: "laban_up", img: "./assets/fridge/laban-up.png", label: "Laban Up", x: "75%", y: "84%" },
  ];
  const FRIDGE_PRICE_BY_ID = {
    areej: 1,
    fruit_shoot: 2,
    rani: 1,
    suntop: 0.75,
    caprisun: 1.5,
    canada_dry: 1.5,
    star_mango: 1.25,
    frenzy_drink: 1,
    danao: 1.5,
    bandung: 1.5,
    igloo_mango_tub: 1.5,
    igloo_evens: 1.25,
    igloo_maxi_sup: 1.25,
    laban_up: 1,
  };
  const CANDY_SHELF_IMGS = [
    BASE + "2dc4fdc49_1.png",
    BASE + "52a18141c_2.png",
    BASE + "9ae26c1fd_3.png",
    BASE + "0968e99e0_4.png",
    BASE + "7ca857f36_6.png",
    BASE + "b7e1a3e31_7.png",
    BASE + "626e806c3_8.png",
    BASE + "0eb68be80_9.png",
    BASE + "5ae7f1637_12.png",
    "./assets/shelf/chips-oman.png",
    "./assets/shelf/papy-snacks.png",
  ];
  const CANDY_TARGET = "./assets/shelf/chips-oman.png";
  const CANDY_QUOTE = "It was on the top shelf.\nYou weren't tall enough.\nYou jumped for the chips anyway.";
  const FRIDGE_QUOTE = "You pressed your forehead against the glass.\nThe fog cleared just enough to see what was inside.";
  const REMEMBER_THINGS = [
    { text: "the juice box you always picked", x: "10%", y: "18%", size: "lg", delay: 0.5 },
    { text: "candy on the top shelf", x: "9%", y: "10%", size: "md", delay: 0.7, anchor: "right" },
    { text: "counting coins at the counter", x: "4%", y: "32%", size: "md", delay: 0.9, anchor: "right" },
    { text: "pressing your face against the fridge glass", x: "5%", y: "52%", size: "md", delay: 1.1 },
    { text: "the bag that was always too full", x: "6%", y: "58%", size: "md", delay: 1.3, anchor: "right" },
    { text: "knowing which shelf to check", x: "22%", y: "72%", size: "lg", delay: 1.5 },
  ];
  const BUBBLE_SIZES = {
    sm: { bubble: "padding:0.5rem 1rem;font-size:0.75rem;max-width:130px", dot1: "8px", dot2: "6px" },
    md: { bubble: "padding:0.75rem 1.25rem;font-size:0.875rem;max-width:170px", dot1: "10px", dot2: "8px" },
    lg: { bubble: "padding:0.75rem 1.25rem;font-size:0.875rem;max-width:190px", dot1: "12px", dot2: "8px" },
  };

  let cleanups = [];
  function onCleanup(fn) {
    cleanups.push(fn);
  }
  function runCleanups() {
    cleanups.forEach((fn) => {
      try {
        fn();
      } catch (e) {}
    });
    cleanups = [];
  }
  function shuffle(a) {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const st = {
    phase: PHASES.ENTRANCE,
    budget: 0,
    picks: [],
    endingMemoryLine: MEMORIES_END[Math.floor(Math.random() * MEMORIES_END.length)],
    entranceP: 0,
    entranceShowCTA: false,
    memoryStep: 0,
    quizStarted: false,
    quizGameIndex: 0,
    quizScores: [],
    mgPhase: "memorize",
    mgCd: 3,
    mgTarget: [],
    mgGrid: [],
    mgSel: [],
    mgScore: null,
    mgTids: [],
    mgCdInterval: null,
    spPhase: "intro",
    spTime: 10,
    spItems: [],
    spHits: 0,
    spMiss: 0,
    spTargetsSpawned: 0,
    spUid: 0,
    spTimer: null,
    spSpawn: null,
    spResultAed: null,
    sqPhase: "intro",
    sqSeq: [],
    sqShow: -1,
    sqPlay: [],
    sqWrong: false,
    sqWrongTid: null,
    sqMistakes: 0,
    sqScore: null,
    sqDone: false,
    sqTids: [],
    brCount: 0,
    brDone: false,
    brStarted: false,
    brRaf: null,
    curtainX: 0.5,
    curtainPart: false,
    curtainRaf: null,
    curtainTg: 0.5,
    curtainCur: 0.5,
    floorPick: [],
    floorSpent: 0,
    floorOver: false,
    rcRev: 0,
    rcTot: false,
    rcInt: null,
    rcRevealComplete: false,
    rcRevealScheduled: false,
    endSub: "bag",
    endChosen: null,
    narrative: null,
    candyRaf: null,
    candyH: 0,
    candyHold: false,
    candyGrab: false,
    candyDone: false,
    candyAtt: 0,
    candyHint: true,
    candyDoneR: false,
    fridgeClr: 0,
    fridgeDone: false,
    fridgeSnapshot: null,
    fridgeOpen: false,
  };

  function setPhase(next) {
    if (next !== PHASES.RECEIPT && st.rcInt) {
      clearInterval(st.rcInt);
      st.rcInt = null;
    }
    st.phase = next;
    if (next === PHASES.MEMORIES) {
      st.memoryStep = 0;
      st.fridgeClr = 0;
      st.fridgeDone = false;
      st.fridgeSnapshot = null;
      st.fridgeOpen = false;
      st.candyH = 0;
      st.candyHold = false;
      st.candyGrab = false;
      st.candyDone = false;
      st.candyAtt = 0;
      st.candyHint = true;
      st.candyDoneR = false;
    }
    if (next === PHASES.QUIZ) {
      st.quizStarted = false;
      st.quizGameIndex = 0;
      st.quizScores = [];
      st.mgPhase = "memorize";
      st.mgCd = 3;
      st.mgTarget = [];
      st.mgGrid = [];
      st.mgSel = [];
      st.mgScore = null;
      st.mgTids.forEach(clearTimeout);
      st.mgTids = [];
      if (st.mgCdInterval) clearInterval(st.mgCdInterval);
      st.mgCdInterval = null;
      st.spPhase = "intro";
      st.spTime = 10;
      st.spItems = [];
      st.spHits = 0;
      st.spMiss = 0;
      st.spTargetsSpawned = 0;
      st.spUid = 0;
      if (st.spTimer) clearInterval(st.spTimer);
      if (st.spSpawn) clearInterval(st.spSpawn);
      st.spTimer = null;
      st.spSpawn = null;
      st.spResultAed = null;
      st.sqPhase = "intro";
      st.sqSeq = [];
      st.sqShow = -1;
      st.sqPlay = [];
      st.sqWrong = false;
      if (st.sqWrongTid) clearTimeout(st.sqWrongTid);
      st.sqWrongTid = null;
      st.sqMistakes = 0;
      st.sqScore = null;
      st.sqDone = false;
      st.sqTids.forEach(clearTimeout);
      st.sqTids = [];
    }
    if (next === PHASES.RECEIPT) {
      st.rcRev = 0;
      st.rcTot = false;
      st.rcRevealComplete = false;
      st.rcRevealScheduled = false;
      if (st.rcInt) clearInterval(st.rcInt);
      st.rcInt = null;
      const total = st.picks.reduce((s, p) => s + p.price, 0).toFixed(2);
      const leftover = (st.budget - parseFloat(total)).toFixed(2);
      st.narrative = {
        total,
        leftover,
      };
    }
    if (next === PHASES.BUDGET) {
      st.brStarted = false;
      st.brCount = 0;
      st.brDone = false;
    }
    if (next === PHASES.CURTAIN) {
      st.curtainPart = false;
      st.curtainCur = 0.5;
      st.curtainTg = 0.5;
      st.curtainX = 0.5;
    }
    if (next === PHASES.ENDING) {
      st.endSub = "bag";
      st.endChosen = null;
    }
    render();
  }

  function restart() {
    runCleanups();
    stopFridgeHum();
    stopShopAmbience();
    if (st.brRaf) cancelAnimationFrame(st.brRaf);
    st.brRaf = null;
    if (st.curtainRaf) cancelAnimationFrame(st.curtainRaf);
    st.curtainRaf = null;
    if (st.candyRaf) cancelAnimationFrame(st.candyRaf);
    st.candyRaf = null;
    st.budget = 0;
    st.picks = [];
    st.entranceP = 0;
    st.entranceShowCTA = false;
    st.endingMemoryLine = MEMORIES_END[Math.floor(Math.random() * MEMORIES_END.length)];
    st.phase = PHASES.ENTRANCE;
    st.floorPick = [];
    st.floorSpent = 0;
    st.floorOver = false;
    st.brStarted = false;
    st.brCount = 0;
    st.brDone = false;
    st.curtainPart = false;
    st.curtainCur = 0.5;
    st.curtainTg = 0.5;
    st.curtainX = 0.5;
    if (st.rcInt) clearInterval(st.rcInt);
    st.rcInt = null;
    st.rcRev = 0;
    st.rcTot = false;
    st.rcRevealComplete = false;
    st.rcRevealScheduled = false;
    st.memoryStep = 0;
    st.fridgeClr = 0;
    st.fridgeDone = false;
    st.fridgeSnapshot = null;
    st.fridgeOpen = false;
    render();
  }

  function initMemoryGrid() {
    const sh = shuffle(MG_ITEMS);
    st.mgTarget = sh.slice(0, MG_SHOW);
    st.mgGrid = shuffle(MG_ITEMS.slice());
    st.mgSel = [];
    st.mgScore = null;
    st.mgPhase = "memorize";
    st.mgCd = 3;
    st.mgTids.forEach(clearTimeout);
    st.mgTids = [];
    if (st.mgCdInterval) clearInterval(st.mgCdInterval);
    st.mgCdInterval = null;
    const t1 = setTimeout(() => {
      st.mgPhase = "countdown";
      render();
      let c = 3;
      st.mgCd = c;
      st.mgCdInterval = setInterval(() => {
        c -= 1;
        st.mgCd = c;
        render();
        if (c <= 0) {
          clearInterval(st.mgCdInterval);
          st.mgCdInterval = null;
          st.mgPhase = "recall";
          render();
        }
      }, 1000);
    }, MG_SHOW_MS);
    st.mgTids.push(t1);
  }

  function renderEntrance() {
    injectBallKeyframes();
    injectCloudDriftKeyframes();
    const p = st.entranceP;
    const phase1 = Math.min(1, p * 2);
    const phase2 = Math.max(0, (p - 0.5) * 2);
    const titleOpacity = Math.max(0, 1 - phase1 * 3);
    const introOpacity = phase2;
    const awningTop = Math.max(-18, 100 - p * 118);
    const cloudShift = p * 260;
    const wrap = h("div", "", { style: { position: "fixed", inset: 0, overflow: "hidden" } });
    wrap.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #5db8e8 0%, #87CEEB 40%, #b8e0f5 100%)",
        },
      })
    );
    const cloudLayer = h("div", "", {
      style: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 3,
        opacity: Math.max(0, 1 - p * 2.5),
      },
    });
    CLOUDS.forEach((c) => {
      const d = h("div", "", {
        style: {
          position: "absolute",
          top: `${c.top}%`,
          left: `${c.left}%`,
          width: `${c.size}px`,
          opacity: c.op,
          transform: `translateX(${(cloudShift * c.parallax).toFixed(2)}px)`,
          willChange: "transform",
        },
      });
      const driftWrap = h("div", "", {
        style: {
          width: "100%",
          "--cloud-drift": `${c.drift || 0}px`,
          animation: `baqalaCloudDrift ${c.driftDur || 20}s ease-in-out infinite`,
        },
      });
      driftWrap.appendChild(h("img", "", { src: CLOUD_IMG, alt: "", "aria-hidden": "true", style: { width: "100%", display: "block" } }));
      d.appendChild(driftWrap);
      cloudLayer.appendChild(d);
    });
    wrap.appendChild(cloudLayer);
    const ballLayer = h("div", "", { style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 } });
    BALLS.forEach((b, i) => {
      const d = h("div", `ball-toss-${i}`, {
        style: { position: "absolute", top: `${b.top}%`, width: `${b.size}px`, height: `${b.size}px`, opacity: 0 },
      });
      d.appendChild(h("img", "", { src: BALL_IMG, alt: "", style: { width: "100%", height: "100%", objectFit: "contain" } }));
      ballLayer.appendChild(d);
    });
    wrap.appendChild(ballLayer);
    const titleWrap = h("div", "", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
        opacity: titleOpacity,
      },
    });
    const wordmark = "Baqalaland";
    titleWrap.appendChild(
      h(
        "h1",
        "playwrite-pe-baqalaland-hero",
        {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "100%",
            padding: "0 1.25rem",
            boxSizing: "border-box",
            display: "block",
            textAlign: "center",
            fontSize: "clamp(2.8rem, 11vw, 6.5rem)",
            letterSpacing: "normal",
            color: "#2a4d72",
            lineHeight: 1,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.45), 0 0 10px rgba(120, 185, 255, 0.35), 0 0 26px rgba(70, 140, 210, 0.28), 0 2px 12px rgba(15, 45, 85, 0.2)",
            margin: 0,
          },
        },
        [wordmark]
      )
    );
    const scrollHint = h("div", "", {
      style: {
        position: "absolute",
        left: "50%",
        bottom: "clamp(1.5rem, 5vh, 3.5rem)",
        transform: "translateX(-50%)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      },
    });
    scrollHint.appendChild(
      h(
        "span",
        "font-body",
        { style: { color: "#1a4e6e", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.8 } },
        ["scroll to begin"]
      )
    );
    scrollHint.appendChild(svgDownArrowOutline());
    titleWrap.appendChild(scrollHint);
    wrap.appendChild(titleWrap);
    const introWrap = h("div", "", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        pointerEvents: "none",
        userSelect: "none",
        opacity: introOpacity,
      },
    });
    introWrap.appendChild(
      h(
        "p",
        "font-heading",
        {
          style: {
            fontSize: "10px",
            letterSpacing: "0.25em",
            textAlign: "center",
            color: "#1f3d66",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
            marginTop: 0,
          },
        },
        [wordmark]
      )
    );
    const linesBox = h("div", "", {
      style: { maxWidth: "min(50rem, 100%)", width: "100%", textAlign: "center", marginBottom: "3rem", boxSizing: "border-box" },
    });
    INTRO_LINES.forEach((line, i) => {
      const threshold = 0.2 + i * 0.15;
      const reveal = Math.min(1, Math.max(0, (phase2 - threshold) * 5));
      const vis = reveal > 0 ? 1 : 0;
      const ty = (1 - reveal) * 18;
      const scale = 0.965 + reveal * 0.035;
      const blur = (1 - reveal) * 7;
      linesBox.appendChild(
        h(
          "p",
          "font-heading",
          {
            style: {
              fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
              color: "rgba(24,55,92,0.95)",
              lineHeight: 1.375,
              opacity: vis,
              transform: `translateY(${ty}px) scale(${scale})`,
              filter: `blur(${blur}px)`,
              transition: "opacity 0.35s, transform 0.35s, filter 0.35s",
              margin: "0 0 1rem",
            },
          },
          [line]
        )
      );
    });
    introWrap.appendChild(linesBox);
    if (st.entranceShowCTA) {
      const btnRow = h("div", "", { style: { pointerEvents: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" } });
      btnRow.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              padding: "1rem 2.5rem",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontSize: "0.875rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              minHeight: "52px",
              background: "linear-gradient(135deg, #2c4f7f, #16365f)",
              boxShadow: "0 4px 26px rgba(22,54,95,0.45)",
            },
            onclick: () => {
              playWhoosh();
              setPhase(PHASES.COLOR_SHIFT);
            },
          },
          ["Enter Baqalaland"]
        )
      );
      introWrap.appendChild(btnRow);
    }
    wrap.appendChild(introWrap);
    const awningWrap = h("div", "", {
      style: { position: "absolute", insetInline: 0, zIndex: 20, pointerEvents: "none", top: `${awningTop}%`, transition: "top 0.05s linear" },
    });
    awningWrap.appendChild(
      h("img", "", {
        src: AWNING_IMG,
        alt: "Baqala awning",
        style: { display: "block", width: "100%", height: "clamp(140px, 32vh, 320px)", objectFit: "cover", objectPosition: "bottom center" },
      })
    );
    wrap.appendChild(awningWrap);
    const prog = h("div", "", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(0,0,0,0.1)", zIndex: 30 } });
    prog.appendChild(
      h("div", "", {
        style: { height: "100%", width: `${p * 100}%`, background: "#c0392b", transition: "width 0.05s linear" },
      })
    );
    wrap.appendChild(prog);
    const onWheel = (e) => {
      e.preventDefault();
      st.entranceP = Math.min(1, Math.max(0, st.entranceP + e.deltaY / 700));
      if (st.entranceP >= 1) st.entranceShowCTA = true;
      render();
    };
    let touchY = 0;
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const dy = (touchY - e.touches[0].clientY) / 350;
      touchY = e.touches[0].clientY;
      st.entranceP = Math.min(1, Math.max(0, st.entranceP + dy));
      if (st.entranceP >= 1) st.entranceShowCTA = true;
      render();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    onCleanup(() => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    });
    return wrap;
  }

  function renderRemember() {
    injectRememberBubbleKeyframes();
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)",
      },
    });
    wrap.appendChild(h("div", "tiled-floor", { style: { position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" } }));
    const bubbles = h("div", "", { style: { position: "absolute", inset: 0, pointerEvents: "none" } });
    REMEMBER_THINGS.forEach((thing, i) => {
      const sz = BUBBLE_SIZES[thing.size];
      const anchoredRight = thing.anchor === "right";
      const row = h("div", "", {
        style: {
          position: "absolute",
          top: thing.y,
          display: "flex",
          flexDirection: "column",
          alignItems: anchoredRight ? "flex-end" : "flex-start",
          gap: "0.25rem",
          opacity: 0,
          transformOrigin: anchoredRight ? "right center" : "left center",
          animation: `rememberBubblePopIn 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.14}s forwards`,
          ...(anchoredRight ? { right: thing.x, left: "auto" } : { left: thing.x, right: "auto" }),
        },
      });
      const bstyle = {
        borderRadius: "1.5rem",
        color: "rgba(255,255,255,0.8)",
        lineHeight: 1.375,
        fontStyle: "italic",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(6px)",
      };
      if (thing.size === "sm") Object.assign(bstyle, { padding: "0.5rem 1rem", fontSize: "0.75rem", maxWidth: "130px" });
      else if (thing.size === "md") Object.assign(bstyle, { padding: "0.75rem 1.25rem", fontSize: "0.875rem", maxWidth: "170px" });
      else Object.assign(bstyle, { padding: "0.75rem 1.25rem", fontSize: "0.875rem", maxWidth: "190px" });
      row.appendChild(h("div", "font-body", { style: bstyle }, [thing.text]));
      const dots = h("div", "", {
        style: { display: "flex", gap: "0.25rem", ...(anchoredRight ? { paddingRight: "1rem" } : { paddingLeft: "1rem" }) },
      });
      dots.appendChild(h("div", "", { style: { borderRadius: "9999px", background: "rgba(255,255,255,0.2)", width: sz.dot1, height: sz.dot1 } }));
      dots.appendChild(h("div", "", { style: { borderRadius: "9999px", background: "rgba(255,255,255,0.12)", width: sz.dot2, height: sz.dot2 } }));
      row.appendChild(dots);
      bubbles.appendChild(row);
    });
    wrap.appendChild(bubbles);
    const center = h("div", "", { style: { position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem" } });
    center.appendChild(
      h(
        "p",
        "font-heading",
        { style: { fontSize: "10px", letterSpacing: "0.5em", color: EYEBROW_GOLD, textTransform: "uppercase", marginBottom: "1rem" } },
        ["Before we begin"]
      )
    );
    center.appendChild(
      h(
        "h2",
        "font-heading",
        { style: { fontWeight: 700, fontSize: "clamp(1.5rem, 5vw, 1.875rem)", color: "#fff", marginBottom: "2.5rem", lineHeight: 1.375 } },
        ["Remember these small things."]
      )
    );
    center.appendChild(
      h(
        "button",
        "font-heading btn-raspberry",
        {
          onclick: () => setPhase(PHASES.QUIZ),
        },
        ["Yes, let's revisit them!"]
      )
    );
    wrap.appendChild(center);
    return wrap;
  }

  function renderColorShift() {
    injectColorShiftKeyframes();
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        background: "#2D1B69",
        opacity: 0,
        animation: "baqalaColorShift 0.85s ease-in-out forwards",
      },
    });
    const tid = setTimeout(() => {
      if (st.phase === PHASES.COLOR_SHIFT) setPhase(PHASES.REMEMBER);
    }, 830);
    onCleanup(() => clearTimeout(tid));
    return wrap;
  }

  function renderCandyTray() {
    const wrap = h("div", "", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        userSelect: "none",
        cursor: "pointer",
      },
    });
    const startHold = () => {
      if (st.candyDoneR) return;
      st.candyHold = true;
      st.candyHint = false;
      if (st.candyH === 0) st.candyAtt += 1;
    };
    const endHold = () => {
      st.candyHold = false;
    };
    wrap.addEventListener("mousedown", startHold);
    wrap.addEventListener("mouseup", endHold);
    wrap.addEventListener("mouseleave", endHold);
    wrap.addEventListener("touchstart", startHold, { passive: true });
    wrap.addEventListener("touchend", endHold);
    onCleanup(() => {
      wrap.removeEventListener("mousedown", startHold);
      wrap.removeEventListener("mouseup", endHold);
      wrap.removeEventListener("mouseleave", endHold);
      wrap.removeEventListener("touchstart", startHold);
      wrap.removeEventListener("touchend", endHold);
    });
    const onKey = (e) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (e.type === "keydown") startHold();
      else endHold();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    onCleanup(() => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    });
    wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #2D1B69 100%)" } }));
    wrap.appendChild(h("div", "tiled-floor", { style: { position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none" } }));
    const quote = h("div", "", { style: { position: "relative", zIndex: 20, textAlign: "center", padding: "3.5rem 1.5rem 0.5rem", flexShrink: 0 } });
    quote.appendChild(
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", marginBottom: "0.5rem" } }, [
        "Memory 01",
      ])
    );
    CANDY_QUOTE.split("\n").forEach((ln) => {
      quote.appendChild(
        h("p", "font-heading", { style: { fontSize: "clamp(1.25rem, 4vw, 1.5rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.375, margin: "0 0 0.25rem" } }, [ln])
      );
    });
    wrap.appendChild(quote);
    const play = h("div", "", { style: { position: "relative", flex: 1, margin: "0 auto", width: "100%", maxWidth: "480px" } });
    const shelf = h("div", "", { style: { position: "absolute", left: 0, right: 0, zIndex: 10, top: "12%" } });
    shelf.appendChild(
      h("div", "", {
        style: { height: "10px", background: "linear-gradient(180deg, #5a3010, #2a1206)", boxShadow: "0 4px 14px rgba(0,0,0,0.7)" },
      })
    );
    const itemsRow = h("div", "", { style: { display: "flex", justifyContent: "space-around", padding: "0.25rem 0 0.5rem", background: "rgba(30,15,5,0.4)" } });
    for (let i = 0; i < 7; i++) {
      const imgSrc = i === 3 ? CANDY_TARGET : CANDY_SHELF_IMGS[i % CANDY_SHELF_IMGS.length];
      const w = i === 3 ? 40 : 28;
      const filt = i === 3 ? (st.candyGrab ? "drop-shadow(0 0 14px rgba(255,46,99,0.9))" : "drop-shadow(0 0 10px rgba(255,215,0,0.6))") : "brightness(0.55)";
      itemsRow.appendChild(
        h("img", "", {
          src: imgSrc,
          alt: "shelf item",
          style: {
            width: `${w}px`,
            height: `${w}px`,
            objectFit: "contain",
            filter: filt,
            opacity: i === 3 && st.candyGrab ? 0 : 1,
            transition: "opacity 0.3s",
          },
        })
      );
    }
    shelf.appendChild(itemsRow);
    play.appendChild(shelf);
    const barWrap = h("div", "", { style: { position: "absolute", right: "12px", zIndex: 20, top: "15%", bottom: "12%", width: "6px" } });
    barWrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, borderRadius: "9999px", background: "rgba(255,255,255,0.1)" } }));
    const barFill = h("div", "", {
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: "9999px",
        height: `${st.candyH * 100}%`,
        background: st.candyH > 0.8 ? "linear-gradient(0deg, #FF2E63, #FFD700)" : "linear-gradient(0deg, #7B2FF2, #00D1FF)",
        boxShadow: st.candyH > 0.8 ? "0 0 12px rgba(255,46,99,0.6)" : "0 0 8px rgba(0,209,255,0.4)",
        transition: "height 0.05s linear",
      },
    });
    barWrap.appendChild(barFill);
    barWrap.appendChild(
      h("div", "", {
        style: { position: "absolute", left: "50%", transform: "translateX(-50%)", width: "16px", height: "2px", background: "#FF2E63", bottom: "88%" },
      })
    );
    play.appendChild(barWrap);
    const charBottom = 12 + st.candyH * 55;
    const charWrap = h("div", "", {
      style: {
        position: "absolute",
        left: "50%",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        bottom: `${charBottom}%`,
        transform: "translateX(-50%)",
        transition: "bottom 0.05s linear",
      },
    });
    if (st.candyGrab) {
      charWrap.appendChild(
        h("img", "", {
          src: CANDY_TARGET,
          alt: "grabbed chips",
          style: {
            width: "40px",
            height: "40px",
            objectFit: "contain",
            marginBottom: "2px",
            filter: "drop-shadow(0 0 8px rgba(255,215,0,0.5))",
          },
        })
      );
    }
    charWrap.appendChild(h("div", "", { style: { fontSize: "42px", lineHeight: 1 } }, ["\u{1F9CD}\u{200D}\u{2640}\u{FE0F}"]));
    charWrap.appendChild(
      h("div", "", {
        style: {
          width: "36px",
          height: "6px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.4)",
          transform: `scaleX(${1 - st.candyH * 0.5})`,
          marginTop: "2px",
          filter: "blur(2px)",
        },
      })
    );
    play.appendChild(charWrap);
    play.appendChild(
      h("div", "", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: "48px", background: "linear-gradient(0deg, rgba(10,5,25,0.9) 0%, transparent 100%)" } })
    );
    wrap.appendChild(play);
    const instr = h("div", "", { style: { position: "relative", zIndex: 20, marginBottom: "1.25rem", textAlign: "center", pointerEvents: "none", flexShrink: 0 } });
    if (!st.candyDone && st.candyHint) {
      instr.appendChild(
        h("p", "font-heading", { style: { color: EYEBROW_GOLD, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 } }, [
        "Hold Space or press and hold screen",
      ])
      );
      instr.appendChild(h("p", "font-body", { style: { color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontStyle: "italic", margin: "0.25rem 0 0" } }, ["Keep holding to climb higher"]));
    } else if (!st.candyDone && !st.candyHint) {
      instr.appendChild(
        h(
          "p",
          "font-body",
          { style: { color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontStyle: "italic", margin: 0 } },
          [st.candyAtt > 1 ? "Almost! Hold longer..." : "Keep holding..."]
        )
      );
    } else {
      instr.appendChild(
        h(
          "p",
          "font-heading",
          { style: { color: "#FF2E63", fontSize: "1.125rem", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, textShadow: "0 0 20px rgba(255,46,99,0.7)" } },
          ["Got it!"]
        )
      );
    }
    wrap.appendChild(instr);
    const tick = () => {
      if (st.phase !== PHASES.MEMORIES || st.memoryStep !== 0) return;
      if (st.candyDoneR) return;
      if (st.candyHold) {
        st.candyH = Math.min(1, st.candyH + 0.04);
        if (Math.random() < 0.08) playRise(st.candyH);
      } else {
        const prev = st.candyH;
        st.candyH = Math.max(0, st.candyH - 0.06);
        if (prev > 0.05 && st.candyH === 0) playLand();
      }
      barFill.style.height = `${st.candyH * 100}%`;
      charWrap.style.bottom = `${12 + st.candyH * 55}%`;
      if (st.candyH >= 0.88 && !st.candyDoneR) {
        st.candyDoneR = true;
        playGrab();
        setTimeout(() => playFound(), 200);
        st.candyGrab = true;
        st.candyDone = true;
        render();
        setTimeout(() => {
          st.memoryStep = 1;
          render();
        }, 2200);
        return;
      }
      st.candyRaf = requestAnimationFrame(tick);
    };
    if (!st.candyDoneR) {
      st.candyRaf = requestAnimationFrame(tick);
      onCleanup(() => {
        if (st.candyRaf) cancelAnimationFrame(st.candyRaf);
        st.candyRaf = null;
      });
    }
    return wrap;
  }

  function renderFoggyFridge() {
    startFridgeHum();
    onCleanup(() => stopFridgeHum());
    const wrap = h("div", "", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" } });
    wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 100%)" } }));
    const quote = h("div", "", { style: { position: "relative", zIndex: 20, textAlign: "center", padding: "0 1.5rem", marginBottom: "1.5rem", maxWidth: "28rem" } });
    quote.appendChild(
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", marginBottom: "0.75rem" } }, ["Memory 02"])
    );
    FRIDGE_QUOTE.split("\n").forEach((ln) => {
      quote.appendChild(
        h("p", "font-heading", { style: { fontSize: "clamp(1.125rem, 3vw, 1.25rem)", color: "rgba(255,255,255,0.9)", lineHeight: 1.375, margin: "0 0 0.25rem" } }, [ln])
      );
    });
    wrap.appendChild(quote);
    const door = h("div", "", { style: { position: "relative", zIndex: 10, width: "min(92vw, 520px)", height: "min(45vw, 240px)" } });
    const inner = h("div", "", {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "1rem",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0a1a2a 0%, #061018 100%)",
        border: "2px solid rgba(0,209,255,0.25)",
        boxShadow: "0 0 30px rgba(0,209,255,0.1), inset 0 0 40px rgba(0,0,0,0.5)",
      },
    });
    [38, 72].forEach((y) => {
      inner.appendChild(h("div", "", { style: { position: "absolute", left: 0, right: 0, height: "1px", top: `${y}%`, background: "rgba(200,240,255,0.08)" } }));
    });
    FRIDGE_DRINKS.forEach((d) => {
      const el = h("div", "", { style: { position: "absolute", left: d.x, top: d.y, transform: "translate(-50%, -50%)" } });
      el.appendChild(
        h("img", "", {
          src: d.img,
          alt: d.label,
          style: { width: "36px", height: "36px", objectFit: "contain", filter: "brightness(0.9) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" },
        })
      );
      inner.appendChild(el);
    });
    door.appendChild(inner);
    const canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 240;
    canvas.className = "baqala-scroll";
    Object.assign(canvas.style, {
      position: "absolute",
      inset: 0,
      borderRadius: "1rem",
      cursor: st.fridgeDone ? "default" : "crosshair",
      width: "100%",
      height: "100%",
      touchAction: "none",
      zIndex: "10",
    });
    const ctx2 = canvas.getContext("2d");
    const snap = st.fridgeSnapshot;
    if (st.fridgeDone && snap && snap.width === canvas.width && snap.height === canvas.height) {
      ctx2.putImageData(snap, 0, 0);
    } else {
      ctx2.fillStyle = "rgba(200,230,255,0.82)";
      ctx2.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 300; i++) {
        ctx2.fillStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.2})`;
        ctx2.beginPath();
        ctx2.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2 + Math.random() * 5, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    const NEEDED = 40;
    const barFill = h("div", "", {
      style: {
        height: "100%",
        width: `${Math.min(100, (st.fridgeClr / NEEDED) * 100)}%`,
        background: "#00D1FF",
        borderRadius: "9999px",
        transition: "width 0.08s linear",
      },
    });
    const updateFridgeBar = () => {
      barFill.style.width = `${Math.min(100, (st.fridgeClr / NEEDED) * 100)}%`;
    };
    const handleMove = (e) => {
      if (st.fridgeDone) return;
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
      const cy = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = cx * scaleX;
      const y = cy * scaleY;
      ctx2.globalCompositeOperation = "destination-out";
      ctx2.beginPath();
      ctx2.arc(x, y, 38 * scaleX, 0, Math.PI * 2);
      ctx2.fill();
      if (Math.random() < 0.2) playGlassWipe();
      const data = ctx2.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 128) transparent++;
      }
      const pct = Math.round((transparent / (canvas.width * canvas.height)) * 100);
      st.fridgeClr = pct;
      if (pct >= NEEDED && !st.fridgeDone) {
        st.fridgeDone = true;
        st.fridgeSnapshot = ctx2.getImageData(0, 0, canvas.width, canvas.height);
        playFound();
        render();
        setTimeout(() => setPhase(PHASES.QUIZ), 2000);
      } else if (!st.fridgeDone) {
        updateFridgeBar();
      }
    };
    if (!st.fridgeDone) {
      if (window.PointerEvent) {
        canvas.addEventListener("pointermove", handleMove);
      } else {
        canvas.addEventListener("mousemove", handleMove);
        canvas.addEventListener("touchmove", handleMove, { passive: true });
      }
      onCleanup(() => {
        if (window.PointerEvent) {
          canvas.removeEventListener("pointermove", handleMove);
        } else {
          canvas.removeEventListener("mousemove", handleMove);
          canvas.removeEventListener("touchmove", handleMove);
        }
      });
    }
    door.appendChild(canvas);
    door.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "6px",
          height: "60px",
          borderRadius: "3px",
          background: "linear-gradient(180deg, #aaa 0%, #666 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        },
      })
    );
    wrap.appendChild(door);
    const prog = h("div", "", { style: { position: "relative", zIndex: 20, marginTop: "1rem", width: "12rem" } });
    const track = h("div", "", { style: { height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "9999px", overflow: "hidden" } });
    track.appendChild(barFill);
    prog.appendChild(track);
    wrap.appendChild(prog);
    const hint = h("div", "", { style: { position: "relative", zIndex: 20, marginTop: "0.75rem", textAlign: "center", pointerEvents: "none" } });
    hint.appendChild(
      h(
        "p",
        st.fridgeDone ? "font-heading" : "font-body",
        {
          style: st.fridgeDone
            ? { color: "#00D1FF", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, textShadow: "0 0 18px rgba(0,209,255,0.45)" }
            : { color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontStyle: "italic", margin: 0 },
        },
        [st.fridgeDone ? "There they are." : "Move your cursor to wipe the frost"]
      )
    );
    wrap.appendChild(hint);
    return wrap;
  }

  function renderMemories() {
    const wrap = h("div", "", { style: { position: "fixed", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)" } });
    const dots = h("div", "", { style: { position: "absolute", top: "1.25rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.5rem", zIndex: 30, pointerEvents: "none" } });
    [0, 1].forEach((i) => {
      const on = i === st.memoryStep;
      const done = i < st.memoryStep;
      dots.appendChild(
        h("div", "", {
          style: {
            width: "6px",
            height: "6px",
            borderRadius: "9999px",
            background: on ? "#FFD700" : done ? "#FF2E63" : "rgba(255,255,255,0.2)",
            transform: on ? "scale(1.5)" : "scale(1)",
            transition: "all 0.5s",
          },
        })
      );
    });
    wrap.appendChild(dots);
    wrap.appendChild(st.memoryStep === 0 ? renderCandyTray() : renderFoggyFridge());
    return wrap;
  }
  function renderQuiz() {
    if (st.quizStarted && st.quizGameIndex === 0 && st.mgTarget.length === 0) initMemoryGrid();
    const wrap = h("div", "", {
      style: { position: "fixed", inset: 0, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" },
    });
    if (!st.quizStarted) {
      wrap.appendChild(h("div", "tiled-floor", { style: { position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" } }));
      wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 100%)" } }));
      const center = h("div", "", {
        style: {
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          width: "100%",
          minHeight: 0,
        },
      });
      const box = h("div", "", { style: { width: "100%", maxWidth: "28rem", textAlign: "center" } });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.5em", color: EYEBROW_GOLD, textTransform: "uppercase", marginBottom: "1.5rem" } }, ["But first"])
      );
      box.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "clamp(1.75rem, 6vw, 2.25rem)", color: "#fff", marginBottom: "1rem", textTransform: "uppercase" } }, [
          "We test your memory.",
        ])
      );
      box.appendChild(
        h(
          "button",
          "font-heading btn-raspberry",
          {
            onclick: () => {
              st.quizStarted = true;
              render();
            },
          },
          ["Let's Go"]
        )
      );
      center.appendChild(box);
      wrap.appendChild(center);
      return wrap;
    }
    const dots = h("div", "", { style: { position: "absolute", top: "1rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.5rem", zIndex: 30, pointerEvents: "none" } });
    [0, 1, 2].forEach((i) => {
      const on = i === st.quizGameIndex;
      const done = i < st.quizGameIndex;
      dots.appendChild(
        h("div", "", {
          style: {
            width: "6px",
            height: "6px",
            borderRadius: "9999px",
            background: on ? "#FFD700" : done ? "#FF2E63" : "rgba(255,255,255,0.2)",
            transform: on ? "scale(1.5)" : "scale(1)",
            transition: "all 0.5s",
          },
        })
      );
    });
    wrap.appendChild(dots);
    if (st.quizGameIndex === 0) wrap.appendChild(renderMemoryGame());
    else if (st.quizGameIndex === 1) wrap.appendChild(renderSpeedGame());
    else wrap.appendChild(renderSequenceGame());
    return wrap;
  }

  function renderMemoryGame() {
    const wrap = h("div", "", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", overflow: "hidden" } });
    wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 100%)" } }));
    const inner = h("div", "", { style: { position: "relative", zIndex: 10, width: "100%", maxWidth: "36rem", padding: "0 0.5rem" } });
    if (st.mgPhase === "memorize") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: "0.75rem" } }, ["Game 1 - Memory"])
      );
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.25rem", color: "#fff", textAlign: "center", margin: "0 0 0.25rem" } }, ["Remember these 5 items"])
      );
      inner.appendChild(
        h("p", "font-body", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", textAlign: "center", marginBottom: "1.5rem" } }, ["They will vanish. Memorise them."])
      );
      const grid = h("div", "", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "clamp(0.4rem, 1.5vw, 0.65rem)" } });
      st.mgTarget.forEach((item) => {
        const cell = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" } });
        const box = h("div", "", {
          style: {
            width: "clamp(4.25rem, 14vw, 5.25rem)",
            height: "clamp(4.25rem, 14vw, 5.25rem)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          },
        });
        box.appendChild(
          h("img", "", {
            src: item.img,
            alt: item.label,
            style: { width: "clamp(3.15rem, 11vw, 4.1rem)", height: "clamp(3.15rem, 11vw, 4.1rem)", objectFit: "contain" },
          })
        );
        cell.appendChild(box);
        cell.appendChild(h("span", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.2 } }, [item.label]));
        grid.appendChild(cell);
      });
      inner.appendChild(grid);
      const bar = h("div", "", { style: { marginTop: "1.5rem", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "9999px", overflow: "hidden" } });
      bar.appendChild(h("div", "mem-bar-anim", { style: { height: "100%", background: "#FF2E63", borderRadius: "9999px" } }));
      inner.appendChild(bar);
    } else if (st.mgPhase === "countdown") {
      inner.appendChild(h("p", "font-heading", { style: { color: SUBHEADING_COLOR, textTransform: "uppercase", letterSpacing: "0.2em", textAlign: "center", marginBottom: "1rem" } }, ["Get ready..."]));
      inner.appendChild(
        h(
          "div",
          "font-heading",
          { style: { fontWeight: 700, fontSize: "clamp(4rem, 15vw, 6rem)", color: "#FFD700", textAlign: "center", textShadow: "0 0 40px rgba(255,215,0,0.5)" } },
          [String(st.mgCd)]
        )
      );
    } else if (st.mgPhase === "recall") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: "0.5rem" } }, ["Game 1 - Memory"])
      );
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.125rem", color: "#fff", textAlign: "center", margin: "0 0 0.25rem" } }, ["Which 5 did you see?"])
      );
      inner.appendChild(
        h("p", "font-body", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", textAlign: "center", marginBottom: "1rem" } }, [`${st.mgSel.length}/5 selected`])
      );
      const grid = h("div", "", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.25rem" } });
      st.mgGrid.forEach((item) => {
        const sel = st.mgSel.includes(item.id);
        const btn = h("button", "font-heading", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: sel ? "2px solid #FF2E63" : "2px solid rgba(255,255,255,0.1)",
            background: sel ? "rgba(255,46,99,0.2)" : "rgba(255,255,255,0.05)",
            cursor: "pointer",
            color: "#fff",
          },
          onclick: () => {
            if (st.mgSel.includes(item.id)) st.mgSel = st.mgSel.filter((x) => x !== item.id);
            else {
              if (st.mgSel.length >= MG_SHOW) return;
              playClick();
              st.mgSel = [...st.mgSel, item.id];
            }
            render();
          },
        });
        btn.appendChild(h("img", "", { src: item.img, alt: item.label, style: { width: "3.5rem", height: "3.5rem", objectFit: "contain" } }));
        btn.appendChild(h("span", "font-heading", { style: { fontSize: "7px", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.2 } }, [item.label]));
        if (sel) btn.appendChild(h("div", "", { style: { width: "8px", height: "8px", borderRadius: "9999px", background: "#FF2E63" } }));
        grid.appendChild(btn);
      });
      inner.appendChild(grid);
      inner.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              width: "100%",
              padding: "0.75rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.875rem",
              color: "#fff",
              opacity: st.mgSel.length === 0 ? 0.3 : 1,
              cursor: st.mgSel.length === 0 ? "not-allowed" : "pointer",
              background: "linear-gradient(135deg, #FF2E63, #7B2FF2)",
              boxShadow: "0 4px 20px rgba(255,46,99,0.3)",
            },
            disabled: st.mgSel.length === 0,
            onclick: () => {
              const correct = st.mgSel.filter((id) => st.mgTarget.some((t) => t.id === id)).length;
              const s = correct >= 5 ? 3 : correct >= 3 ? 2 : correct >= 1 ? 1 : 0;
              st.mgScore = { correct, s };
              st.mgPhase = "result";
              if (s === 3) playFound();
              else playLand();
              render();
              setTimeout(() => {
                st.quizScores.push(s);
                st.quizGameIndex += 1;
                if (st.quizGameIndex >= 3) {
                  applyBudgetFromQuizScores();
                  setPhase(PHASES.BUDGET);
                } else {
                  st.spPhase = "intro";
                  render();
                }
              }, 2000);
            },
          },
          ["Submit"]
        )
      );
    } else if (st.mgPhase === "result" && st.mgScore) {
      const emoji = st.mgScore.s === 3 ? "\u{1F9E0}" : st.mgScore.s === 2 ? "\u{1F605}" : "\u{1F636}";
      inner.appendChild(h("div", "", { style: { fontSize: "4rem", textAlign: "center", marginBottom: "1rem" } }, [emoji]));
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textAlign: "center", textTransform: "uppercase", marginBottom: "0.5rem" } }, [`${st.mgScore.correct}/5 correct`])
      );
      const msg =
        st.mgScore.s === 3
          ? "Baqala photographic memory."
          : st.mgScore.s === 2
            ? "Not bad. You were paying attention."
            : "";
      inner.appendChild(h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center" } }, [msg]));
      inner.appendChild(
        h("div", "font-heading", { style: { marginTop: "1rem", fontSize: "1.875rem", color: "#FFD700", fontWeight: 700, textAlign: "center" } }, [`+${st.mgScore.s} AED`])
      );
    }
    wrap.appendChild(inner);
    return wrap;
  }

  function renderSpeedGame() {
    const wrap = h("div", "", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" } });
    wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 100%)" } }));
    if (st.spPhase === "intro") {
      const box = h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3.75rem 1.5rem 2rem",
          boxSizing: "border-box",
          overflowY: "auto",
          zIndex: 10,
        },
      });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", marginBottom: "1rem" } }, ["Game 2 - Speed"])
      );
      box.appendChild(
        h("img", "", {
          src: SP_TARGETS[0].img,
          alt: "Areej",
          style: {
            width: "5rem",
            height: "5rem",
            objectFit: "contain",
            marginBottom: "1.5rem",
            borderRadius: "1rem",
            border: "2px solid rgba(255,215,0,0.9)",
            boxShadow: "0 0 24px rgba(255,215,0,0.35)",
            background: "rgba(255,215,0,0.08)",
          },
        })
      );
      box.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textAlign: "center", textTransform: "uppercase", marginBottom: "0.75rem" } }, ["Grab the Areej"])
      );
      box.appendChild(
        h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center", maxWidth: "20rem", marginBottom: "0.5rem" } }, [
          "Tap Areej Juice as fast as you can. Ignore everything else.",
        ])
      );
      box.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              marginTop: "1.5rem",
              padding: "1rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.875rem",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #00D1FF, #7B2FF2)",
              boxShadow: "0 4px 24px rgba(0,209,255,0.3)",
            },
            onclick: () => {
              st.spPhase = "playing";
              st.spTime = 10;
              st.spItems = [];
              st.spHits = 0;
              st.spMiss = 0;
              st.spTargetsSpawned = 0;
              st.spUid = 0;
              if (st.spTimer) clearInterval(st.spTimer);
              if (st.spSpawn) clearInterval(st.spSpawn);
              st.spTimer = setInterval(() => {
                st.spTime -= 1;
                render();
                if (st.spTime <= 0) {
                  clearInterval(st.spTimer);
                  st.spTimer = null;
                  clearInterval(st.spSpawn);
                  st.spSpawn = null;
                  const s = scoreSpeedRound();
                  if (s === 3) playFound();
                  else playLand();
                  st.spPhase = "result";
                  st.spResultAed = s;
                  render();
                }
              }, 1000);
              st.spSpawn = setInterval(() => {
                const isTarget = Math.random() < 0.45;
                const item = isTarget ? SP_TARGETS[0] : SP_TARGETS[1 + Math.floor(Math.random() * (SP_TARGETS.length - 1))];
                const id = st.spUid++;
                const pos = { x: 8 + Math.random() * 72, y: 28 + Math.random() * 42 };
                if (isTarget) st.spTargetsSpawned += 1;
                st.spItems = [...st.spItems, { ...item, uid: id, pos }];
                render();
                setTimeout(() => {
                  st.spItems = st.spItems.filter((i) => i.uid !== id);
                  render();
                }, 1100);
              }, 800);
              render();
            },
          },
          ["Start"]
        )
      );
      wrap.appendChild(box);
    } else if (st.spPhase === "playing") {
      wrap.style.touchAction = "manipulation";
      const hud = h("div", "", {
        style: {
          position: "absolute",
          top: "2.65rem",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.65rem 1.25rem",
          zIndex: 20,
          background: "rgba(13,8,34,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      });
      const hudL = h("div", "", {});
      hudL.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: SUBHEADING_COLOR, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 } }, ["Points"]));
      hudL.appendChild(h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1.25rem", color: "#FF2E63", margin: 0 } }, [String(st.spHits)]));
      const hudC = h("div", "", { style: { textAlign: "center" } });
      hudC.appendChild(
        h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", margin: 0, color: st.spTime <= 3 ? "#FF2E63" : "#FFD700" } }, [`${st.spTime}s`])
      );
      const hudR = h("div", "", { style: { textAlign: "right" } });
      hudR.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: SUBHEADING_COLOR, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 } }, ["Misses"]));
      hudR.appendChild(h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1.25rem", color: "rgba(255,255,255,0.4)", margin: 0 } }, [String(st.spMiss)]));
      hud.appendChild(hudL);
      hud.appendChild(hudC);
      hud.appendChild(hudR);
      wrap.appendChild(hud);
      const hintWrap = h("div", "", { style: { position: "absolute", bottom: "1.25rem", left: 0, right: 0, textAlign: "center", zIndex: 20, pointerEvents: "none" } });
      hintWrap.appendChild(h("p", "font-body", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", fontStyle: "italic", margin: 0 } }, ["Tap Areej Juice only"]));
      wrap.appendChild(hintWrap);
      const drawOrder = [...st.spItems].sort((a, b) => (a.isTarget ? 1 : 0) - (b.isTarget ? 1 : 0));
      drawOrder.forEach((item) => {
        const b = h("button", "font-heading", {
          type: "button",
          style: {
            position: "absolute",
            left: `${item.pos.x}%`,
            top: `${item.pos.y}%`,
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: item.isTarget ? 26 : 12,
            padding: "0.35rem",
            minWidth: "6.25rem",
            minHeight: "6.25rem",
            webkitTapHighlightColor: "transparent",
          },
        });
        const registerTap = () => {
          st.spItems = st.spItems.filter((i) => i.uid !== item.uid);
          if (item.isTarget) {
            playClick();
            st.spHits += 1;
          } else {
            playLand();
            st.spMiss += 1;
          }
          render();
        };
        b.addEventListener("pointerdown", (e) => {
          if (!e.isPrimary) return;
          if (e.pointerType === "mouse" && e.button !== 0) return;
          e.preventDefault();
          registerTap();
        });
        b.addEventListener("keydown", (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          registerTap();
        });
        const ib = h("div", "", {
          style: {
            width: "5rem",
            height: "5rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: item.isTarget ? "rgba(255,215,0,0.14)" : "rgba(255,255,255,0.08)",
            boxShadow: item.isTarget ? "0 0 22px rgba(255,215,0,0.45), inset 0 0 14px rgba(255,215,0,0.12)" : "none",
            border: item.isTarget ? "2px solid rgba(255,215,0,0.92)" : "none",
          },
        });
        ib.appendChild(
          h("img", "", {
            src: item.img,
            alt: item.label,
            draggable: false,
            style: { width: "3.5rem", height: "3.5rem", objectFit: "contain", userSelect: "none" },
          })
        );
        b.appendChild(ib);
        b.appendChild(
          h("span", "font-heading", {
            style: {
              fontSize: "7px",
              color: item.isTarget ? "rgba(255,228,150,0.88)" : "rgba(255,255,255,0.5)",
              userSelect: "none",
            },
          }, [item.label])
        );
        wrap.appendChild(b);
      });
    } else if (st.spPhase === "result" && st.spResultAed != null) {
      const aed = st.spResultAed;
      const hits = st.spHits;
      const grabbedLine =
        hits === 0
          ? "No Areej taps this round."
          : hits === 1
            ? "You grabbed Areej once."
            : `You grabbed Areej ${hits} times.`;
      const box = h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3.75rem 1.5rem 2rem",
          boxSizing: "border-box",
          zIndex: 10,
        },
      });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", marginBottom: "1rem" } }, ["Time's up"])
      );
      box.appendChild(
        h("p", "font-body", { style: { fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: "22rem", margin: "0 0 1.5rem" } }, [grabbedLine])
      );
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "0.75rem", letterSpacing: "0.2em", color: SUBHEADING_COLOR, textTransform: "uppercase", margin: "0 0 0.5rem" } }, ["Added to your budget"])
      );
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "clamp(2.5rem, 10vw, 3.5rem)", fontWeight: 800, color: "#FFD700", margin: "0 0 2rem", textShadow: "0 0 28px rgba(255,215,0,0.35)" } }, [`+${aed} AED`])
      );
      box.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              padding: "1rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.875rem",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #00D1FF, #7B2FF2)",
              boxShadow: "0 4px 24px rgba(0,209,255,0.3)",
            },
            onclick: () => {
              st.quizScores.push(aed);
              st.spResultAed = null;
              st.spPhase = "intro";
              st.quizGameIndex += 1;
              if (st.quizGameIndex >= 3) {
                applyBudgetFromQuizScores();
                setPhase(PHASES.BUDGET);
              } else {
                st.sqPhase = "intro";
                render();
              }
            },
          },
          ["Continue"]
        )
      );
      wrap.appendChild(box);
    }
    return wrap;
  }

  function renderSequenceGame() {
    const wrap = h("div", "", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", overflow: "hidden" } });
    wrap.appendChild(h("div", "", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 100%)" } }));
    const inner = h("div", "", { style: { position: "relative", zIndex: 10, width: "100%", maxWidth: "36rem", padding: "0 0.5rem" } });
    const finishSeq = (s) => {
      if (st.sqWrongTid) clearTimeout(st.sqWrongTid);
      st.sqWrongTid = null;
      st.sqPhase = "result";
      render();
      setTimeout(() => {
        st.quizScores.push(s);
        st.quizGameIndex += 1;
        if (st.quizGameIndex >= 3) {
          applyBudgetFromQuizScores();
          setPhase(PHASES.BUDGET);
        } else render();
      }, 2600);
    };
    if (st.sqPhase === "intro") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: "1rem" } }, ["Game 3 - Sequence"])
      );
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textAlign: "center", textTransform: "uppercase", marginBottom: "0.75rem" } }, ["The Order"])
      );
      inner.appendChild(
        h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center", maxWidth: "22rem", margin: "0 auto 2rem" } }, [
          "Watch the snacks appear in order. Then repeat the sequence.",
        ])
      );
      inner.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              display: "block",
              margin: "0 auto",
              padding: "1rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.875rem",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #FFD700, #FF2E63)",
              boxShadow: "0 4px 24px rgba(255,215,0,0.3)",
            },
            onclick: () => {
              if (st.sqWrongTid) clearTimeout(st.sqWrongTid);
              st.sqWrongTid = null;
              st.sqSeq = Array.from({ length: SQ_LEN }, () => SQ_ITEMS[Math.floor(Math.random() * SQ_ITEMS.length)]);
              st.sqPlay = [];
              st.sqWrong = false;
              st.sqMistakes = 0;
              st.sqDone = false;
              st.sqPhase = "showing";
              st.sqShow = -1;
              st.sqTids.forEach(clearTimeout);
              st.sqTids = [];
              st.sqSeq.forEach((_, i) => {
                const t = setTimeout(() => {
                  st.sqShow = i;
                  playCoin();
                  render();
                  st.sqTids.push(
                    setTimeout(() => {
                      st.sqShow = -1;
                      render();
                    }, 500)
                  );
                }, 700 + i * 900);
                st.sqTids.push(t);
              });
              const tEnd = setTimeout(() => {
                st.sqPhase = "input";
                st.sqPlay = [];
                render();
              }, 700 + st.sqSeq.length * 900 + 300);
              st.sqTids.push(tEnd);
              render();
            },
          },
          ["Watch"]
        )
      );
    } else if (st.sqPhase === "showing" || st.sqPhase === "input") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: SUBHEADING_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: "0.25rem" } }, ["Game 3 - Sequence"])
      );
      if (st.sqPhase === "showing") {
        inner.appendChild(h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.125rem", color: "#fff", textAlign: "center", marginBottom: "1rem" } }, ["Watch the order..."]));
        const strip = h("div", "", { style: { display: "flex", justifyContent: "center", gap: "0.65rem", marginBottom: "0.5rem", flexWrap: "wrap" } });
        st.sqSeq.forEach((item, i) => {
          const lit = st.sqShow === i;
          const slot = h("div", "", {
            style: {
              width: "3.125rem",
              height: "3.125rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: lit ? "scale(1.35)" : "scale(1)",
              boxShadow: lit ? `0 0 20px ${item.color}` : "none",
              background: lit ? `${item.color}55` : "rgba(255,255,255,0.07)",
              transition: "all 0.15s",
            },
          });
          if (st.sqShow >= i) slot.appendChild(h("img", "", { src: item.img, alt: item.label, style: { width: "2rem", height: "2rem", objectFit: "contain" } }));
          else slot.appendChild(h("span", "", { style: { fontSize: "1.125rem" } }, ["?"]));
          strip.appendChild(slot);
        });
        inner.appendChild(strip);
      } else {
        inner.appendChild(
          h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.125rem", color: "#fff", textAlign: "center", marginBottom: "0.25rem" } }, ["Your turn. Repeat the order."])
        );
        const prog = h("div", "", { style: { display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem", marginBottom: "0.25rem" } });
        st.sqSeq.forEach((item, i) => {
          const filled = i < st.sqPlay.length;
          const wrongFlash = st.sqWrong && i === st.sqPlay.length;
          const cell = h("div", "", {
            style: {
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
              background: wrongFlash ? "rgba(255,46,99,0.4)" : filled ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.06)",
              border: wrongFlash || filled ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
            },
          });
          if (wrongFlash) cell.appendChild(document.createTextNode("X"));
          else if (!filled) cell.appendChild(document.createTextNode("?"));
          else cell.appendChild(h("img", "", { src: st.sqPlay[i].img, alt: st.sqPlay[i].label, style: { width: "1.25rem", height: "1.25rem", objectFit: "contain" } }));
          prog.appendChild(cell);
        });
        inner.appendChild(prog);
      }
      const g = h("div", "", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "1rem" } });
      SQ_ITEMS.forEach((item) => {
        const btn = h("button", "font-heading", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            cursor: st.sqPhase === "showing" ? "default" : "pointer",
            color: "#fff",
            opacity: st.sqPhase === "showing" ? 0.5 : 1,
          },
          disabled: st.sqPhase === "showing",
          onclick: () => {
            if (st.sqPhase !== "input" || st.sqDone) return;
            const idx = st.sqPlay.length;
            if (item.id !== st.sqSeq[idx].id) {
              if (st.sqWrongTid) clearTimeout(st.sqWrongTid);
              st.sqWrongTid = null;
              st.sqMistakes += 1;
              st.sqWrong = true;
              st.sqDone = true;
              playLand();
              const correctCount = st.sqPlay.length;
              const s = 1;
              st.sqScore = { correct: correctCount, mistakes: st.sqMistakes, s };
              setTimeout(() => {
                st.sqWrong = false;
                finishSeq(s);
              }, 650);
              render();
              return;
            }
            playClick();
            st.sqWrong = false;
            st.sqPlay = [...st.sqPlay, item];
            if (st.sqPlay.length === st.sqSeq.length) {
              if (st.sqWrongTid) clearTimeout(st.sqWrongTid);
              st.sqWrongTid = null;
              st.sqWrong = false;
              st.sqDone = true;
              playFound();
              const m = st.sqMistakes;
              const s = m === 0 ? 3 : m <= 2 ? 2 : 1;
              st.sqScore = { correct: SQ_LEN, mistakes: m, s };
              setTimeout(() => finishSeq(s), 600);
            }
            render();
          },
        });
        btn.appendChild(h("img", "", { src: item.img, alt: item.label, style: { width: "4rem", height: "4rem", objectFit: "contain" } }));
        btn.appendChild(h("span", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" } }, [item.label]));
        g.appendChild(btn);
      });
      inner.appendChild(g);
    } else if (st.sqPhase === "result" && st.sqScore) {
      const emoji = st.sqScore.s === 3 ? "\u{1F31F}" : st.sqScore.s === 2 ? "\u{1F624}" : "\u{1F62C}";
      inner.appendChild(h("div", "", { style: { fontSize: "4rem", textAlign: "center", marginBottom: "1rem" } }, [emoji]));
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textTransform: "uppercase", textAlign: "center", marginBottom: "0.5rem" } }, [`${st.sqScore.correct}/${SQ_LEN} in order`])
      );
      const msg =
        st.sqScore.s === 3 ? "Perfect memory" : st.sqScore.s === 2 ? "Close, you almost had it" : "Try again next time";
      inner.appendChild(h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center" } }, [msg]));
      inner.appendChild(
        h("div", "font-heading", { style: { marginTop: "1rem", fontSize: "1.875rem", color: "#FFD700", fontWeight: 700, textAlign: "center" } }, [`+${st.sqScore.s} AED`])
      );
    }
    wrap.appendChild(inner);
    return wrap;
  }

  function renderBudget() {
    if (!st.brStarted) {
      st.brStarted = true;
      st.brCount = 0;
      st.brDone = false;
      setTimeout(() => {
        const start = performance.now();
        const tick = () => {
          if (st.phase !== PHASES.BUDGET) return;
          const p = Math.min((performance.now() - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const next = Math.round(eased * st.budget);
          if (p < 1) {
            if (next !== st.brCount) {
              if (Math.random() < 0.35) playCoin();
              st.brCount = next;
              render();
            }
            st.brRaf = requestAnimationFrame(tick);
          } else {
            st.brCount = st.budget;
            st.brDone = true;
            playFound();
            render();
          }
        };
        st.brRaf = requestAnimationFrame(tick);
      }, 600);
    }
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "1.5rem",
        background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)",
      },
    });
    wrap.appendChild(h("div", "tiled-floor", { style: { position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" } }));
    wrap.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.12) 0%, transparent 60%)",
          opacity: st.brDone ? 1 : 0.3,
          transition: "opacity 1s",
          pointerEvents: "none",
        },
      })
    );
    const box = h("div", "", { style: { position: "relative", zIndex: 10, textAlign: "center", maxWidth: "32rem" } });
    const num = h("div", "font-heading", {
      id: "budget-num",
      style: {
        fontWeight: 700,
        fontSize: "clamp(4rem, 18vw, 10rem)",
        lineHeight: 1,
        color: "#FFD700",
        textShadow: "0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,215,0,0.2)",
      },
    });
    num.textContent = String(st.brCount);
    box.appendChild(num);
    box.appendChild(
      h("p", "font-heading", { style: { fontSize: "1.5rem", color: EYEBROW_GOLD, letterSpacing: "0.2em", marginTop: "0.25rem" } }, ["DIRHAMS"])
    );
    const coins = h("div", "", { style: { display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" } });
    const cap = Math.min(st.budget, MAX_BUDGET);
    const visibleCoins = st.brDone ? cap : Math.min(st.brCount, cap);
    for (let i = 0; i < visibleCoins; i++) {
      coins.appendChild(
        h(
          "div",
          "",
          {
            style: {
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "9999px",
              background: "#FFD700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: 700,
              color: "#2D1B69",
            },
          },
          ["1"]
        )
      );
    }
    if (st.brDone && st.budget > MAX_BUDGET)
      coins.appendChild(h("span", "font-heading", { style: { fontSize: "0.875rem", color: EYEBROW_GOLD, alignSelf: "center" } }, [`+${st.budget - MAX_BUDGET}`]));
    box.appendChild(coins);
    if (st.brDone) {
      box.appendChild(
        h(
          "button",
          "font-heading btn-raspberry",
          {
            onclick: () => setPhase(PHASES.CURTAIN),
          },
          ["Enter the Baqala"]
        )
      );
    }
    wrap.appendChild(box);
    return wrap;
  }

  function renderCurtain() {
    const NUM_STRIPS = 14;
    st.curtainTg = st.curtainCur;
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
        background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)",
      },
      onclick: () => {
        if (st.curtainPart) return;
        playCurtainSwoosh();
        st.curtainPart = true;
        render();
        setTimeout(() => setPhase(PHASES.FLOOR), 900);
      },
    });
    wrap.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 60%, rgba(255,220,150,0.18) 0%, transparent 65%)",
        },
      })
    );
    const top = h("div", "", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        textAlign: "center",
        padding: "1.25rem 0",
        pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(13,8,34,0.95) 0%, transparent 100%)",
      },
    });
    top.appendChild(
      h(
        "p",
        "font-baqalaland-title font-heading",
        { style: { fontWeight: 700, letterSpacing: "0.34em", color: "#FFD700", fontSize: "clamp(0.875rem, 3vw, 1rem)", textShadow: "0 0 20px rgba(255,215,0,0.5)", margin: 0 } },
        ["Baqalaland"]
      )
    );
    top.appendChild(
      h("p", "font-body", { style: { fontSize: "10px", letterSpacing: "0.4em", color: EYEBROW_GOLD, textTransform: "uppercase", marginTop: "0.25rem", margin: 0 } }, ["Open 24/7 - baqala land"])
    );
    wrap.appendChild(top);
    const stripRow = h("div", "", { style: { position: "absolute", inset: 0, display: "flex", zIndex: 10 } });
    for (let i = 0; i < NUM_STRIPS; i++) {
      const stripCenter = (i + 0.5) / NUM_STRIPS;
      const dist = Math.abs(stripCenter - st.curtainX);
      const influence = Math.max(0, 1 - dist * 4.5);
      const direction = stripCenter < st.curtainX ? -1 : 1;
      const sway = influence * 44 * direction;
      const partX = st.curtainPart ? (stripCenter < 0.5 ? -window.innerWidth : window.innerWidth) : sway;
      const partDuration = 0.45 + Math.abs(stripCenter - 0.5) * 0.35;
      const col = h("div", "", {
        style: {
          position: "relative",
          flex: 1,
          height: "100%",
          transformOrigin: "top",
          transform: `translateX(${partX}px)`,
          transition: st.curtainPart ? `transform ${partDuration}s cubic-bezier(0.55, 0, 1, 0.45)` : "transform 0.12s ease-out",
        },
      });
      col.appendChild(
        h("div", "", {
          style: {
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(160,210,255,0.04) 0%, rgba(210,235,255,0.20) 18%, rgba(255,255,255,0.24) 42%, rgba(210,235,255,0.20) 68%, rgba(140,190,240,0.06) 100%)",
            borderLeft: "1px solid rgba(200,230,255,0.18)",
            borderRight: "1px solid rgba(200,230,255,0.07)",
            backdropFilter: "blur(0.5px)",
          },
        })
      );
      col.appendChild(
        h("div", "", {
          style: {
            position: "absolute",
            insetBlock: 0,
            left: "22%",
            width: "10%",
            pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
          },
        })
      );
      stripRow.appendChild(col);
    }
    wrap.appendChild(stripRow);
    const onMove = (e) => {
      st.curtainTg = (e.clientX ?? e.touches?.[0]?.clientX) / window.innerWidth;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    onCleanup(() => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    });
    const tick = () => {
      if (st.phase !== PHASES.CURTAIN) return;
      st.curtainCur += (st.curtainTg - st.curtainCur) * 0.1;
      st.curtainX = st.curtainCur;
      stripRow.querySelectorAll("[data-strip]").forEach((n) => n.removeAttribute("data-strip"));
      stripRow.childNodes.forEach((col, i) => {
        if (!(col instanceof HTMLElement)) return;
        const stripCenter = (i + 0.5) / NUM_STRIPS;
        const dist = Math.abs(stripCenter - st.curtainX);
        const influence = Math.max(0, 1 - dist * 4.5);
        const direction = stripCenter < st.curtainX ? -1 : 1;
        const sway = influence * 44 * direction;
        const partX = st.curtainPart ? (stripCenter < 0.5 ? -window.innerWidth : window.innerWidth) : sway;
        col.style.transform = `translateX(${partX}px)`;
      });
      st.curtainRaf = requestAnimationFrame(tick);
    };
    st.curtainRaf = requestAnimationFrame(tick);
    onCleanup(() => {
      if (st.curtainRaf) cancelAnimationFrame(st.curtainRaf);
      st.curtainRaf = null;
    });
    if (!st.curtainPart) {
      const hint = h("div", "", {
        style: {
          position: "absolute",
          bottom: "2.5rem",
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          pointerEvents: "none",
        },
      });
      hint.appendChild(
        h(
          "div",
          "font-heading",
          {
            style: {
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#fff",
              background: "rgba(255,46,99,0.2)",
              border: "1px solid rgba(255,46,99,0.45)",
              boxShadow: "0 0 20px rgba(255,46,99,0.15)",
              animation: "pulseScale 2s ease-in-out infinite",
            },
          },
          ["Enter"]
        )
      );
      hint.appendChild(
        h("p", "font-body", { style: { fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" } }, ["Move your cursor to part the strips"])
      );
      wrap.appendChild(hint);
    }
    return wrap;
  }

  function shelfRow(snacks, onPick) {
    const row = h("div", "", { style: { position: "relative", marginBottom: "0.25rem" } });
    row.appendChild(
      h("div", "", {
        style: {
          position: "relative",
          zIndex: 10,
          height: "10px",
          background: "linear-gradient(180deg, #5a3010 0%, #3a1e08 60%, #2a1206 100%)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,180,80,0.15)",
          borderRadius: "3px",
        },
      })
    );
    const tray = h("div", "", {
      style: { display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "0 0.75rem 0", minHeight: "110px" },
    });
    snacks.forEach((snack, i) => {
      const sel = st.floorPick.some((p) => p.id === snack.id);
      const btn = h("button", "font-heading", {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          background: "transparent",
          width: `${100 / snacks.length}%`,
          maxWidth: "90px",
          padding: 0,
        },
        onclick: () => onPick(snack),
      });
      if (sel) {
        btn.appendChild(
          h("div", "", {
            style: {
              position: "absolute",
              inset: "-6px",
              borderRadius: "16px",
              pointerEvents: "none",
              background: "radial-gradient(ellipse 80% 85% at 50% 45%, rgba(255,215,0,0.16) 0%, rgba(255,200,80,0.04) 50%, transparent 72%)",
            },
          })
        );
      }
      btn.appendChild(
        h("img", "", {
          src: snack.img,
          alt: snack.name,
          style: {
            width: "clamp(42px, 8vw, 68px)",
            height: "clamp(42px, 8vw, 68px)",
            objectFit: "contain",
            filter: sel ? "brightness(1.02)" : "brightness(0.9)",
            transition: "filter 0.2s",
          },
        })
      );
      btn.appendChild(
        h(
          "span",
          "font-heading",
          {
            style: {
              fontSize: "9px",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.2,
              marginTop: "0.25rem",
              padding: "0 0.25rem",
              maxWidth: "70px",
              color: sel ? "rgba(255,228,150,0.95)" : "rgba(255,255,255,0.6)",
            },
          },
          [snack.name]
        )
      );
      tray.appendChild(btn);
    });
    row.appendChild(tray);
    return row;
  }

  function renderFloor() {
    startShopAmbience();
    onCleanup(() => stopShopAmbience());
    const remaining = +(st.budget - st.floorSpent).toFixed(2);
    const onPick = (snack) => {
      playProductPick();
      const already = st.floorPick.find((p) => p.id === snack.id);
      if (already) {
        st.floorPick = st.floorPick.filter((p) => p.id !== snack.id);
        st.floorSpent = +(st.floorSpent - snack.price).toFixed(2);
        render();
        return;
      }
      if (+(st.floorSpent + snack.price).toFixed(2) > st.budget) {
        st.floorOver = true;
        render();
        setTimeout(() => {
          st.floorOver = false;
          render();
        }, 1500);
        return;
      }
      st.floorPick = [...st.floorPick, snack];
      st.floorSpent = +(st.floorSpent + snack.price).toFixed(2);
      render();
    };
    const wrap = h("div", "", {
      style: { position: "fixed", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)" },
    });
    const head = h("div", "", {
      style: {
        position: "relative",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 1rem",
        flexShrink: 0,
        background: "rgba(13,8,34,0.9)",
        borderBottom: "1px solid rgba(255,215,0,0.1)",
        backdropFilter: "blur(8px)",
      },
    });
    const headL = h("div", "", {});
    headL.appendChild(
      h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.34em", color: BAQLALAND_BLUE, margin: 0 } }, ["Baqalaland"])
    );
    headL.appendChild(
      h("p", "font-heading", { style: { fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: EYEBROW_GOLD, margin: "0.15rem 0 0" } }, ["Pick Your Snacks"])
    );
    head.appendChild(headL);
    const remEl = h("div", "", { style: { textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" } });
    remEl.appendChild(h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.15em", color: EYEBROW_GOLD, textTransform: "uppercase", margin: 0 } }, ["Remaining"]));
    remEl.appendChild(
      h(
        "p",
        `font-heading ${st.floorOver ? "shake" : ""}`,
        { style: { fontWeight: 700, fontSize: "1.25rem", color: remaining < 1 ? "#FF2E63" : "#FFD700", margin: 0 } },
        [`${remaining} AED`]
      )
    );
    const topActions = h("div", "", { style: { display: "flex", gap: "0.4rem" } });
    topActions.appendChild(
      h(
        "button",
        "font-heading",
        {
          style: {
            padding: "0.45rem 0.8rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
          },
          onclick: () => setPhase(PHASES.FRIDGE),
        },
        ["Go to Fridge"]
      )
    );
    remEl.appendChild(topActions);
    head.appendChild(remEl);
    wrap.appendChild(head);
    if (st.floorOver) {
      wrap.appendChild(
        h(
          "div",
          "font-heading",
          { style: { position: "relative", zIndex: 30, background: "#FF2E63", color: "#fff", textAlign: "center", padding: "0.35rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" } },
          ["Out of budget"]
        )
      );
    }
    const scroll = h("div", "baqala-scroll", { style: { flex: 1, overflowY: "hidden", minHeight: 0, padding: "0.5rem", paddingTop: "0.75rem", position: "relative" } });
    scroll.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(10,5,25,0.3) 0%, rgba(20,10,40,0.5) 100%)",
        },
      })
    );
    const signWrap = h("div", "", { style: { position: "relative", zIndex: 10, textAlign: "center", marginBottom: "0.5rem" } });
    signWrap.appendChild(
      h("span", "font-heading neon-flicker-blue", { style: { fontSize: "9px", letterSpacing: "0.4em", color: EYEBROW_GOLD, textTransform: "uppercase" } }, ["- snacks & drinks -"])
    );
    scroll.appendChild(signWrap);
    FLOOR_SHOWCASE_ROWS.forEach((rowItems) => {
      if (rowItems.length) scroll.appendChild(shelfRow(rowItems, onPick));
    });
    wrap.appendChild(scroll);
    const counter = h("div", "", {
      style: {
        position: "relative",
        flexShrink: 0,
        zIndex: 20,
        background: "linear-gradient(180deg, #1c0f04 0%, #120a02 100%)",
        borderTop: "3px solid rgba(180,100,30,0.5)",
        boxShadow: "0 -6px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,180,80,0.1)",
        minHeight: "110px",
      },
    });
    counter.appendChild(h("div", "", { style: { position: "absolute", insetInline: 0, top: 0, height: "1px", background: "rgba(255,200,100,0.15)" } }));
    const row = h("div", "", { style: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem" } });
    const reg = h("div", "", { style: { flexShrink: 0, marginRight: "0.75rem", width: "90px" } });
    reg.appendChild(
      h("div", "", { style: { fontFamily: "monospace", fontSize: "10px", color: EYEBROW_GOLD, textAlign: "center", marginBottom: "0.25rem" } }, [`AED ${st.floorSpent.toFixed(2)}`])
    );
    row.appendChild(reg);
    const pile = h("div", "", { style: { flex: 1, display: "flex", alignItems: "flex-end", minHeight: "72px", position: "relative", gap: "6px", flexWrap: "wrap", alignContent: "flex-end" } });
    if (st.floorPick.length === 0) {
      pile.appendChild(h("p", "font-body", { style: { color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontStyle: "italic" } }, ["Nothing on the counter yet..."]));
    } else {
      st.floorPick.forEach((p, i) => {
        const img = h("img", "", {
          src: p.img,
          alt: p.name,
          title: p.name,
          style: {
            width: "52px",
            height: "52px",
            objectFit: "contain",
            filter: "brightness(1.05) drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
            marginLeft: 0,
            zIndex: String(i),
            cursor: "pointer",
            transform: "none",
          },
          onclick: () => onPick(p),
        });
        pile.appendChild(img);
      });
    }
    row.appendChild(pile);
    const right = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 } });
    if (st.floorPick.length > 0) {
      const tot = h("div", "", { style: { textAlign: "right" } });
      tot.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: EYEBROW_GOLD, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 } }, ["Total"]));
      tot.appendChild(h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1rem", color: "#FFD700", margin: 0 } }, [`${st.floorSpent.toFixed(2)} AED`]));
      right.appendChild(tot);
    }
    right.appendChild(
      h(
        "button",
        "font-heading",
        {
          style: {
            padding: "0.6rem 1.25rem",
            background: "#2D1B69",
            color: "#fff",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.75rem",
            borderRadius: "9999px",
            border: "none",
            opacity: st.floorPick.length === 0 ? 0.4 : 1,
            cursor: st.floorPick.length === 0 ? "not-allowed" : "pointer",
            boxShadow: st.floorPick.length > 0 ? "0 4px 20px rgba(45,27,105,0.4)" : "none",
          },
          disabled: st.floorPick.length === 0,
          onclick: () => {
            st.picks = st.floorPick.slice();
            setPhase(PHASES.RECEIPT);
          },
        },
        ["Take These"]
      )
    );
    row.appendChild(right);
    counter.appendChild(row);
    const foot = h("div", "", { style: { position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" } });
    foot.appendChild(
      h("span", "font-body", { style: { fontSize: "8px", color: "rgba(255,255,255,0.2)", fontStyle: "italic", letterSpacing: "0.08em" } }, ["tap items on counter to remove"])
    );
    counter.appendChild(foot);
    wrap.appendChild(counter);
    return wrap;
  }

  function renderFridgeShop() {
    startFridgeHum();
    onCleanup(() => stopFridgeHum());
    const remaining = +(st.budget - st.floorSpent).toFixed(2);
    const onPick = (drink) => {
      playProductPick();
      const already = st.floorPick.find((p) => p.id === drink.id);
      if (already) {
        st.floorPick = st.floorPick.filter((p) => p.id !== drink.id);
        st.floorSpent = +(st.floorSpent - drink.price).toFixed(2);
        render();
        return;
      }
      if (+(st.floorSpent + drink.price).toFixed(2) > st.budget) {
        st.floorOver = true;
        render();
        setTimeout(() => {
          st.floorOver = false;
          render();
        }, 1500);
        return;
      }
      st.floorPick = [...st.floorPick, drink];
      st.floorSpent = +(st.floorSpent + drink.price).toFixed(2);
      render();
    };
    const wrap = h("div", "", {
      style: { position: "fixed", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)" },
    });
    const head = h("div", "", {
      style: {
        position: "relative",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 1rem",
        background: "rgba(13,8,34,0.9)",
        borderBottom: "1px solid rgba(0,209,255,0.2)",
      },
    });
    const headL = h("div", "", {});
    headL.appendChild(
      h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.34em", color: BAQLALAND_BLUE, margin: 0 } }, ["Baqalaland"])
    );
    headL.appendChild(
      h("p", "font-heading", { style: { fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: EYEBROW_GOLD, margin: "0.15rem 0 0" } }, ["Pick Your Snacks"])
    );
    head.appendChild(headL);
    const actions = h("div", "", { style: { display: "flex", gap: "0.4rem", alignItems: "center" } });
    actions.appendChild(h("p", "font-heading", { style: { margin: 0, fontSize: "0.8rem", color: remaining < 1 ? "#FF2E63" : "#FFD700" } }, [`${remaining} AED`]));
    actions.appendChild(
      h("button", "font-heading", {
        style: { padding: "0.45rem 0.8rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "0.65rem", textTransform: "uppercase", cursor: "pointer" },
        onclick: () => setPhase(PHASES.FLOOR),
      }, ["Go to Shelves"])
    );
    head.appendChild(actions);
    wrap.appendChild(head);
    if (st.floorOver) {
      wrap.appendChild(
        h(
          "div",
          "font-heading",
          { style: { position: "relative", zIndex: 30, background: "#FF2E63", color: "#fff", textAlign: "center", padding: "0.35rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" } },
          ["Out of budget"]
        )
      );
    }

    const body = h("div", "", { style: { position: "relative", flex: 1, padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" } });
    const door = h("div", "", { style: { position: "relative", width: "min(92vw, 560px)", height: "min(48vw, 280px)" } });
    const inner = h("div", "", { style: { position: "absolute", inset: 0, borderRadius: "1rem", overflow: "hidden", background: "linear-gradient(180deg, #0a1a2a 0%, #061018 100%)", border: "2px solid rgba(0,209,255,0.25)" } });
    FRIDGE_DRINKS.forEach((d) => {
      const selected = st.floorPick.some((p) => p.id === d.id);
      const item = { id: d.id, name: d.label, img: d.img, price: FRIDGE_PRICE_BY_ID[d.id] ?? 1 };
      const btn = h("button", "", {
        type: "button",
        style: {
          position: "absolute",
          left: d.x,
          top: d.y,
          transform: "translate(-50%, -50%)",
          border: "none",
          background: selected ? "radial-gradient(circle, rgba(255,215,0,0.2), transparent 65%)" : "transparent",
          padding: "0.25rem",
          cursor: st.fridgeOpen ? "pointer" : "default",
          opacity: st.fridgeOpen ? 1 : 0.85,
        },
        onclick: () => st.fridgeOpen && onPick(item),
      });
      btn.appendChild(h("img", "", { src: d.img, alt: d.label, style: { width: "38px", height: "38px", objectFit: "contain", filter: "brightness(0.95) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" } }));
      inner.appendChild(btn);
    });
    door.appendChild(inner);

    const canvas = document.createElement("canvas");
    canvas.width = 560;
    canvas.height = 280;
    Object.assign(canvas.style, { position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "1rem", zIndex: "10", display: st.fridgeOpen ? "none" : "block", cursor: "crosshair" });
    const ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = "rgba(200,230,255,0.82)";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);
    const handleMove = (e) => {
      if (st.fridgeOpen) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX ?? e.touches?.[0]?.clientX) - rect.left) * (canvas.width / rect.width);
      const y = ((e.clientY ?? e.touches?.[0]?.clientY) - rect.top) * (canvas.height / rect.height);
      ctx2.globalCompositeOperation = "destination-out";
      ctx2.beginPath();
      ctx2.arc(x, y, 28, 0, Math.PI * 2);
      ctx2.fill();
      const data = ctx2.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
      st.fridgeClr = Math.round((transparent / (canvas.width * canvas.height)) * 100);
    };
    canvas.addEventListener("pointermove", handleMove);
    onCleanup(() => canvas.removeEventListener("pointermove", handleMove));
    door.appendChild(canvas);

    const handle = h("div", "", {
      style: { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: "8px", height: "74px", borderRadius: "4px", background: "linear-gradient(180deg, #bbb 0%, #666 100%)", cursor: "pointer", opacity: st.fridgeOpen || st.fridgeClr >= 25 ? 1 : 0.75 },
      onclick: () => {
        if (st.fridgeOpen || st.fridgeClr >= 25) {
          st.fridgeOpen = !st.fridgeOpen;
          render();
        }
      },
    });
    door.appendChild(handle);
    body.appendChild(door);
    wrap.appendChild(body);
    const counter = h("div", "", {
      style: {
        position: "relative",
        zIndex: 20,
        background: "linear-gradient(180deg, #1c0f04 0%, #120a02 100%)",
        borderTop: "3px solid rgba(180,100,30,0.5)",
        minHeight: "98px",
      },
    });
    const row = h("div", "", { style: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1rem" } });
    row.appendChild(h("div", "font-heading", { style: { fontSize: "10px", color: EYEBROW_GOLD, minWidth: "90px" } }, [`AED ${st.floorSpent.toFixed(2)}`]));
    const pile = h("div", "", { style: { flex: 1, display: "flex", alignItems: "center", gap: "4px", minHeight: "58px", overflowX: "auto" } });
    if (st.floorPick.length === 0) pile.appendChild(h("p", "font-body", { style: { color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontStyle: "italic", margin: 0 } }, ["No items yet"]));
    st.floorPick.forEach((p) => {
      pile.appendChild(
        h("img", "", {
          src: p.img,
          alt: p.name,
          title: p.name,
          style: { width: "46px", height: "46px", objectFit: "contain", filter: "brightness(1.05) drop-shadow(0 3px 6px rgba(0,0,0,0.6))", cursor: "pointer" },
          onclick: () => onPick(p),
        })
      );
    });
    row.appendChild(pile);
    const right = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 } });
    right.appendChild(
      h(
        "button",
        "font-heading",
        {
          style: {
            padding: "0.6rem 1.25rem",
            background: "#2D1B69",
            color: "#fff",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.75rem",
            borderRadius: "9999px",
            border: "none",
            opacity: st.floorPick.length === 0 ? 0.4 : 1,
            cursor: st.floorPick.length === 0 ? "not-allowed" : "pointer",
          },
          disabled: st.floorPick.length === 0,
          onclick: () => {
            st.picks = st.floorPick.slice();
            setPhase(PHASES.RECEIPT);
          },
        },
        ["Take These"]
      )
    );
    row.appendChild(right);
    counter.appendChild(row);
    wrap.appendChild(counter);
    return wrap;
  }

  function receiptSnackLine(snack) {
    const line = h("div", "", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } });
    const left = h("div", "", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } });
    left.appendChild(h("img", "", { src: snack.img, alt: snack.name, style: { width: "2rem", height: "2rem", objectFit: "contain" } }));
    left.appendChild(h("span", "font-body", { style: { fontSize: "0.875rem", color: "hsl(var(--foreground))" } }, [snack.name]));
    line.appendChild(left);
    line.appendChild(h("span", "font-heading", { style: { fontSize: "0.875rem", color: "#FF2E63", fontWeight: 700 } }, [`${snack.price.toFixed(2)} AED`]));
    return line;
  }

  function renderReceipt() {
    if (st.picks.length === 0) {
      st.rcRevealComplete = true;
      st.rcTot = true;
      st.rcRevealScheduled = true;
    } else if (!st.rcRevealScheduled && !st.rcRevealComplete && !st.rcInt) {
      st.rcRevealScheduled = true;
      st.rcInt = setInterval(() => {
        if (st.phase !== PHASES.RECEIPT) {
          clearInterval(st.rcInt);
          st.rcInt = null;
          return;
        }
        st.rcRev += 1;
        const idx = st.rcRev - 1;
        const listEl = root.querySelector("[data-receipt-list]");
        if (listEl && idx >= 0 && idx < st.picks.length) {
          listEl.appendChild(receiptSnackLine(st.picks[idx]));
        }
        if (st.rcRev >= st.picks.length) {
          clearInterval(st.rcInt);
          st.rcInt = null;
          st.rcRevealComplete = true;
          setTimeout(() => {
            st.rcTot = true;
            if (typeof confetti === "function") {
              confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ["#FF2E63", "#FFD700", "#00D1FF", "#7B2FF2"] });
            }
            playFound();
            render();
          }, 600);
        }
      }, 300);
    }
    const wrap = h("div", "baqala-scroll", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "auto",
        background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)",
      },
    });
    wrap.appendChild(h("div", "", { style: { position: "absolute", top: "25%", left: "25%", width: "20rem", height: "20rem", background: "rgba(255,46,99,0.1)", borderRadius: "9999px", filter: "blur(100px)", pointerEvents: "none" } }));
    wrap.appendChild(h("div", "", { style: { position: "absolute", bottom: "25%", right: "25%", width: "20rem", height: "20rem", background: "rgba(0,209,255,0.1)", borderRadius: "9999px", filter: "blur(100px)", pointerEvents: "none" } }));
    const card = h("div", "", { style: { position: "relative", zIndex: 10, width: "100%", maxWidth: "28rem" } });
    const paper = h("div", "receipt-paper rounded-2xl", { style: { borderRadius: "1rem", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" } });
    const header = h("div", "", { style: { background: "#2D1B69", color: "#fff", padding: "1.5rem", textAlign: "center" } });
    header.appendChild(
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: EYEBROW_GOLD, textTransform: "uppercase", margin: 0 } }, ["-------------------"])
    );
    header.appendChild(
      h("h1", "font-baqalaland-title font-heading", {
        style: {
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 6vw, 1.875rem)",
          letterSpacing: "0.12em",
          color: "#FF2E63",
          margin: "0.5rem 0",
          textShadow: "0 0 12px rgba(255,46,99,0.55), 0 0 28px rgba(255,46,99,0.35)",
        },
      }, ["Baqalaland"])
    );
    header.appendChild(h("p", "font-heading", { style: { fontSize: "0.75rem", letterSpacing: "0.3em", color: EYEBROW_GOLD, textTransform: "uppercase", margin: 0 } }, ["A Memory Receipt"]));
    paper.appendChild(header);
    const body = h("div", "", { style: { padding: "1.5rem" } });
    const divLabel = h("div", "", { style: { borderTop: "1px dashed rgba(45,27,105,0.2)", marginBottom: "1.25rem", textAlign: "center" } });
    divLabel.appendChild(
      h(
        "span",
        "font-heading",
        { style: { fontSize: "10px", letterSpacing: "0.15em", color: EYEBROW_GOLD, position: "relative", top: "-9px", background: "#fafafa", padding: "0 0.75rem" } },
        ["YOU CHOSE"]
      )
    );
    body.appendChild(divLabel);
    const list = h("div", "", {
      "data-receipt-list": "",
      style: { display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" },
    });
    if (st.rcTot) {
      st.picks.forEach((snack) => list.appendChild(receiptSnackLine(snack)));
    } else if (st.rcRevealComplete) {
      st.picks.forEach((snack, i) => {
        if (i < st.rcRev) list.appendChild(receiptSnackLine(snack));
      });
    }
    body.appendChild(list);
    if (st.rcTot) {
      const tot = h("div", "", { style: { borderTop: "2px dashed rgba(45,27,105,0.2)", paddingTop: "1rem", marginBottom: "1rem" } });
      tot.appendChild(
        h("div", "", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } }, [
          h("span", "font-heading", { style: { fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.08em" } }, ["Budget"]),
          h("span", "font-heading", { style: { fontSize: "1rem", color: "hsl(var(--foreground))" } }, [`${st.budget} AED`]),
        ])
      );
      tot.appendChild(
        h("div", "", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "0.25rem" } }, [
          h("span", "font-heading", { style: { fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.08em" } }, ["Spent"]),
          h("span", "font-heading", { style: { fontSize: "1rem", color: "#FF2E63" } }, [`- ${st.narrative.total} AED`]),
        ])
      );
      tot.appendChild(
        h("div", "", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(45,27,105,0.1)" } }, [
          h("span", "font-heading", { style: { fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "hsl(var(--foreground))" } }, ["Remaining"]),
          h(
            "span",
            "font-heading",
            { style: { fontWeight: 700, fontSize: "1.25rem", color: parseFloat(st.narrative.leftover) > 0 ? "#2D1B69" : "#FF2E63" } },
            [`${st.narrative.leftover} AED`]
          ),
        ])
      );
      body.appendChild(tot);
      body.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              width: "100%",
              marginTop: "1rem",
              padding: "1rem",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #FF2E63, #7B2FF2)",
              boxShadow: "0 4px 30px rgba(255,46,99,0.4)",
            },
            onclick: () => setPhase(PHASES.ENDING),
          },
          ["Continue"]
        )
      );
    }
    paper.appendChild(body);
    card.appendChild(paper);
    wrap.appendChild(card);
    return wrap;
  }

  function renderEnding() {
    injectBagDropKeyframes();
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        boxSizing: "border-box",
        padding: "2rem 1rem 3rem",
        minHeight: 0,
        width: "100%",
        background: "linear-gradient(180deg, #0d0822 0%, #1a0f40 60%, #2D1B69 100%)",
      },
    });
    wrap.appendChild(h("div", "tiled-floor", { style: { position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" } }));
    wrap.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          top: "33%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "9999px",
          background: "radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      })
    );
    if (st.endSub === "bag") {
      const advanceFromBag = () => {
        if (st.picks.length === 0) {
          st.endChosen = null;
          st.endSub = "end";
          render();
          return;
        }
        if (st.picks.length === 1) {
          st.endChosen = null;
          st.endSub = "end";
          render();
          return;
        } else {
          st.endSub = "choose";
          render();
        }
      };
      const box = h("div", "", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "min(36rem, 100%)",
          padding: "0 1.25rem",
          flexShrink: 0,
        },
      });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: EYEBROW_GOLD, textTransform: "uppercase", marginBottom: "1.5rem" } }, ["leaving the baqala"])
      );
      const bagStage = h("div", "", {
        style: {
          position: "relative",
          width: "min(22rem, 92vw)",
          marginBottom: "1.5rem",
        },
      });
      const snacksLayer = h("div", "", {
        style: {
          position: "absolute",
          left: "14%",
          right: "14%",
          top: "28%",
          bottom: "10%",
          zIndex: 1,
          pointerEvents: "none",
          overflow: "visible",
          borderRadius: "18% 18% 26% 26%",
          display: "grid",
          alignContent: "end",
          justifyItems: "center",
          padding: "0.3rem 0.2rem 0.35rem",
        },
      });
      const picksShown = st.picks.slice(0, 12);
      const bagWeightDur = `${Math.min(2.1, Math.max(1.15, 0.95 + picksShown.length * 0.12))}s`;
      const cols = picksShown.length <= 2 ? 1 : picksShown.length <= 6 ? 2 : picksShown.length <= 9 ? 3 : 4;
      snacksLayer.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      snacksLayer.style.columnGap = picksShown.length > 9 ? "0.16rem" : "0.22rem";
      snacksLayer.style.rowGap = picksShown.length > 9 ? "0.08rem" : "0.14rem";
      const snackSize =
        picksShown.length <= 1
          ? "clamp(5.4rem, 30vw, 7.2rem)"
          : picksShown.length <= 4
          ? "clamp(4.1rem, 18vw, 5rem)"
          : picksShown.length <= 8
          ? "clamp(3.1rem, 13vw, 3.9rem)"
          : "clamp(2.3rem, 10vw, 3.1rem)";
      picksShown.forEach((snack, i) => {
        snacksLayer.appendChild(
          h("img", "", {
            src: snack.img,
            alt: snack.name,
            style: {
              width: snackSize,
              height: snackSize,
              objectFit: "contain",
              filter: "brightness(0.96) drop-shadow(0 3px 8px rgba(0,0,0,0.42))",
              animation: `bagDropIn 0.8s cubic-bezier(0.18,0.86,0.24,1) ${i * 0.14}s both`,
            },
          })
        );
      });
      bagStage.appendChild(snacksLayer);
      bagStage.appendChild(
        h("img", "", {
          src: ENDING_BAG_IMG,
          alt: "Plastic bag",
          draggable: false,
          style: {
            display: "block",
            width: "100%",
            height: "auto",
            position: "relative",
            zIndex: 2,
            pointerEvents: "none",
            opacity: 1,
            transformOrigin: "50% 100%",
            animation: `bagWeightSettle ${bagWeightDur} ease-in-out both`,
          },
        })
      );
      box.appendChild(bagStage);
      box.appendChild(
        h("p", "font-heading", {
          style: {
            fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.35,
            marginBottom: "0.75rem",
            maxWidth: "28rem",
          },
        }, ["You made it home."])
      );
      const noteCol = h("div", "", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0.2rem",
          marginBottom: "2rem",
          maxWidth: "28rem",
        },
      });
      noteCol.appendChild(
        h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic", lineHeight: 1.55, margin: 0 } }, [
          "The bag crinkles.",
        ])
      );
      noteCol.appendChild(
        h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic", lineHeight: 1.55, margin: 0 } }, [
          "You sit on the floor with your snacks spread out.",
        ])
      );
      box.appendChild(noteCol);
      box.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #FF2E63, #7B2FF2)",
              boxShadow: "0 4px 28px rgba(255,46,99,0.35)",
            },
            onclick: () => advanceFromBag(),
          },
          ["Open the bag"]
        )
      );
      wrap.appendChild(box);
    } else if (st.endSub === "choose") {
      const box = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", maxWidth: "36rem", padding: "0 1rem" } });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: EYEBROW_GOLD, textTransform: "uppercase", marginBottom: "1rem" } }, ["the real question"])
      );
      box.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "clamp(1.5rem, 5vw, 1.875rem)", color: "#fff", marginBottom: "0.5rem" } }, ["What do you have first?"])
      );
      box.appendChild(
        h("p", "font-body", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginBottom: "2rem" } }, ["Tap one. Be honest with yourself."])
      );
      const grid = h("div", "", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", width: "100%", padding: "0 0.5rem" } });
      st.picks.forEach((snack) => {
        const btn = h("button", "font-heading", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            borderRadius: "1rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#fff",
          },
          onclick: () => {
            st.endChosen = snack;
            st.endSub = "reveal";
            render();
            setTimeout(() => {
              st.endSub = "end";
              render();
            }, 2800);
          },
        });
        const snackGlow = h("div", "", {
          style: {
            width: "5.25rem",
            height: "5.25rem",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle, rgba(255,215,0,0.22) 0%, rgba(255,215,0,0.08) 45%, rgba(255,215,0,0) 75%)",
          },
        });
        snackGlow.appendChild(h("img", "", { src: snack.img, alt: snack.name, style: { width: "4rem", height: "4rem", objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(255,215,0,0.22))" } }));
        btn.appendChild(snackGlow);
        btn.appendChild(
          h("span", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.05em" } }, [
            snack.name,
          ])
        );
        grid.appendChild(btn);
      });
      box.appendChild(grid);
      wrap.appendChild(box);
    } else if (st.endSub === "reveal" && st.endChosen) {
      const box = h("div", "", {
        style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", maxWidth: "36rem", padding: "0 1.5rem", boxSizing: "border-box" },
      });
      box.appendChild(
        h("img", "", {
          src: st.endChosen.img,
          alt: st.endChosen.name,
          style: { width: "7rem", height: "7rem", objectFit: "contain", filter: "drop-shadow(0 0 24px rgba(255,215,0,0.5))", marginBottom: "1.5rem", animation: "revealFloat 2s ease-in-out infinite" },
        })
      );
      box.appendChild(
        h(
          "h2",
          "font-heading",
          { style: { fontWeight: 700, fontSize: "1.5rem", color: "#FFD700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", textShadow: "0 0 30px rgba(255,215,0,0.5)" } },
          [st.endChosen.name]
        )
      );
      box.appendChild(
        h("p", "font-body", { style: { fontSize: "1rem", color: "rgba(255,255,255,0.6)" } }, [st.endingMemoryLine])
      );
      wrap.appendChild(box);
    } else if (st.endSub === "end") {
      const box = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "36rem", padding: "0 2rem" } });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: EYEBROW_GOLD, textTransform: "uppercase", marginBottom: "2.5rem" } }, ["a note before you go"])
      );
      const lines = h("div", "", { style: { display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" } });
      const closingLeadStyle = { fontWeight: 700, fontSize: "clamp(1.25rem, 4vw, 1.5rem)", color: "#fff", lineHeight: 1.4, margin: 0 };
      const closingBodyStyle = { fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 };
      CLOSING_LINES.forEach((line, i) => {
        if (i === 0) lines.appendChild(h("p", "font-heading", { style: closingLeadStyle }, [line]));
        else lines.appendChild(h("p", "font-body", { style: closingBodyStyle }, [line]));
      });
      box.appendChild(lines);
      box.appendChild(
        h(
          "button",
          "font-heading",
          {
            style: {
              padding: "1rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #FF2E63, #7B2FF2)",
              boxShadow: "0 4px 30px rgba(255,46,99,0.35)",
            },
            onclick: () => restart(),
          },
          ["Back to Baqalaland"]
        )
      );
      wrap.appendChild(box);
    }
    return wrap;
  }

  function render() {
    runCleanups();
    stopFridgeHum();
    stopShopAmbience();
    if (st.brRaf && !(st.phase === PHASES.BUDGET && !st.brDone)) {
      cancelAnimationFrame(st.brRaf);
      st.brRaf = null;
    }
    if (st.curtainRaf) cancelAnimationFrame(st.curtainRaf);
    st.curtainRaf = null;
    if (st.rcInt && st.phase !== PHASES.RECEIPT) {
      clearInterval(st.rcInt);
      st.rcInt = null;
    }
    switch (st.phase) {
      case PHASES.ENTRANCE:
        mount(renderEntrance());
        break;
      case PHASES.COLOR_SHIFT:
        mount(renderColorShift());
        break;
      case PHASES.REMEMBER:
        mount(renderRemember());
        break;
      case PHASES.MEMORIES:
        mount(renderMemories());
        break;
      case PHASES.QUIZ:
        mount(renderQuiz());
        break;
      case PHASES.BUDGET:
        mount(renderBudget());
        break;
      case PHASES.CURTAIN:
        mount(renderCurtain());
        break;
      case PHASES.FLOOR:
        mount(renderFloor());
        break;
      case PHASES.FRIDGE:
        mount(renderFridgeShop());
        break;
      case PHASES.RECEIPT:
        mount(renderReceipt());
        break;
      case PHASES.ENDING:
        mount(renderEnding());
        break;
      default:
        mount(h("div", "", { style: { padding: "2rem" } }, ["Unknown phase"]));
    }
  }

  render();
})();
