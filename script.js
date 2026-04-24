const pageFrame = document.querySelector(".page-frame");
const hero = document.querySelector(".hero");
const ball = document.querySelector(".bridge-ball");
const cursorBall = document.querySelector(".cursor-ball");
const sectionNav = document.querySelector(".section-nav");
const aboutAnchor = document.querySelector("[data-about-anchor]");
const bridgeGraphic = document.querySelector("[data-bridge]");
const folder = document.querySelector("[data-folder]");
const pointsContainer = document.querySelector(".hero-points");
const capsules = [...document.querySelectorAll("[data-capsule]")];
const revealTargets = [...document.querySelectorAll("[data-reveal]")];
const navLinks = [...document.querySelectorAll(".section-nav__link")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (
  pageFrame &&
  hero &&
  ball &&
  sectionNav &&
  aboutAnchor &&
  bridgeGraphic &&
  folder &&
  pointsContainer &&
  capsules.length
) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cursorQuery = cursorBall
    ? window.matchMedia("(pointer: fine)")
    : null;
  const ballWidth = 44;
  const ballHeight = 44;
  const restingRotation = 148;
  const cursorScale = 0.72;
  const bridgeHitZones = [
    { xFactor: 0.18, yFactor: 0.1, yOffset: -ballHeight * 0.46 },
    { xFactor: 0.54, yFactor: 0.15, yOffset: -ballHeight * 0.46 },
    { xFactor: 0.84, yFactor: 0.28, yOffset: -ballHeight * 0.46 },
  ];
  const capsuleYOffset = -ballHeight * 0.48;
  let activeRunId = 0;
  let introPlayed = false;
  let introRunning = false;
  let restingState = null;
  let aboutPulseTimeout = 0;
  let folderHitTimeout = 0;
  let folderDismissTimeout = 0;
  let cursorHalf = cursorBall?.offsetWidth / 2 || 22;
  let lastPointerPosition = null;
  let ballCursorUnlocked = false;
  let ballCursorEngaged = false;
  const capsuleHitTimeouts = [];

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function easeOutCubic(amount) {
    return 1 - Math.pow(1 - amount, 3);
  }

  function easeInOutCubic(amount) {
    return amount < 0.5
      ? 4 * amount * amount * amount
      : 1 - Math.pow(-2 * amount + 2, 3) / 2;
  }

  function isCurrentRun(runId) {
    return runId === activeRunId;
  }

  function nextFrame() {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
  }

  function wait(ms, runId) {
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(isCurrentRun(runId)), ms);
    });
  }

  function getFrameOrigin() {
    const rect = pageFrame.getBoundingClientRect();

    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    };
  }

  function getElementPoint(
    element,
    xFactor = 0.5,
    yFactor = 0.5,
    xOffset = 0,
    yOffset = 0
  ) {
    const rect = element.getBoundingClientRect();
    const frameOrigin = getFrameOrigin();

    return {
      x:
        rect.left +
        window.scrollX -
        frameOrigin.x +
        rect.width * clamp(xFactor, 0, 1) +
        xOffset,
      y:
        rect.top +
        window.scrollY -
        frameOrigin.y +
        rect.height * clamp(yFactor, 0, 1) +
        yOffset,
    };
  }

  function getHeroStartPoint(reference) {
    const heroRect = hero.getBoundingClientRect();
    const frameOrigin = getFrameOrigin();
    const minX =
      heroRect.left +
      window.scrollX -
      frameOrigin.x +
      Math.min(heroRect.width * 0.08, 92);

    return {
      x: Math.max(reference.x - 52, minX),
      y: heroRect.top + window.scrollY - frameOrigin.y - ballHeight,
    };
  }

  function getBridgeTarget(index) {
    const point = bridgeHitZones[index];

    return getElementPoint(
      bridgeGraphic,
      point.xFactor,
      point.yFactor,
      point.xOffset ?? 0,
      point.yOffset ?? 0
    );
  }

  function getFolderTarget() {
    return getElementPoint(folder, 0.52, 0.31, 0, -ballHeight * 0.42);
  }

  function getCapsuleTarget(index) {
    return getElementPoint(capsules[index], 0.5, 0, 0, capsuleYOffset);
  }

  function getAboutTarget() {
    return getElementPoint(aboutAnchor, 0.5, 0, 0, -ballHeight * 0.48);
  }

  function getNavScrollTarget() {
    const navRect = sectionNav.getBoundingClientRect();
    return Math.max(0, navRect.top + window.scrollY - 12);
  }

  function positionBall(state) {
    ball.style.opacity = String(state.opacity ?? 1);
    ball.style.transform = `translate3d(${(state.x - ballWidth / 2).toFixed(
      2
    )}px, ${(state.y - ballHeight / 2).toFixed(2)}px, 0) rotate(${(
      state.rotation ?? 0
    ).toFixed(2)}deg) scale(${(state.scale ?? 1).toFixed(3)})`;
  }

  function positionCursorBall(x, y) {
    if (!cursorBall) {
      return;
    }

    cursorBall.style.transform = `translate3d(${(x - cursorHalf).toFixed(
      2
    )}px, ${(y - cursorHalf).toFixed(2)}px, 0) scale(${cursorScale})`;
  }

  function hideCursorBall() {
    if (!cursorBall) {
      return;
    }

    cursorBall.classList.remove("is-visible");
    positionCursorBall(-80, -80);
    document.body.classList.remove("has-ball-cursor");
  }

  function getAboutCursorPoint() {
    const rect = aboutAnchor.getBoundingClientRect();

    return {
      x: rect.left + rect.width * 0.5,
      y: rect.top,
    };
  }

  function engageBallCursor(x, y) {
    if (!cursorBall || !cursorQuery?.matches) {
      return;
    }

    cursorHalf = cursorBall.offsetWidth / 2 || 22;

    if (!ballCursorEngaged) {
      const aboutCursorPoint = getAboutCursorPoint();
      positionCursorBall(aboutCursorPoint.x, aboutCursorPoint.y);
      cursorBall.classList.add("is-visible");
      void cursorBall.offsetWidth;
      ball.classList.remove("is-resting");
      ball.classList.add("is-hidden");
      ballCursorEngaged = true;
    }

    document.body.classList.add("has-ball-cursor");
    cursorBall.classList.add("is-visible");
    positionCursorBall(x, y);
  }

  function unlockBallCursor() {
    ballCursorUnlocked = true;

    if (lastPointerPosition) {
      engageBallCursor(lastPointerPosition.x, lastPointerPosition.y);
    }
  }

  function clearSceneTimers() {
    window.clearTimeout(aboutPulseTimeout);
    window.clearTimeout(folderHitTimeout);
    window.clearTimeout(folderDismissTimeout);

    while (capsuleHitTimeouts.length) {
      window.clearTimeout(capsuleHitTimeouts.pop());
    }
  }

  function pulseAboutLink() {
    window.clearTimeout(aboutPulseTimeout);
    aboutAnchor.classList.remove("is-pulsing");
    void aboutAnchor.offsetWidth;
    aboutAnchor.classList.add("is-pulsing");
    aboutPulseTimeout = window.setTimeout(() => {
      aboutAnchor.classList.remove("is-pulsing");
    }, 620);
  }

  function triggerFolderImpact() {
    window.clearTimeout(folderHitTimeout);
    folder.classList.remove("is-hit");
    void folder.offsetWidth;
    folder.classList.add("is-hit");
    folderHitTimeout = window.setTimeout(() => {
      folder.classList.remove("is-hit");
    }, 300);
  }

  function dismissFolder() {
    window.clearTimeout(folderDismissTimeout);
    folder.classList.add("is-dismissed");
  }

  function triggerCapsuleHit(capsule) {
    if (!capsule) {
      return;
    }

    capsule.classList.remove("is-hit");
    void capsule.offsetWidth;
    capsule.classList.add("is-hit");

    const timeout = window.setTimeout(() => {
      capsule.classList.remove("is-hit");
    }, 280);

    capsuleHitTimeouts.push(timeout);
  }

  function resetScene() {
    introPlayed = false;
    introRunning = false;
    restingState = null;
    ballCursorUnlocked = false;
    ballCursorEngaged = false;
    clearSceneTimers();
    document.body.classList.remove("page-scroll-enabled");
    sectionNav.classList.remove("is-visible", "is-docked");
    aboutAnchor.classList.remove("is-pulsing");
    folder.classList.remove("is-hit", "is-open", "is-dismissed");
    pointsContainer.classList.remove("is-visible");
    capsules.forEach((capsule) => capsule.classList.remove("is-hit"));
    ball.classList.remove("is-resting", "is-hidden");
    hideCursorBall();
    pageFrame.classList.remove("is-ready");
    ball.style.opacity = "0";
    ball.style.transform = "translate3d(0, 0, 0) rotate(0deg) scale(1)";
  }

  async function animateBall(runId, options) {
    const {
      from,
      to,
      duration,
      easing,
      arc = 0,
      rotationFrom = 0,
      rotationTo = 0,
      scaleFrom = 1,
      scaleTo = 1,
      opacityFrom = 1,
      opacityTo = 1,
    } = options;

    if (!isCurrentRun(runId)) {
      return null;
    }

    positionBall({
      x: from.x,
      y: from.y,
      rotation: rotationFrom,
      scale: scaleFrom,
      opacity: opacityFrom,
    });

    return new Promise((resolve) => {
      let startTime = 0;

      function frame(now) {
        if (!isCurrentRun(runId)) {
          resolve(null);
          return;
        }

        if (!startTime) {
          startTime = now;
        }

        const progress = clamp((now - startTime) / duration, 0, 1);
        const eased = easing(progress);
        const state = {
          x: lerp(from.x, to.x, eased),
          y: lerp(from.y, to.y, eased) - Math.sin(progress * Math.PI) * arc,
          rotation: lerp(rotationFrom, rotationTo, eased),
          scale: lerp(scaleFrom, scaleTo, eased),
          opacity: lerp(opacityFrom, opacityTo, eased),
        };

        positionBall(state);

        if (progress < 1) {
          window.requestAnimationFrame(frame);
          return;
        }

        resolve(state);
      }

      window.requestAnimationFrame(frame);
    });
  }

  async function animateWindowScroll(runId, to, duration, easing) {
    if (!isCurrentRun(runId)) {
      return false;
    }

    const from = window.scrollY;

    return new Promise((resolve) => {
      let startTime = 0;

      function frame(now) {
        if (!isCurrentRun(runId)) {
          resolve(false);
          return;
        }

        if (!startTime) {
          startTime = now;
        }

        const progress = clamp((now - startTime) / duration, 0, 1);
        const eased = easing(progress);

        window.scrollTo({
          top: lerp(from, to, eased),
          left: 0,
          behavior: "auto",
        });

        if (progress < 1) {
          window.requestAnimationFrame(frame);
          return;
        }

        resolve(true);
      }

      window.requestAnimationFrame(frame);
    });
  }

  function updateRestingState() {
    if (!introPlayed || introRunning) {
      return;
    }

    restingState = {
      ...getAboutTarget(),
      rotation: restingRotation,
      scale: 0.94,
      opacity: 1,
    };
  }

  function syncNavVisibility() {
    if (!introPlayed || introRunning) {
      return;
    }

    updateRestingState();

    const heroOwnsViewport =
      hero.getBoundingClientRect().bottom >
      Math.min(window.innerHeight * 0.2, 160);

    sectionNav.classList.toggle("is-visible", !heroOwnsViewport);

    if (ballCursorEngaged) {
      ball.classList.add("is-hidden");
      return;
    }

    ball.classList.toggle("is-hidden", heroOwnsViewport);

    if (!heroOwnsViewport && restingState) {
      positionBall(restingState);
    } else if (heroOwnsViewport) {
      ball.style.opacity = "0";
    }
  }

  function finishInstantly() {
    pageFrame.classList.add("is-ready");
    document.body.classList.add("page-scroll-enabled");
    folder.classList.add("is-open");
    dismissFolder();
    pointsContainer.classList.add("is-visible");
    sectionNav.classList.add("is-docked");
    ball.classList.add("is-resting");
    introPlayed = true;
    introRunning = false;
    updateRestingState();
    syncNavVisibility();
    unlockBallCursor();
    syncActiveNav();
  }

  async function animateCapsuleSequence(runId, startingState) {
    let currentState = startingState;

    pointsContainer.classList.add("is-visible");
    await nextFrame();

    if (!(await wait(180, runId))) {
      return null;
    }

    for (let index = 0; index < capsules.length; index += 1) {
      const capsuleTarget = getCapsuleTarget(index);

      currentState = await animateBall(runId, {
        from: currentState,
        to: capsuleTarget,
        duration: index === 0 ? 520 : 360,
        easing: easeInOutCubic,
        arc: index === 0 ? 62 : 40,
        rotationFrom: currentState.rotation,
        rotationTo: currentState.rotation + 150,
        scaleFrom: currentState.scale,
        scaleTo: 0.98,
      });

      if (!isCurrentRun(runId) || !currentState) {
        return null;
      }

      triggerCapsuleHit(capsules[index]);

      if (!(await wait(150, runId))) {
        return null;
      }
    }

    return currentState;
  }

  async function playIntroSequence() {
    const runId = activeRunId + 1;
    activeRunId = runId;
    resetScene();
    introRunning = true;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    await nextFrame();

    if (!isCurrentRun(runId)) {
      return;
    }

    void pageFrame.offsetWidth;
    pageFrame.classList.add("is-ready");

    if (motionQuery.matches) {
      finishInstantly();
      return;
    }

    const firstBridgeTarget = getBridgeTarget(0);
    const secondBridgeTarget = getBridgeTarget(1);
    const thirdBridgeTarget = getBridgeTarget(2);
    const folderTarget = getFolderTarget();
    const navTarget = getAboutTarget();
    const startPoint = getHeroStartPoint(firstBridgeTarget);

    ball.style.opacity = "1";

    let currentState = await animateBall(runId, {
      from: {
        x: startPoint.x,
        y: startPoint.y,
        rotation: -98,
        scale: 0.98,
        opacity: 1,
      },
      to: firstBridgeTarget,
      duration: 620,
      easing: easeOutCubic,
      arc: 52,
      rotationFrom: -98,
      rotationTo: -12,
      scaleFrom: 0.98,
      scaleTo: 0.94,
    });

    if (!isCurrentRun(runId) || !currentState) {
      return;
    }

    if (!(await wait(70, runId))) {
      return;
    }

    currentState = await animateBall(runId, {
      from: currentState,
      to: secondBridgeTarget,
      duration: 210,
      easing: easeInOutCubic,
      arc: 36,
      rotationFrom: currentState.rotation,
      rotationTo: currentState.rotation + 150,
      scaleFrom: currentState.scale,
      scaleTo: 0.98,
    });

    if (!isCurrentRun(runId) || !currentState) {
      return;
    }

    if (!(await wait(45, runId))) {
      return;
    }

    currentState = await animateBall(runId, {
      from: currentState,
      to: thirdBridgeTarget,
      duration: 190,
      easing: easeInOutCubic,
      arc: 28,
      rotationFrom: currentState.rotation,
      rotationTo: currentState.rotation + 135,
      scaleFrom: currentState.scale,
      scaleTo: 0.98,
    });

    if (!isCurrentRun(runId) || !currentState) {
      return;
    }

    if (!(await wait(100, runId))) {
      return;
    }

    currentState = await animateBall(runId, {
      from: currentState,
      to: folderTarget,
      duration: 620,
      easing: easeInOutCubic,
      arc: 84,
      rotationFrom: currentState.rotation,
      rotationTo: currentState.rotation + 220,
      scaleFrom: currentState.scale,
      scaleTo: 0.98,
    });

    if (!isCurrentRun(runId) || !currentState) {
      return;
    }

    triggerFolderImpact();
    folder.classList.add("is-open");
    folderDismissTimeout = window.setTimeout(() => {
      dismissFolder();
    }, 220);

    if (!(await wait(420, runId))) {
      return;
    }

    currentState = await animateCapsuleSequence(runId, currentState);

    if (!isCurrentRun(runId) || !currentState) {
      return;
    }

    document.body.classList.add("page-scroll-enabled");
    const scrollTarget = getNavScrollTarget();

    const [landedOnNav] = await Promise.all([
      animateBall(runId, {
        from: currentState,
        to: navTarget,
        duration: 920,
        easing: easeInOutCubic,
        arc: 132,
        rotationFrom: currentState.rotation,
        rotationTo: restingRotation,
        scaleFrom: currentState.scale,
        scaleTo: 0.94,
      }),
      animateWindowScroll(runId, scrollTarget, 920, easeInOutCubic),
    ]);

    if (!isCurrentRun(runId) || !landedOnNav) {
      return;
    }

    sectionNav.classList.add("is-docked");
    ball.classList.add("is-resting");
    introPlayed = true;
    introRunning = false;
    updateRestingState();
    syncNavVisibility();
    unlockBallCursor();
    pulseAboutLink();
    syncActiveNav();
  }

  function showRevealTargetsImmediately() {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  function setupRevealObserver() {
    if (!revealTargets.length) {
      return;
    }

    if (motionQuery.matches || typeof IntersectionObserver !== "function") {
      showRevealTargetsImmediately();
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  function updateActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const linkSection = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", linkSection === sectionId);
    });
  }

  function getCurrentSectionId() {
    const navOffset =
      sectionNav.classList.contains("is-docked") && sectionNav.classList.contains("is-visible")
        ? sectionNav.offsetHeight
        : 0;
    const marker = window.scrollY + navOffset + 44;
    let currentId = navSections[0]?.id;

    navSections.forEach((section) => {
      if (marker >= section.offsetTop - navOffset - 56) {
        currentId = section.id;
      }
    });

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4
    ) {
      currentId = navSections[navSections.length - 1]?.id ?? currentId;
    }

    return currentId;
  }

  function syncActiveNav() {
    const currentId = getCurrentSectionId();

    if (currentId) {
      updateActiveNav(currentId);
    }
  }

  function setupSectionNav() {
    if (!navLinks.length || !navSections.length) {
      return;
    }

    syncActiveNav();

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("href")?.slice(1);

        if (targetId) {
          updateActiveNav(targetId);
          window.setTimeout(syncActiveNav, 260);
        }
      });
    });
  }

  function handleResize() {
    syncActiveNav();

    if (introRunning) {
      return;
    }

    if (introPlayed) {
      syncNavVisibility();
    }
  }

  function handleScroll() {
    syncActiveNav();

    if (!introPlayed || introRunning) {
      return;
    }

    syncNavVisibility();
  }

  function handleMotionChange() {
    playIntroSequence();

    if (motionQuery.matches) {
      showRevealTargetsImmediately();
    }
  }

  function handlePointerMove(event) {
    if (!cursorQuery?.matches || event.pointerType === "touch") {
      return;
    }

    lastPointerPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    if (!ballCursorUnlocked) {
      return;
    }

    engageBallCursor(event.clientX, event.clientY);
  }

  function handleCursorLeave() {
    if (!ballCursorUnlocked) {
      return;
    }

    hideCursorBall();
  }

  function handleCursorModeChange() {
    cursorHalf = cursorBall?.offsetWidth / 2 || 22;

    if (!cursorQuery?.matches) {
      hideCursorBall();
      return;
    }

    if (ballCursorUnlocked && lastPointerPosition) {
      engageBallCursor(lastPointerPosition.x, lastPointerPosition.y);
    }
  }

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", handleMotionChange);
  } else if (typeof motionQuery.addListener === "function") {
    motionQuery.addListener(handleMotionChange);
  }

  document.addEventListener("pointermove", handlePointerMove, {
    passive: true,
  });
  document.documentElement.addEventListener("mouseleave", handleCursorLeave);
  window.addEventListener("blur", handleCursorLeave);

  if (typeof cursorQuery?.addEventListener === "function") {
    cursorQuery.addEventListener("change", handleCursorModeChange);
  } else if (typeof cursorQuery?.addListener === "function") {
    cursorQuery.addListener(handleCursorModeChange);
  }

  window.addEventListener("hashchange", syncActiveNav);
  setupRevealObserver();
  setupSectionNav();
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll, { passive: true });
  playIntroSequence();
}
