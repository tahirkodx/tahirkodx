const THUMB = "https://image.thum.io/get/width/1200/crop/750/noanimate/";
const CASE_BASE = "https://github.com/tahirkodx/tahirkodx/blob/main/portfolio/";

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

function thumb(url) {
  return `${THUMB}${url}`;
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
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "card card-lead" : "card";
    button.dataset.id = project.id;
    button.setAttribute("aria-haspopup", "dialog");
    button.innerHTML = `
      <div class="card-media">
        <img src="${thumb(project.previewUrl)}" alt="${escapeHtml(project.name)}" width="1200" height="750" loading="${index === 0 ? "eager" : "lazy"}" />
      </div>
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(project.name)}</h3>
        <p class="card-hook">${escapeHtml(project.hook)}</p>
      </div>
    `;
    button.addEventListener("click", () => openProject(project.id, button));
    grid.append(button);
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
      <figure class="preview-frame">
        <img src="${thumb(project.previewUrl)}" alt="${escapeHtml(project.name)} preview" width="1200" height="750" />
      </figure>
      <h3>${escapeHtml(project.hook)}</h3>
      <p>${escapeHtml(project.body)}</p>
      <ul class="stack-list">${project.stack.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
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
          <img src="${thumb(screen.url)}" alt="${escapeHtml(screen.label)}" width="1200" height="750" loading="lazy" />
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
