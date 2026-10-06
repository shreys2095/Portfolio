const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================================================
   CONTENT. Edit these lists; no need to touch the code below.
   ========================================================= */
const BIO =
  "I'm a software engineer with almost two years of professional experience at TCS and a master's in Software Engineering from ASU. I've moved from reports to screens to the systems underneath, and each move taught me something the last one couldn't. What I enjoy most is making things work, whether that's a feature people rely on or a system that has to stay safe.";

const SECTIONS = [
  { name: "Frontend Development", skills: ["JavaScript", "HTML", "CSS", "Responsive Design", "DOM Fundamentals"] },
  { name: "Design & Collaboration", skills: ["Figma", "Canva", "MS Office Suite", "Scrum", "Stakeholder Reporting"] },
  { name: "Analytics & BI", skills: ["Google Analytics (GA4)", "Google Tag Manager", "KPI Dashboards", "Data Validation", "SQL", "Excel", "Power BI", "Tableau"] },
  { name: "Data Management", skills: ["Data Wrangling", "Dataset Querying", "ETL Concepts", "Data Governance"] },
  { name: "Cloud & Tools", skills: ["AWS (EC2, S3, CloudWatch, IAM)", "GCP (BigQuery, Dialogflow CX, Document AI)", "Taiga"] },
  { name: "Programming", skills: ["Python", "Java"] },
];

/* x,y are positions on a 680x420 map. India sits left (x<280), Arizona right (x>400). */
const STOPS = [
  {
    label: "Bachelor's",
    x: 70,
    y: 350,
    org: "",
    roles: [
      {
        role: "Bachelor's Degree",
        when: "",
        desc: "Where the journey began — details coming soon.",
        skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "DOM Fundamentals", "Java", "Python", "AWS (EC2, S3, CloudWatch, IAM)", "Taiga"],
      },
    ],
  },
  {
    label: "Intellico Labs",
    x: 182,
    y: 300,
    org: "Intellico Labs, Pune, India",
    roles: [
      {
        role: "Intern",
        when: "Aug 2020 – Sep 2020",
        desc: "Co-founded LocoHelp, a local business listing platform — designed the company logo, devised a marketing plan, researched legal formalities for setting up an Indian company, and conducted market research on potential clients.",
        skills: ["Figma", "Canva"],
      },
    ],
  },
  {
    label: "Jagar Manacha",
    x: 90,
    y: 222,
    org: "Jagar Manacha, Pune, India",
    roles: [
      {
        role: "Intern",
        when: "Oct 2020 – Nov 2020",
        desc: "Structured and created task-based activities and modules from in-depth research, and helped manage the Mental Health Awareness 2.0 event.",
        skills: [],
      },
    ],
  },
  {
    label: "TCS",
    x: 205,
    y: 140,
    org: "Tata Consultancy Services",
    roles: [
      {
        role: "Assistant System Engineer",
        when: "2021 – 2022",
        desc: "Built chatbot workflows with Dialogflow CX and Python.",
        skills: ["GCP (BigQuery, Dialogflow CX, Document AI)"],
      },
      {
        role: "System Administrator",
        when: "2022 – 2024",
        desc: "Led a GA4 migration across 100+ properties, improving data accuracy by 30%.",
        skills: [
          "Google Analytics (GA4)",
          "Google Tag Manager",
          "Data Validation",
          "KPI Dashboards",
          "SQL",
          "Excel",
          "Power BI",
          "Tableau",
          "Data Wrangling",
          "Dataset Querying",
          "ETL Concepts",
          "Data Governance",
          "MS Office Suite",
          "Scrum",
          "Stakeholder Reporting",
        ],
      },
    ],
  },
  {
    label: "ASU",
    x: 482,
    y: 140,
    org: "Arizona State University, Tempe",
    roles: [
      {
        role: "M.S. Software Engineering",
        when: "2025 – Present",
        desc: "Moved to the US to deepen my engineering skills.",
        skills: [],
      },
    ],
  },
  {
    label: "Allyzent",
    x: 600,
    y: 238,
    org: "Allyzent",
    roles: [
      {
        role: "Software Engineer",
        when: "Now",
        desc: "Current role — details coming soon.",
        skills: [],
      },
    ],
  },
  {
    label: "Next stop",
    x: 505,
    y: 332,
    org: "Remote or Arizona",
    roles: [
      {
        role: "Open to opportunities",
        when: "",
        desc: "Looking for a team where I can keep shipping real products.",
        skills: [],
      },
    ],
  },
];

const PROJECTS = [
  {
    name: "RouteGo",
    type: "Optimization App",
    hook: "Smarter multi-stop routing, not a black box.",
    letter: "R",
    colors: ["#F3DCE4", "#7A2036", "#FBEFF3"],
    desc: "Built a route optimization algorithm with a Figma-designed review interface.",
    skills: ["Algorithm Design", "Figma", "Data Visualization"],
    proof: [{ text: "Published paper", icon: "i-doc", url: "https://www.ijraset.com/research-paper/vehicle-routing-using-genetic-algorithm-and-ml" }],
  },
  {
    name: "AWS Cloud Monitoring",
    type: "Cloud Infrastructure",
    hook: "Centralized health across cloud resources.",
    letter: "A",
    colors: ["#E3EBDD", "#4F6B47", "#EEF4EA"],
    desc: "Built AWS monitoring across EC2, IAM, S3, and CloudWatch, pulling logs via AWS APIs.",
    skills: ["AWS EC2", "CloudWatch", "IAM", "S3"],
    proof: [
      { text: "iOS demo", icon: "i-link", url: "https://youtu.be/s0DGB0sUEqc?is=1J8yQNkFQD7zqwSl" },
      { text: "Android demo", icon: "i-link", url: "https://youtu.be/VRK2WT-yNJ8?is=RT3XID6WbpQft5OA" },
    ],
  },
  {
    name: "Parking System App",
    type: "Mobile Application",
    hook: "Find and manage parking, simply.",
    letter: "P",
    colors: ["#F6E9DD", "#7A2036", "#FBF3EA"],
    desc: "Built a Flutter parking app with UI screens designed in Canva.",
    skills: ["Flutter", "Canva", "Mobile UX"],
    proof: [],
  },
  {
    name: "Phantom",
    type: "Full-Stack Dashboard",
    hook: "Business analytics, answered in plain English.",
    letter: "D",
    colors: ["#EFD6DE", "#7A2036", "#FBF0F3"],
    desc: "Optimized PostgreSQL schemas and built a GenAI assistant for sales and inventory questions.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    proof: [],
  },
];

const DWELL = 0.048; /* scroll share each role holds the plane at its stop */
const MAX_CHIPS = 3; /* chips shown per suitcase compartment before "+n" */

/* ========================================================= */
const $ = (id) => document.getElementById(id);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Intro ---------- */
(() => {
  const text = "I'm Shreya Sunil.";
  $("name").innerHTML = [...text]
    .map((c, i) => `<span aria-hidden="true" style="transition-delay:${i * 45}ms">${c === " " ? "&nbsp;" : c}</span>`)
    .join("");
  const head = $("head");

  const start = () => {
    if (reduce) {
      $("hey").classList.add("s2");
      $("name").classList.add("in");
      $("cue").style.opacity = 1;
      head.classList.add("is-visible", "is-solid");
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => $("hey").classList.add("s1")));
    setTimeout(() => $("hey").classList.replace("s1", "s2"), 1500);
    setTimeout(() => $("name").classList.add("in"), 1850);
    setTimeout(flyover, 2600);
    setTimeout(() => {
      $("cue").style.opacity = 1;
      head.classList.add("is-visible");
    }, 4100);
    /* safety net: never leave the hero blank */
    setTimeout(() => {
      $("name").classList.add("in");
      $("cue").style.opacity = 1;
      head.classList.add("is-visible");
    }, 6000);
  };
  if (document.readyState === "complete") start();
  else addEventListener("load", start, { once: true });

  /* a plane sweeps across the hero and loops down toward the scroll cue */
  function flyover() {
    const hero = $("top"),
      W = hero.clientWidth,
      H = hero.clientHeight;
    const d = `M${-60} ${H * 0.78} C${W * 0.25} ${H * 0.95} ${W * 0.32} ${H * 0.18} ${W * 0.62} ${H * 0.22} S${W * 1.02} ${H * 0.62} ${W * 0.5} ${H * 0.9}`;
    ["htrail", "hmp"].forEach((id) => $(id).setAttribute("d", d));
    const path = $("htrail"),
      L = path.getTotalLength(),
      mp = $("hmp"),
      pl = $("hplane");
    mp.setAttribute("stroke-dasharray", L + " " + L);
    mp.setAttribute("stroke-dashoffset", L);
    pl.setAttribute("opacity", 1);
    const t0 = performance.now(),
      dur = 2200;
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur),
        e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        s = e * L;
      const p = path.getPointAtLength(s),
        q = path.getPointAtLength(Math.min(s + 2, L)),
        r = path.getPointAtLength(Math.max(s - 2, 0));
      const a = (s + 2 <= L ? Math.atan2(q.y - p.y, q.x - p.x) : Math.atan2(p.y - r.y, p.x - r.x)) * (180 / Math.PI);
      pl.setAttribute("transform", `translate(${p.x},${p.y}) rotate(${a}) scale(${1 - 0.45 * t})`);
      mp.setAttribute("stroke-dashoffset", L - s);
      if (t < 1) requestAnimationFrame(step);
      else pl.setAttribute("opacity", 0);
    })(t0);
  }
})();

/* ---------- Header state: solid-on-scroll + active section link ---------- */
(() => {
  const head = $("head"),
    links = [...document.querySelectorAll(".site-nav__links a")];
  const onScroll = () => {
    head.classList.toggle("is-solid", scrollY > innerHeight * 0.5);
    if (scrollY > 40) head.classList.add("is-visible");
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["about", "journey", "projects", "contact"].forEach((id) => io.observe($(id)));
})();

/* ---------- 2. Passport ---------- */
(() => {
  const bio = `<p class="lbl">About me</p><p class="bio">${BIO}</p>`;
  $("bioPage").innerHTML = bio;
  $("leftStatic").innerHTML = innerWidth <= 640 ? bio : "";
  const open = () => {
    $("cover").classList.add("open");
    $("spread").classList.add("open");
  };
  if (reduce) return open();
  new IntersectionObserver(
    ([e], o) => {
      if (e.isIntersecting) {
        setTimeout(open, 250);
        o.disconnect();
      }
    },
    { threshold: 0.45 }
  ).observe($("spread"));
})();

/* ---------- 4. Projects: postcards ---------- */
const cards = PROJECTS.map((p, i) => {
  const [fill, ink, tint] = p.colors;
  const proofs = p.proof
    .map((x) =>
      x.url
        ? `<a class="pf" href="${x.url}" target="_blank" rel="noopener"><svg class="icon"><use href="#${x.icon}"/></svg>${x.text}</a>`
        : `<span class="pf"><svg class="icon"><use href="#${x.icon}"/></svg>${x.text}</span>`
    )
    .join("");
  const el = document.createElement("div");
  el.className = "pc";
  el.tabIndex = 0;
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", p.name + ", flip for details");
  el.style.setProperty("--r", [-1.5, 1.2, -1, 1.6][i % 4] + "deg");
  el.style.transitionDelay = i * 120 + "ms";
  el.innerHTML = `<div class="pci">
    <div class="fc pfront" style="background:${fill};color:${ink}">
      <div class="stamp" style="background:${tint}">${p.letter}</div>
      <span class="typ" style="background:${tint};color:${ink}">${p.type}</span>
      <div class="fb"><p class="pname">${p.name}</p><p class="hook">${p.hook}</p>
      <p class="flip" style="display:flex;align-items:center;gap:5px"><svg class="icon" style="width:13px;height:13px"><use href="#i-rotate"/></svg>Flip for details</p></div>
    </div>
    <div class="fc pback">
      <div class="l"><p class="lab">What I built</p><p class="bdesc">${p.desc}</p></div>
      <div class="r"><p class="lab" style="margin:0">Skills</p><div style="display:flex;gap:4px;flex-wrap:wrap">${p.skills.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      <div class="proofs" onclick="event.stopPropagation()">${proofs}</div></div>
    </div></div>`;
  const toggle = () => el.classList.toggle("fl");
  el.addEventListener("click", toggle);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
  $("pcg").appendChild(el);
  return el;
});
new IntersectionObserver(
  ([e], o) => {
    if (e.isIntersecting) {
      cards.forEach((c) => c.classList.add("in"));
      setTimeout(() => cards.forEach((c) => (c.style.transitionDelay = "0ms")), 1200);
      o.disconnect();
    }
  },
  { threshold: 0.2 }
).observe($("pcg"));

/* ---------- 5. Contact ----------
   No backend is wired up yet (hosting + email-delivery decision is still
   pending), so this only validates and shows the "sent" confirmation —
   swap the submit handler for a real POST once that's decided. */
(() => {
  const R = [
    ["fn", "efn", (v) => (v.trim() ? "" : "Enter your name")],
    ["fe", "efe", (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Enter a valid email")],
    ["fm", "efm", (v) => (v.trim().length >= 5 ? "" : "Write a short message")],
  ];
  R.forEach(([i, e]) => $(i).addEventListener("input", () => ($(e).textContent = "")));
  $("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    let ok = true;
    R.forEach(([i, e, t]) => {
      const m = t($(i).value);
      $(e).textContent = m;
      if (m) ok = false;
    });
    if (!ok) return;
    $("form").style.opacity = 0.25;
    $("form").style.pointerEvents = "none";
    $("sent").classList.add("on");
  });
})();

/* ---------- 3. Journey: pinned flight-route map + carry-on suitcase ---------- */
try {
  const NS = "http://www.w3.org/2000/svg",
    VW = 680;

  /* suitcase compartments */
  const secOf = {};
  SECTIONS.forEach((s, i) => s.skills.forEach((k) => (secOf[k] = i)));
  const comps = SECTIONS.map((s) => {
    const d = document.createElement("div");
    d.className = "comp";
    d.innerHTML = `<div class="ch"><p>${s.name}</p><span class="cnt">0</span></div><div class="chips"><span class="ph">Not packed yet</span></div>`;
    $("lining").appendChild(d);
    return d;
  });

  /* flight route: hops between stops, the international one flies high */
  const pts = [{ x: 40, y: 398 }, ...STOPS];
  const hop = (a, b) => {
    const long = Math.abs(b.x - a.x) > 200;
    const h = long ? 190 : 34;
    return `Q${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - h} ${b.x} ${b.y}`;
  };
  const pathTo = (n) => {
    let d = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i <= n; i += 1) d += " " + hop(pts[i - 1], pts[i]);
    return d;
  };
  const D = pathTo(pts.length - 1);
  ["route", "trail", "mpath"].forEach((id) => $(id).setAttribute("d", D));
  const route = $("route"),
    L = route.getTotalLength();
  $("mpath").setAttribute("stroke-dasharray", L + " " + L);
  const tmp = document.createElementNS(NS, "path");
  $("defs").appendChild(tmp);
  const lenTo = (n) => {
    tmp.setAttribute("d", pathTo(n));
    return tmp.getTotalLength();
  };
  const SL = STOPS.map((_, k) => lenTo(k + 1));
  const longHop = STOPS.findIndex((s, k) => k > 0 && Math.abs(s.x - STOPS[k - 1].x) > 200);
  const longA = SL[longHop - 1],
    longB = SL[longHop];

  /* timeline: fly, hold for each role, fly... (the long flight gets less scroll per pixel) */
  const pieces = [],
    HOLDS = [];
  let at = 0;
  STOPS.forEach((s, k) => {
    if (SL[k] - at > 0.5) pieces.push({ type: "move", a: at, b: SL[k], w: (SL[k] - at) * (k === longHop ? 0.45 : 1) });
    s.roles.forEach((_, r) => {
      const h = { type: "hold", k, r, a: SL[k], b: SL[k] };
      pieces.push(h);
      HOLDS.push(h);
    });
    at = SL[k];
  });
  const moveW = pieces.filter((x) => x.type === "move").reduce((t, x) => t + x.w, 0);
  let acc = 0;
  pieces.forEach((x) => {
    const w = x.type === "hold" ? DWELL : (x.w / moveW) * (1 - DWELL * HOLDS.length);
    x.t0 = acc;
    acc += w;
    x.t1 = acc;
  });
  function stateAt(p) {
    const x = pieces.find((x) => p <= x.t1) || pieces[pieces.length - 1];
    const f = x.t1 > x.t0 ? Math.min(1, Math.max(0, (p - x.t0) / (x.t1 - x.t0))) : 1;
    let hi = -1;
    HOLDS.forEach((h, i) => {
      if (p >= h.t0) hi = i;
    });
    return { pos: x.a + (x.b - x.a) * f, active: x.type === "hold" ? HOLDS.indexOf(x) : -1, hi };
  }

  /* pins */
  const PIN = "M0 0 C-3 -7 -13 -14 -13 -26 A13 13 0 1 1 13 -26 C13 -14 3 -7 0 0Z",
    S = [];
  const pin = $("pin");
  const scrollToStop = (k) => {
    const h = HOLDS.find((x) => x.k === k),
      r = pin.getBoundingClientRect(),
      sc = r.height - innerHeight;
    scrollTo({ top: scrollY + r.top + sc * ((h.t0 + h.t1) / 2), behavior: "smooth" });
  };
  STOPS.forEach((m, k) => {
    const n = m.roles.length,
      g = document.createElementNS(NS, "g");
    g.setAttribute("class", "pinw");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `Stop ${k + 1}, ${m.label}`);
    g.innerHTML = `<ellipse class="ring" cx="${m.x}" cy="${m.y}" rx="7" ry="3" fill="none" stroke="var(--primary)" stroke-width="1.5"/>
      <ellipse cx="${m.x}" cy="${m.y}" rx="5" ry="2" fill="var(--line2)"/>
      <g transform="translate(${m.x},${m.y})"><g class="pb"><path class="pf" d="${PIN}" fill="var(--pin-off)"/><circle cy="-26" r="8.5" fill="var(--card)"/>
      <text class="sn" y="-26" text-anchor="middle" dominant-baseline="central" style="font-size:11px">${k + 1}</text>
      ${
        n > 1
          ? `<circle cx="11" cy="-37" r="7" fill="var(--primary)"/><text x="11" y="-37" text-anchor="middle" dominant-baseline="central" style="font-size:9px;fill:var(--cream);font-weight:700;font-family:var(--font-body)">${n}</text>`
          : ""
      }</g></g>
      <text class="st" x="${m.x}" y="${m.y + 19}" text-anchor="middle" style="font-family:var(--font-mono);font-size:11px">${m.label}</text>`;
    g.addEventListener("click", () => scrollToStop(k));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToStop(k);
      }
    });
    $("stops").appendChild(g);
    S.push({ m, up: m.y < 180, g, pf: g.querySelector(".pf"), pb: g.querySelector(".pb"), ring: g.querySelector(".ring") });
  });

  /* suitcase sync (reversible) */
  let hl = null;
  let currentHi = -1;
  const expanded = SECTIONS.map(() => false);
  function syncCase(hi) {
    currentHi = hi;
    const want = new Set();
    for (let i = 0; i <= hi; i += 1) {
      const h = HOLDS[i];
      STOPS[h.k].roles[h.r].skills.forEach((s) => want.add(s));
    }
    SECTIONS.forEach((sec, i) => {
      const box = comps[i].querySelector(".chips"),
        packed = sec.skills.filter((s) => want.has(s));
      const isExpanded = expanded[i];
      const shown = [...box.querySelectorAll(".sk")].map((b) => b.dataset.s),
        vis = isExpanded ? packed : packed.slice(0, MAX_CHIPS),
        extra = isExpanded ? [] : packed.slice(MAX_CHIPS);
      box.querySelectorAll(".sk").forEach((b) => {
        if (!vis.includes(b.dataset.s)) b.remove();
      });
      vis.forEach((s) => {
        if (!shown.includes(s)) {
          const b = document.createElement("button");
          b.className = "sk";
          b.textContent = s;
          b.dataset.s = s;
          b.onclick = () => highlight(s);
          box.appendChild(b);
        }
      });
      box.querySelector(".more")?.remove();
      box.querySelector(".ph")?.remove();
      if (extra.length) {
        const m = document.createElement("button");
        m.className = "more";
        m.textContent = "+" + extra.length;
        m.title = "Show " + extra.length + " more";
        m.onclick = () => {
          expanded[i] = true;
          syncCase(currentHi);
        };
        box.appendChild(m);
      } else if (isExpanded && packed.length > MAX_CHIPS) {
        const m = document.createElement("button");
        m.className = "more";
        m.textContent = "Show less";
        m.onclick = () => {
          expanded[i] = false;
          syncCase(currentHi);
        };
        box.appendChild(m);
      }
      if (!packed.length) box.insertAdjacentHTML("beforeend", '<span class="ph">Not packed yet</span>');
      comps[i].querySelector(".cnt").textContent = packed.length;
    });
    if (hl && !want.has(hl)) highlight(hl);
  }
  function highlight(s) {
    hl = hl === s ? null : s;
    document.querySelectorAll(".sk").forEach((b) => b.classList.toggle("act", b.dataset.s === hl));
    comps.forEach((c, i) => c.classList.toggle("dim", !!hl && secOf[hl] !== i));
    S.forEach((st) => (st.g.style.opacity = !hl || st.m.roles.some((r) => r.skills.includes(hl)) ? 1 : 0.25));
    cards.forEach((c, i) => c.classList.toggle("dim", !!hl && !PROJECTS[i].skills.includes(hl)));
  }

  /* popup */
  const wrap = $("wrap"),
    pop = $("pop"),
    arr = $("arr");
  function place(k) {
    const o = S[k],
      sc = wrap.clientWidth / VW,
      px = o.m.x * sc,
      py = o.m.y * sc,
      w = pop.offsetWidth,
      h = pop.offsetHeight,
      W = wrap.clientWidth;
    const left = Math.max(4, Math.min(W - w - 4, px - w / 2)),
      below = o.up,
      top = below ? py + 30 * sc + 6 : py - 42 * sc - h - 12;
    pop.style.left = left + "px";
    pop.style.top = top + "px";
    arr.style.left = px - left - 6 + "px";
    Object.assign(
      arr.style,
      below
        ? { top: "-7px", bottom: "", borderRight: "none", borderBottom: "none", borderLeft: "", borderTop: "" }
        : { bottom: "-7px", top: "", borderLeft: "none", borderTop: "none", borderRight: "", borderBottom: "" }
    );
    pop.style.transformOrigin = `${px - left}px ${below ? 0 : h}px`;
  }
  function show(i) {
    const h = HOLDS[i],
      m = STOPS[h.k],
      R = m.roles[h.r],
      n = m.roles.length;
    $("steps").style.display = n > 1 ? "flex" : "none";
    $("steps").innerHTML =
      n > 1
        ? m.roles.map((_, j) => `<span class="dot${j <= h.r ? " on" : ""}"></span>`).join("") +
          `<span style="font-family:var(--font-mono);font-size:11px;color:var(--faint);margin-left:4px">Role ${h.r + 1} of ${n}</span>`
        : "";
    $("pnum").textContent = h.k + 1;
    $("prole").textContent = R.role;
    $("porg").textContent = m.org;
    $("pwhen").textContent = R.when;
    $("pdesc").textContent = R.desc;
    $("pchips").innerHTML = R.skills.slice(0, 3).map((x) => `<span class="chip">${x}</span>`).join("");
    place(h.k);
    requestAnimationFrame(() => pop.classList.add("show"));
  }

  /* render loop */
  const plane = $("plane"),
    body = $("planeBody"),
    shadow = $("shadow");
  let target = 0,
    smooth = 0,
    shown = -1,
    lastHi = -2,
    lastK = -2;
  const read = () => {
    const r = pin.getBoundingClientRect(),
      sc = r.height - innerHeight;
    target = Math.min(1, Math.max(0, -r.top / sc));
  };
  addEventListener("scroll", read, { passive: true });
  addEventListener("resize", () => {
    read();
    if (shown >= 0) place(HOLDS[shown].k);
  });
  read();
  smooth = target;

  function render() {
    smooth += (target - smooth) * (reduce ? 1 : 0.16);
    if (Math.abs(target - smooth) < 0.0003) smooth = target;
    const st = stateAt(smooth),
      k = st.hi >= 0 ? HOLDS[st.hi].k : -1;
    if (st.hi !== lastHi) {
      if (k > lastK && k >= 0 && !reduce) {
        const o = S[k];
        [
          [o.ring, "go"],
          [o.pb, "bounce"],
        ].forEach(([e, c]) => {
          e.classList.remove(c);
          void e.getBBox();
          e.classList.add(c);
        });
      }
      S.forEach((o, i) => o.pf.setAttribute("fill", i <= k ? "var(--primary)" : "var(--pin-off)"));
      syncCase(st.hi);
      lastHi = st.hi;
      lastK = k;
    }
    $("mpath").setAttribute("stroke-dashoffset", L - st.pos);
    if (st.active !== shown) {
      pop.classList.remove("show");
      shown = st.active;
      if (shown >= 0) show(shown);
    }

    const p = route.getPointAtLength(st.pos),
      q = route.getPointAtLength(Math.min(st.pos + 3, L)),
      r = route.getPointAtLength(Math.max(st.pos - 3, 0));
    const a = st.pos + 3 <= L ? Math.atan2(q.y - p.y, q.x - p.x) : Math.atan2(p.y - r.y, p.x - r.x);
    /* altitude: plane lifts between stops, sits down when holding */
    let alt = st.active >= 0 ? 0 : 1;
    if (st.pos > longA && st.pos < longB) alt = 1 + 0.35 * Math.sin((Math.PI * (st.pos - longA)) / (longB - longA));
    const scale = 0.9 + 0.2 * alt;
    plane.setAttribute("transform", `translate(${p.x},${p.y})`);
    body.setAttribute("transform", `rotate(${(a * 180) / Math.PI}) scale(${scale})`);
    shadow.setAttribute("transform", `translate(${6 * alt},${10 * alt}) scale(${1 - 0.3 * alt})`);
    shadow.setAttribute("opacity", 0.35 - 0.15 * alt);
    $("hint").style.opacity = smooth < 0.015 ? 1 : 0;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
} catch (err) {
  /* fallback: plain list if anything above fails */
  $("pin").style.height = "auto";
  document.querySelector("#journey .stage").innerHTML = `<p class="kicker">Experience</p><h2>The route so far</h2><ol>${STOPS.map((s) =>
    s.roles
      .map(
        (r) =>
          `<li><b>${r.role}</b>${s.org ? ", " + s.org : ""}${r.when ? " (" + r.when + ")" : ""}<br><span style="color:var(--muted)">${r.desc}</span></li>`
      )
      .join("")
  ).join("")}</ol>`;
}
