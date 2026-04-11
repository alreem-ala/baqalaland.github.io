  const MG_ITEMS = [
    { id: "chipsticks", img: BASE + "2dc4fdc49_1.png", label: "Chipsticks" },
    { id: "vimto", img: BASE + "4cce014cf_13.png", label: "Areej Juice" },
    { id: "caprisun", img: BASE + "34a5a4045_15.png", label: "Capri-Sun" },
    { id: "polo", img: BASE + "7e236964f_20.png", label: "Polo Mints" },
    { id: "kinder", img: BASE + "f4b01209f_19.png", label: "Fun Fare" },
    { id: "icecream", img: BASE + "0968e99e0_4.png", label: "Safari Grills" },
    { id: "laban", img: BASE + "c51d107cf_17.png", label: "Fruit Shoot" },
    { id: "pepsi", img: BASE + "1ae6dc06d_14.png", label: "Rni Juice" },
    { id: "gum", img: BASE + "626e806c3_8.png", label: "Qrakers" },
    { id: "lollipop", img: BASE + "1cc097fc5_5.png", label: "Mazoon" },
    { id: "suntop", img: BASE + "fdd82f4e1_16.png", label: "Sun Top" },
    { id: "chips", img: BASE + "52a18141c_2.png", label: "Salad Chips" },
  ];
  const MG_SHOW = 5;
  const MG_SHOW_MS = 7000;
  const SP_TARGETS = [
    { id: "vimto", img: BASE + "4cce014cf_13.png", label: "Areej Juice", isTarget: true },
    { id: "pepsi", img: BASE + "1ae6dc06d_14.png", label: "Rni Juice", isTarget: false },
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
    { img: BASE + "4cce014cf_13.png", label: "Areej", x: "8%", y: "8%" },
    { img: BASE + "c51d107cf_17.png", label: "Fruit Shoot", x: "22%", y: "8%" },
    { img: BASE + "1ae6dc06d_14.png", label: "Rni Juice", x: "36%", y: "8%" },
    { img: BASE + "fdd82f4e1_16.png", label: "Sun Top", x: "50%", y: "8%" },
    { img: BASE + "2eb84a7f8_10.png", label: "Raja", x: "64%", y: "8%" },
    { img: BASE + "34a5a4045_15.png", label: "Capri-Sun", x: "78%", y: "8%" },
    { img: BASE + "4cce014cf_13.png", label: "Areej", x: "8%", y: "55%" },
    { img: BASE + "fdd82f4e1_16.png", label: "Sun Top", x: "22%", y: "55%" },
    { img: BASE + "1ae6dc06d_14.png", label: "Rni Juice", x: "36%", y: "55%" },
    { img: BASE + "2eb84a7f8_10.png", label: "Raja", x: "50%", y: "55%" },
    { img: BASE + "c51d107cf_17.png", label: "Fruit Shoot", x: "64%", y: "55%" },
    { img: BASE + "34a5a4045_15.png", label: "Capri-Sun", x: "78%", y: "55%" },
  ];
  const CANDY_SHELF_IMGS = [
    BASE + "fdd82f4e1_16.png",
    BASE + "52a18141c_2.png",
    BASE + "f4b01209f_19.png",
    BASE + "4cce014cf_13.png",
    BASE + "2dc4fdc49_1.png",
    BASE + "7e236964f_20.png",
  ];
  const CANDY_TARGET = BASE + "34a5a4045_15.png";
  const CANDY_QUOTE = "It was on the top shelf.\nYou weren't tall enough.\nYou jumped anyway.";
  const FRIDGE_QUOTE = "You pressed your forehead against the glass.\nThe fog cleared just enough to see what was inside.";
  const REMEMBER_THINGS = [
    { text: "the juice box you always picked", x: "10%", y: "18%", size: "lg", delay: 0.5 },
    { text: "candy on the top shelf", x: "62%", y: "10%", size: "sm", delay: 0.7 },
    { text: "counting coins at the counter", x: "76%", y: "32%", size: "md", delay: 0.9 },
    { text: "pressing your face against the fridge glass", x: "5%", y: "52%", size: "md", delay: 1.1 },
    { text: "the bag that was always too full", x: "68%", y: "58%", size: "sm", delay: 1.3 },
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
    const p = st.entranceP;
    const phase1 = Math.min(1, p * 2);
    const phase2 = Math.max(0, (p - 0.5) * 2);
    const titleOpacity = Math.max(0, 1 - phase1 * 3);
    const introOpacity = phase2;
    const awningTop = Math.max(-18, 100 - p * 118);
    const cloudShift = p * 200;
    const skyTop = p > 0.3 ? `hsl(${38 - (1 - p) * 0}, ${60 + p * 20}%, ${90 + p * 5}%)` : "#5db8e8";
    const skyMid = p > 0.3 ? "#F5EDD8" : "#87CEEB";
    const skyBot = p > 0.3 ? "#FFF9F0" : "#b8e0f5";
    const wrap = h("div", "", { style: { position: "fixed", inset: 0, overflow: "hidden" } });
    wrap.appendChild(
      h("div", "", {
        style: {
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 40%, ${skyBot} 100%)`,
          transition: "background 0.3s",
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
          transform: `translateX(${cloudShift * c.parallax}px)`,
          transition: "transform 0.05s linear",
        },
      });
      d.appendChild(h("img", "", { src: CLOUD_IMG, alt: "", style: { width: "100%", display: "block" } }));
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
        opacity: titleOpacity,
      },
    });
    titleWrap.appendChild(
      h(
        "h1",
        "font-heading",
        {
          style: {
            fontSize: "clamp(2.8rem, 11vw, 6.5rem)",
            fontWeight: 700,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#e0fbff",
            lineHeight: 1,
            textShadow: "0 0 6px rgba(34,211,238,0.85), 0 0 18px rgba(8,47,73,0.75), 0 4px 22px rgba(15,23,42,0.85)",
            margin: 0,
          },
        },
        ["BAQALALAND"]
      )
    );
    const scrollHint = h("div", "", { style: { marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" } });
    scrollHint.appendChild(
      h(
        "span",
        "font-body",
        { style: { color: "#1a4e6e", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.8 } },
        ["scroll to begin"]
      )
    );
    scrollHint.appendChild(
      h("div", "", {
        style: {
          width: "1.25rem",
          height: "1.25rem",
          borderBottom: "2px solid #1a4e6e",
          borderRight: "2px solid #1a4e6e",
          transform: "rotate(45deg)",
          opacity: 0.7,
          animation: "floatBounce 1.4s ease-in-out infinite",
        },
      })
    );
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
        { style: { fontSize: "10px", letterSpacing: "0.5em", color: "rgba(26,78,110,0.7)", textTransform: "uppercase", marginBottom: "2.5rem" } },
        ["Baqalaland"]
      )
    );
    const linesBox = h("div", "", { style: { maxWidth: "42rem", width: "100%", textAlign: "center", marginBottom: "3rem" } });
    INTRO_LINES.forEach((line, i) => {
      const vis = phase2 > 0.2 + i * 0.15 ? 1 : 0;
      const ty = Math.max(0, 1 - (phase2 - 0.2 - i * 0.15) * 5) * 16;
      linesBox.appendChild(
        h(
          "p",
          "font-heading",
          {
            style: {
              fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
              color: "rgba(13,45,66,0.9)",
              lineHeight: 1.375,
              opacity: vis,
              transform: `translateY(${ty}px)`,
              transition: "opacity 0.4s, transform 0.4s",
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
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.875rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              minHeight: "52px",
              background: "linear-gradient(135deg, #e05e30, #c0392b)",
              boxShadow: "0 4px 30px rgba(192,57,43,0.45)",
            },
            onclick: () => {
              playWhoosh();
              setPhase(PHASES.REMEMBER);
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
    REMEMBER_THINGS.forEach((thing) => {
      const sz = BUBBLE_SIZES[thing.size];
      const row = h("div", "", { style: { position: "absolute", left: thing.x, top: thing.y, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" } });
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
      const dots = h("div", "", { style: { display: "flex", gap: "0.25rem", paddingLeft: "1rem" } });
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
        { style: { fontSize: "10px", letterSpacing: "0.5em", color: "rgba(0,209,255,0.6)", textTransform: "uppercase", marginBottom: "1rem" } },
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
          onclick: () => setPhase(PHASES.MEMORIES),
        },
        ["I Remember ->"]
      )
    );
    wrap.appendChild(center);
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
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,46,99,0.6)", textTransform: "uppercase", marginBottom: "0.5rem" } }, [
        "Memory 02",
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
    if (st.candyH > 0.6) charWrap.appendChild(h("div", "", { style: { fontSize: "1.5rem", lineHeight: 1, transform: `scaleY(${0.5 + st.candyH * 0.8})`, transformOrigin: "bottom" } }, ["\u{1F590}\u{FE0F}"]));
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
    if (st.candyGrab) {
      const spark = h("div", "", { style: { position: "absolute", top: "4rem", left: "50%", transform: "translateX(-50%)", zIndex: 30, textAlign: "center", pointerEvents: "none" } });
      spark.appendChild(h("img", "", { src: CANDY_TARGET, alt: "candy", style: { width: "56px", height: "56px", objectFit: "contain" } }));
      play.appendChild(spark);
    }
    wrap.appendChild(play);
    const instr = h("div", "", { style: { position: "relative", zIndex: 20, marginBottom: "1.25rem", textAlign: "center", pointerEvents: "none", flexShrink: 0 } });
    if (!st.candyDone && st.candyHint) {
      instr.appendChild(
        h("p", "font-heading", { style: { color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 } }, [
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
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,215,0,0.5)", textTransform: "uppercase", marginBottom: "0.75rem" } }, ["Memory 02"])
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
            ? { color: "#00D1FF", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, textShadow: "0 0 20px rgba(0,209,255,0.7)" }
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
