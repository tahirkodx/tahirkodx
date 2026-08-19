const THUMB = "https://image.thum.io/get/width/1200/crop/750/noanimate/";
const CASE_BASE = "https://github.com/tahirkodx/tahirkodx/blob/main/portfolio/";
const STACK_BADGES = {
  React: "https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61DAFB",
  "React Native": "https://img.shields.io/badge/React_Native-20232a?style=flat-square&logo=react&logoColor=61DAFB",
  "Next.js": "https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white",
  "Vue.js": "https://img.shields.io/badge/Vue.js-35495e?style=flat-square&logo=vuedotjs&logoColor=4FC08D",
  "Nuxt.js": "https://img.shields.io/badge/Nuxt.js-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white",
  Quasar: "https://img.shields.io/badge/Quasar-1976D2?style=flat-square&logo=quasar&logoColor=white",
  TypeScript: "https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white",
  Fastify: "https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white",
  Prisma: "https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white",
  PostgreSQL: "https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white",
  Redis: "https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white",
  OpenAI: "https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white",
  AWS: "https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=FF9900",
  "Node.js": "https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white",
  "SQL Server": "https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white",
  Konva: "https://img.shields.io/badge/Konva-0D83CD?style=flat-square&logo=konva&logoColor=white",
  Zustand: "https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white",
  "TanStack Query": "https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white",
  Vite: "https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white",
  Supabase: "https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white",
  eBay: "https://img.shields.io/badge/eBay-E53238?style=flat-square&logo=ebay&logoColor=white",
  LiveKit: "https://img.shields.io/badge/LiveKit-1DA1F2?style=flat-square&logo=livekit&logoColor=white",
  Capacitor: "https://img.shields.io/badge/Capacitor-119EFF?style=flat-square&logo=capacitor&logoColor=white",
  Stripe: "https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white",
  Firebase: "https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black",
  "Google Ads": "https://img.shields.io/badge/Google_Ads-4285F4?style=flat-square&logo=googleads&logoColor=white",
};

function stackBadge(name) {
  const src = STACK_BADGES[name];
  if (!src) return `<li>${escapeHtml(name)}</li>`;
  return `<li class="stack-badge"><img src="${src}" alt="${escapeHtml(name)}"></li>`;
}

const grid = document.getElementById("grid");
const statusEl = document.getElementById("grid-status");
const dialog = document.getElementById("case-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogKicker = document.getElementById("dialog-kicker");
const dialogLive = document.getElementById("dialog-live");
const dialogCase = document.getElementById("dialog-case");
const closeBtn = document.getElementById("dialog-close");
const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
const panels = [...document.querySelectorAll("[role='tabpanel']")];

let projects = [];
let lastOpener = null;
let activeId = null;

function isLocalMedia(url) {
  return /^(?:\.\/|screens\/|docs\/)/.test(url) || /\.(?:png|jpe?g|webp|gif|svg)$/i.test(url);
}

function thumb(url) {
  if (!url) return "";
  if (isLocalMedia(url) && !/^https?:\/\//i.test(url)) return url;
  return `${THUMB}${url}`;
}

function mediaSrc(item) {
  if (typeof item === "string") return thumb(item);
  if (item && item.image) return item.image;
  return thumb(item && item.url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showStatus(message) {
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
}

function renderGrid(items) {
  grid.replaceChildren();
  items.forEach((project, index) => {
    const card = document.createElement("article");
    const classes = ["card"];
    if (index === 0) classes.push("card-lead");
    if (project.featured) classes.push("card-featured");
    card.className = classes.join(" ");
    card.dataset.id = project.id;
    const preview = project.previewImage || thumb(project.previewUrl);
    const stack = (project.stack || []).map(stackBadge).join("");
    card.innerHTML = `
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(project.name)}</h3>
        <p class="card-hook">${escapeHtml(project.hook)}</p>
        <ul class="stack-list">${stack}</ul>
        <p class="card-live">
          <a href="${escapeHtml(project.liveUrl)}" rel="noopener noreferrer">Live: ${escapeHtml(project.liveLabel)}</a>
        </p>
      </div>
      <button type="button" class="card-open" aria-haspopup="dialog">
        <span class="card-media">
          ${project.featured ? `<span class="card-badge">Featured</span>` : ""}
          <img src="${preview}" alt="${escapeHtml(project.name)}" width="1200" height="750" loading="${index === 0 || project.featured ? "eager" : "lazy"}" />
        </span>
      </button>
    `;
    const opener = card.querySelector(".card-open");
    opener.addEventListener("click", () => openProject(project.id, opener));
    grid.append(card);
  });
}

function setPage(pageId) {
  tabs.forEach((tab) => {
    const selected = tab.id === `tab-${pageId}`;
    tab.setAttribute("aria-selected", selected ? "true" : "false");
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    const match = panel.id === `panel-${pageId}`;
    panel.hidden = !match;
  });
}

function fillPanel(page, html) {
  const panel = document.getElementById(`panel-${page}`);
  if (panel) panel.innerHTML = html;
}

function renderProject(project) {
  dialogKicker.textContent = "Case study";
  dialogTitle.textContent = project.name;
  dialogLive.href = project.liveUrl;
  dialogCase.href = `${CASE_BASE}${project.caseStudy}`;

  fillPanel(
    "overview",
    `
      <h3>${escapeHtml(project.hook)}</h3>
      <p>${escapeHtml(project.body)}</p>
      <ul class="stack-list">${(project.stack || []).map(stackBadge).join("")}</ul>
      <p class="live-line"><a href="${escapeHtml(project.liveUrl)}" rel="noopener noreferrer">Live: ${escapeHtml(project.liveLabel)}</a></p>
      <figure class="preview-frame">
        <img src="${project.previewImage || thumb(project.previewUrl)}" alt="${escapeHtml(project.name)} preview" width="1200" height="750" />
      </figure>
    `
  );

  fillPanel(
    "usecase",
    `
      <h3>Use case</h3>
      <p>${escapeHtml(project.useCase)}</p>
      <h3>Problem</h3>
      <p>${escapeHtml(project.problem)}</p>
    `
  );

  fillPanel(
    "story",
    `
      <h3>From discussion to deploy</h3>
      <p>${escapeHtml(project.discussed)}</p>
      <h3>What shipped</h3>
      <p>${escapeHtml(project.shipped)}</p>
      <h3>How it was built</h3>
      <p>${escapeHtml(project.built)}</p>
      <h3>How it was deployed</h3>
      <p>${escapeHtml(project.deployed)}</p>
    `
  );

  const screens = (project.screens || []).map(
    (screen) => `
      <figure class="screen-card">
        <div class="preview-frame">
          <img src="${mediaSrc(screen)}" alt="${escapeHtml(screen.label)}" width="1200" height="750" loading="lazy" />
        </div>
        <figcaption>${escapeHtml(screen.label)}</figcaption>
      </figure>
    `
  );
  fillPanel(
    "screens",
    screens.length
      ? `<div class="screen-grid">${screens.join("")}</div>`
      : "<p>No extra public screens for this product.</p>"
  );

  const extraLinks = (project.links || [])
    .map((link) => `<li><a href="${escapeHtml(link.url)}" rel="noopener noreferrer">${escapeHtml(link.label)}</a></li>`)
    .join("");
  fillPanel(
    "live",
    `
      <h3>Open the live product</h3>
      <p>${escapeHtml(project.hook)}</p>
      <p><a href="${escapeHtml(project.liveUrl)}" rel="noopener noreferrer">${escapeHtml(project.liveLabel)}</a></p>
      <ul>${extraLinks}</ul>
    `
  );
}

function syncHash(id) {
  const next = id ? `#${id}` : "";
  if (location.hash !== next) {
    history.replaceState(null, "", next || location.pathname + location.search);
  }
}

function openProject(id, opener) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  lastOpener = opener || document.querySelector(`[data-id="${id}"]`);
  activeId = id;
  renderProject(project);
  setPage("overview");
  if (!dialog.open) dialog.showModal();
  syncHash(id);
  closeBtn.focus();
}

function closeProject() {
  if (dialog.open) dialog.close();
}

function onDialogClose() {
  activeId = null;
  syncHash("");
  if (lastOpener && typeof lastOpener.focus === "function") {
    lastOpener.focus();
  }
}

function onTabClick(event) {
  const page = event.currentTarget.id.replace("tab-", "");
  setPage(page);
  event.currentTarget.focus();
}

function onTabKeydown(event) {
  const keys = { ArrowLeft: -1, ArrowRight: 1, Home: "start", End: "end" };
  const move = keys[event.key];
  if (move == null) return;
  event.preventDefault();
  const index = tabs.indexOf(event.currentTarget);
  let next = 0;
  if (move === "start") next = 0;
  else if (move === "end") next = tabs.length - 1;
  else next = (index + move + tabs.length) % tabs.length;
  tabs[next].click();
}

function onDialogClick(event) {
  if (event.target === dialog) closeProject();
}

function onHashChange() {
  const id = location.hash.replace("#", "");
  if (!id || id === "work") {
    if (dialog.open) dialog.close();
    return;
  }
  if (projects.some((item) => item.id === id)) {
    openProject(id);
  }
}

async function init() {
  showStatus("Loading work.");
  try {
    const response = await fetch("./projects.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Could not load projects.");
    const data = await response.json();
    projects = data.projects || [];
    if (!projects.length) {
      showStatus("No projects to show.");
      return;
    }
    showStatus("");
    renderGrid(projects);
    onHashChange();
  } catch (error) {
    showStatus("Could not load the portfolio data. Read the markdown case studies on GitHub instead.");
    console.error(error);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", onTabClick);
  tab.addEventListener("keydown", onTabKeydown);
});
closeBtn.addEventListener("click", closeProject);
dialog.addEventListener("close", onDialogClose);
dialog.addEventListener("click", onDialogClick);
window.addEventListener("hashchange", onHashChange);

init();
