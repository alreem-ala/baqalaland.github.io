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
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.5em", color: "rgba(255,46,99,0.7)", textTransform: "uppercase", marginBottom: "1.5rem" } }, ["Now"])
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
          ["Let's Go ->"]
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
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,46,99,0.7)", textTransform: "uppercase", textAlign: "center", marginBottom: "0.75rem" } }, ["Game 1 - Memory"])
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
      inner.appendChild(h("p", "font-heading", { style: { color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.2em", textAlign: "center", marginBottom: "1rem" } }, ["Get ready..."]));
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
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,46,99,0.7)", textTransform: "uppercase", textAlign: "center", marginBottom: "0.5rem" } }, ["Game 1 - Memory"])
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
                  st.budget = Math.min(10, st.quizScores.reduce((a, b) => a + b, 0));
                  setPhase(PHASES.BUDGET);
                } else {
                  st.spPhase = "intro";
                  render();
                }
              }, 2000);
            },
          },
          ["Submit ->"]
        )
      );
    } else if (st.mgPhase === "result" && st.mgScore) {
      const emoji = st.mgScore.s === 3 ? "\u{1F9E0}" : st.mgScore.s === 2 ? "\u{1F605}" : "\u{1F636}";
      inner.appendChild(h("div", "", { style: { fontSize: "4rem", textAlign: "center", marginBottom: "1rem" } }, [emoji]));
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textAlign: "center", textTransform: "uppercase", marginBottom: "0.5rem" } }, [`${st.mgScore.correct}/5 correct`])
      );
      const msg =
        st.mgScore.s === 3 ? "Baqala photographic memory." : st.mgScore.s === 2 ? "Not bad. You were paying attention." : "The snacks were a blur, weren't they.";
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
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(0,209,255,0.7)", textTransform: "uppercase", marginBottom: "1rem" } }, ["Game 2 - Speed"])
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
                  st.spPhase = "result";
                  render();
                  const s =
                    st.spTargetsSpawned > 0 && st.spHits === st.spTargetsSpawned
                      ? 3
                      : st.spHits >= 8
                        ? 3
                        : st.spHits >= 5
                          ? 2
                          : st.spHits >= 2
                            ? 1
                            : 0;
                  if (s === 3) playFound();
                  else playLand();
                  setTimeout(() => {
                    st.quizScores.push(s);
                    st.quizGameIndex += 1;
                    if (st.quizGameIndex >= 3) {
                      st.budget = Math.min(10, st.quizScores.reduce((a, b) => a + b, 0));
                      setPhase(PHASES.BUDGET);
                    } else {
                      st.sqPhase = "intro";
                      render();
                    }
                  }, 2200);
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
          ["Start ->"]
        )
      );
      wrap.appendChild(box);
    } else if (st.spPhase === "playing") {
      wrap.style.touchAction = "manipulation";
      const hud = h("div", "", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          zIndex: 20,
          background: "rgba(13,8,34,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      });
      const hudL = h("div", "", {});
      hudL.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 } }, ["Hits"]));
      hudL.appendChild(h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1.25rem", color: "#FF2E63", margin: 0 } }, [String(st.spHits)]));
      const hudC = h("div", "", { style: { textAlign: "center" } });
      hudC.appendChild(
        h("p", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", margin: 0, color: st.spTime <= 3 ? "#FF2E63" : "#FFD700" } }, [`${st.spTime}s`])
      );
      const hudR = h("div", "", { style: { textAlign: "right" } });
      hudR.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 } }, ["Misses"]));
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
    } else if (st.spPhase === "result") {
      const s =
        st.spTargetsSpawned > 0 && st.spHits === st.spTargetsSpawned
          ? 3
          : st.spHits >= 8
            ? 3
            : st.spHits >= 5
              ? 2
              : st.spHits >= 2
                ? 1
                : 0;
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
      const emoji = s === 3 ? "\u{26A1}" : s === 2 ? "\u{1F4A7}" : "\u{1F422}";
      box.appendChild(h("div", "", { style: { fontSize: "4rem", marginBottom: "1rem" } }, [emoji]));
      box.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textTransform: "uppercase", textAlign: "center", marginBottom: "0.5rem" } }, [`${st.spHits} Areej grabbed`])
      );
      const msg =
        s === 3 ? "The fridge never stood a chance." : s === 2 ? "Decent reflexes. The baqala approves." : "You were distracted by the chips, weren't you.";
      box.appendChild(h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center" } }, [msg]));
      box.appendChild(h("div", "font-heading", { style: { marginTop: "1rem", fontSize: "1.875rem", color: "#FFD700", fontWeight: 700 } }, [`+${s} AED`]));
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
          st.budget = Math.min(10, st.quizScores.reduce((a, b) => a + b, 0));
          setPhase(PHASES.BUDGET);
        } else render();
      }, 2600);
    };
    if (st.sqPhase === "intro") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,215,0,0.7)", textTransform: "uppercase", textAlign: "center", marginBottom: "1rem" } }, ["Game 3 - Sequence"])
      );
      inner.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.5rem", color: "#fff", textAlign: "center", textTransform: "uppercase", marginBottom: "0.75rem" } }, ["The Order"])
      );
      inner.appendChild(
        h("p", "font-body", { style: { fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", textAlign: "center", maxWidth: "22rem", margin: "0 auto 2rem" } }, [
          "Watch the snacks appear in order. Then repeat the sequence. A wrong tap does not end the roundkeep going until all five match.",
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
          ["Watch ->"]
        )
      );
    } else if (st.sqPhase === "showing" || st.sqPhase === "input") {
      inner.appendChild(
        h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,215,0,0.7)", textTransform: "uppercase", textAlign: "center", marginBottom: "0.25rem" } }, ["Game 3 - Sequence"])
      );
      if (st.sqPhase === "showing") {
        inner.appendChild(h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "1.125rem", color: "#fff", textAlign: "center", marginBottom: "1rem" } }, ["Watch the order..."]));
        const strip = h("div", "", { style: { display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" } });
        st.sqSeq.forEach((item, i) => {
          const lit = st.sqShow === i;
          const slot = h("div", "", {
            style: {
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: lit ? "scale(1.4)" : "scale(1)",
              boxShadow: lit ? `0 0 20px ${item.color}` : "none",
              background: lit ? `${item.color}55` : "rgba(255,255,255,0.07)",
              transition: "all 0.15s",
            },
          });
          if (st.sqShow >= i) slot.appendChild(h("img", "", { src: item.img, alt: item.label, style: { width: "1.5rem", height: "1.5rem", objectFit: "contain" } }));
          else slot.appendChild(h("span", "", { style: { fontSize: "1rem" } }, ["?"]));
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
    const msg = budgetMessage(st.budget);
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
          if (next !== st.brCount && Math.random() < 0.35) playCoin();
          st.brCount = next;
          const el = document.getElementById("budget-num");
          if (el) el.textContent = String(st.brCount);
          if (p < 1) st.brRaf = requestAnimationFrame(tick);
          else {
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
    box.appendChild(
      h(
        "p",
        "font-heading",
        { style: { fontSize: "0.75rem", letterSpacing: "0.4em", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", marginBottom: "2rem" } },
        ["You answered. The baqala counted. Here is what you earned:"]
      )
    );
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
      h("p", "font-heading", { style: { fontSize: "1.5rem", color: "hsl(var(--muted-foreground))", letterSpacing: "0.2em", marginTop: "0.25rem" } }, ["DIRHAMS"])
    );
    const coins = h("div", "", { style: { display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" } });
    const n = Math.min(st.budget, 10);
    for (let i = 0; i < n; i++) {
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
    if (st.budget > 10) coins.appendChild(h("span", "font-heading", { style: { fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", alignSelf: "center" } }, [`+${st.budget - 10}`]));
    box.appendChild(coins);
    if (st.brDone) {
      const msgBox = h("div", "", { style: { marginBottom: "2.5rem" } });
      msgBox.appendChild(
        h(
          "h2",
          "font-heading",
          { style: { fontSize: "clamp(1.125rem, 4vw, 1.5rem)", fontWeight: 700, color: "hsl(var(--foreground))", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" } },
          [msg.headline]
        )
      );
      msgBox.appendChild(
        h("p", "font-body", { style: { fontSize: "1rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6, fontStyle: "italic" } }, [`"${msg.body}"`])
      );
      box.appendChild(msgBox);
      box.appendChild(
        h(
          "button",
          "font-heading btn-raspberry",
          {
            onclick: () => setPhase(PHASES.CURTAIN),
          },
          ["Enter the Baqala ->"]
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
        "font-heading",
        { style: { fontWeight: 700, letterSpacing: "0.3em", color: "#FFD700", fontSize: "clamp(0.875rem, 3vw, 1rem)", textTransform: "uppercase", textShadow: "0 0 20px rgba(255,215,0,0.5)", margin: 0 } },
        ["BAQALALAND"]
      )
    );
    top.appendChild(
      h("p", "font-body", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(0,209,255,0.6)", textTransform: "uppercase", marginTop: "0.25rem", margin: 0 } }, ["Open 24/7 - baqala land"])
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
          ["Push Through to Enter ->"]
        )
      );
      hint.appendChild(
        h("p", "font-body", { style: { fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" } }, ["Move your cursor to part the strips"])
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
              inset: "-8px",
              borderRadius: "16px",
              pointerEvents: "none",
              background: "radial-gradient(ellipse 85% 90% at 50% 45%, rgba(255,215,0,0.26) 0%, rgba(255,200,80,0.08) 52%, transparent 72%)",
              boxShadow: "0 0 28px rgba(255,215,0,0.32), 0 0 56px rgba(255,215,0,0.1)",
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
            filter: sel ? "brightness(1.08) saturate(1.15) drop-shadow(0 6px 14px rgba(255,215,0,0.35))" : "brightness(0.9)",
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
      if (sel) {
        const badge = h("div", "", {
          style: {
            position: "absolute",
            top: "-4px",
            right: "-4px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background: "linear-gradient(145deg, #ffe566, #c9a227)",
            boxShadow: "0 0 10px rgba(255,215,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
        badge.appendChild(h("span", "", { style: { color: "#2a1f08", fontSize: "8px", fontWeight: 700 } }, ["\u2713"]));
        btn.appendChild(badge);
      }
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
      h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.3em", color: "rgba(0,209,255,0.7)", textTransform: "uppercase", margin: 0 } }, ["Baqalaland"])
    );
    headL.appendChild(
      h("p", "font-heading", { style: { fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#FFD700", margin: "0.15rem 0 0" } }, ["Pick Your Memories"])
    );
    head.appendChild(headL);
    const remEl = h("div", "", { style: { textAlign: "right" } });
    remEl.appendChild(h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,215,0,0.7)", textTransform: "uppercase", margin: 0 } }, ["Remaining"]));
    remEl.appendChild(
      h(
        "p",
        `font-heading ${st.floorOver ? "shake" : ""}`,
        { style: { fontWeight: 700, fontSize: "1.25rem", color: remaining < 1 ? "#FF2E63" : "#FFD700", margin: 0 } },
        [`${remaining} AED`]
      )
    );
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
    const scroll = h("div", "baqala-scroll", { style: { flex: 1, overflowY: "auto", minHeight: 0, padding: "0.5rem", paddingTop: "0.75rem", position: "relative" } });
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
      h("span", "font-heading neon-flicker-blue", { style: { fontSize: "9px", letterSpacing: "0.4em", color: "rgba(0,209,255,0.5)", textTransform: "uppercase" } }, ["- snacks & drinks -"])
    );
    scroll.appendChild(signWrap);
    scroll.appendChild(shelfRow(SHELF_1, onPick));
    scroll.appendChild(shelfRow(SHELF_2, onPick));
    scroll.appendChild(shelfRow(SHELF_3, onPick));
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
      h("div", "", { style: { fontFamily: "monospace", fontSize: "10px", color: "#00D1FF", textAlign: "center", marginBottom: "0.25rem" } }, [`AED ${st.floorSpent.toFixed(2)}`])
    );
    row.appendChild(reg);
    const pile = h("div", "", { style: { flex: 1, display: "flex", alignItems: "flex-end", minHeight: "72px", position: "relative" } });
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
            marginLeft: i === 0 ? 0 : "-16px",
            zIndex: String(i),
            cursor: "pointer",
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (3 + (i % 4) * 2)}deg)`,
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
      tot.appendChild(h("p", "font-heading", { style: { fontSize: "9px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 } }, ["Total"]));
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
        ["Take These ->"]
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
      h("p", "font-heading", { style: { fontSize: "10px", letterSpacing: "0.4em", color: "rgba(0,209,255,0.7)", textTransform: "uppercase", margin: 0 } }, ["-------------------"])
    );
    header.appendChild(
      h("h1", "font-heading", {
        style: {
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 6vw, 1.875rem)",
          color: "#FF2E63",
          margin: "0.5rem 0",
          textShadow: "0 0 12px rgba(255,46,99,0.55), 0 0 28px rgba(255,46,99,0.35)",
        },
      }, ["NEON BAQALA"])
    );
    header.appendChild(h("p", "font-heading", { style: { fontSize: "0.75rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", margin: 0 } }, ["A Memory Receipt"]));
    paper.appendChild(header);
    const body = h("div", "", { style: { padding: "1.5rem" } });
    const divLabel = h("div", "", { style: { borderTop: "1px dashed rgba(45,27,105,0.2)", marginBottom: "1.25rem", textAlign: "center" } });
    divLabel.appendChild(
      h(
        "span",
        "font-heading",
        { style: { fontSize: "10px", letterSpacing: "0.15em", color: "hsl(var(--muted-foreground))", position: "relative", top: "-9px", background: "#fafafa", padding: "0 0.75rem" } },
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
          h("span", "font-heading", { style: { fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" } }, ["Remaining"]),
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
          ["Continue ->"]
        )
      );
    }
    paper.appendChild(body);
    card.appendChild(paper);
    wrap.appendChild(card);
    return wrap;
  }

  function renderEnding() {
    const wrap = h("div", "", {
      style: {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        boxSizing: "border-box",
        padding: "2rem 1rem 3rem",
        minHeight: 0,
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
          st.endChosen = st.picks[0];
          st.endSub = "reveal";
          render();
          setTimeout(() => {
            st.endSub = "end";
            render();
          }, 2800);
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
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: "rgba(0,209,255,0.5)", textTransform: "uppercase", marginBottom: "1.5rem" } }, ["leaving the baqala"])
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
          top: "38%",
          bottom: "14%",
          zIndex: 1,
          pointerEvents: "none",
        },
      });
      const positionsMulti = [
        { x: "6%", y: "12%" },
        { x: "48%", y: "4%" },
        { x: "26%", y: "44%" },
        { x: "58%", y: "40%" },
        { x: "4%", y: "68%" },
        { x: "42%", y: "62%" },
      ];
      const picksShown = st.picks.slice(0, 6);
      const snackSize = picksShown.length <= 1 ? "clamp(4.5rem, 28vw, 6.5rem)" : "clamp(3.25rem, 16vw, 4.75rem)";
      picksShown.forEach((snack, i) => {
        const pos =
          picksShown.length === 1
            ? { x: "50%", y: "50%" }
            : positionsMulti[i] || { x: "20%", y: "18%" };
        snacksLayer.appendChild(
          h("img", "", {
            src: snack.img,
            alt: snack.name,
            style: {
              position: "absolute",
              width: snackSize,
              height: snackSize,
              objectFit: "contain",
              left: pos.x,
              top: pos.y,
              transform: picksShown.length === 1 ? "translate(-50%, -50%)" : "none",
              filter: "brightness(0.92) drop-shadow(0 2px 6px rgba(0,0,0,0.45))",
            },
          })
        );
      });
      bagStage.appendChild(snacksLayer);
      bagStage.appendChild(
        h("img", "", {
          src: "./assets/plastic-bag.png",
          alt: "",
          draggable: false,
          style: {
            display: "block",
            width: "100%",
            height: "auto",
            position: "relative",
            zIndex: 2,
            pointerEvents: "none",
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
      box.appendChild(
        h("p", "font-body", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
            marginBottom: "2rem",
            maxWidth: "28rem",
            lineHeight: 1.55,
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
        }, ["The bag crinkles. You sit on the floor with your snacks spread out like treasure."])
      );
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
          ["Open the bag ->"]
        )
      );
      wrap.appendChild(box);
    } else if (st.endSub === "choose") {
      const box = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", maxWidth: "36rem", padding: "0 1rem" } });
      box.appendChild(
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: "rgba(255,215,0,0.6)", textTransform: "uppercase", marginBottom: "1rem" } }, ["the real question"])
      );
      box.appendChild(
        h("h2", "font-heading", { style: { fontWeight: 700, fontSize: "clamp(1.5rem, 5vw, 1.875rem)", color: "#fff", marginBottom: "0.5rem" } }, ["What do you eat first?"])
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
            padding: "1rem",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
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
        btn.appendChild(h("img", "", { src: snack.img, alt: snack.name, style: { width: "4rem", height: "4rem", objectFit: "contain" } }));
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
      const box = h("div", "", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 1.5rem" } });
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
        h("p", "font-heading", { style: { fontSize: "9px", letterSpacing: "0.5em", color: "rgba(255,46,99,0.6)", textTransform: "uppercase", marginBottom: "2.5rem" } }, ["a note before you go"])
      );
      const lines = h("div", "", { style: { display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" } });
      const closingLeadStyle = { fontWeight: 700, fontSize: "clamp(1.25rem, 4vw, 1.5rem)", color: "#fff", lineHeight: 1.4, margin: 0 };
      const closingBodyStyle = { fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 };
      CLOSING_LINES.forEach((line, i) => {
        if (i === 0) lines.appendChild(h("p", "font-heading", { style: closingLeadStyle }, [line]));
        else lines.appendChild(h("p", "font-body", { style: closingBodyStyle }, [line]));
      });
      box.appendChild(lines);
      if (st.endChosen) {
        const pill = h("div", "", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        });
        pill.appendChild(h("img", "", { src: st.endChosen.img, alt: st.endChosen.name, style: { width: "2rem", height: "2rem", objectFit: "contain" } }));
        pill.appendChild(
          h("span", "font-body", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" } }, [`You started with the ${st.endChosen.name}.`])
        );
        box.appendChild(pill);
      }
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
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#fff",
              cursor: "pointer",
              background: "linear-gradient(135deg, #FF2E63, #7B2FF2)",
              boxShadow: "0 4px 30px rgba(255,46,99,0.35)",
            },
            onclick: () => restart(),
          },
          ["Go back to the baqala ->"]
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
