const states = [
  { id: "idle", title: "闲置", english: "Idle", row: 0, frames: 6, ms: 500, updated: true,
    description: "呼吸 → 半眨眼 → 完整闭眼并低头 → 轻微皱眉 → 低头看手机 → 恢复。",
    note: "v3 优化：表情与头肩动作更丰富，同时保持双脚、人物比例和道具位置稳定。" },
  { id: "running-right", title: "向右跑", english: "Run Right", row: 1, frames: 8, ms: 120,
    description: "向屏幕右侧的完整交替步态与道具滞后。", note: "沿用当前已通过版本。" },
  { id: "running-left", title: "向左跑", english: "Run Left", row: 2, frames: 8, ms: 120,
    description: "向屏幕左侧奔跑，烟雾始终从烟头连续产生。", note: "沿用当前已通过版本。" },
  { id: "waving", title: "挥手", english: "Waving", row: 3, frames: 4, ms: 230,
    description: "抬手、外摆、回落并自然闭环。", note: "沿用当前已通过版本。" },
  { id: "jumping", title: "跳跃", english: "Jumping", row: 4, frames: 5, ms: 175, updated: true,
    description: "下蹲蓄力 → 起跳 → 腾空顶点 → 下落 → 落地缓冲。",
    note: "v3 优化：五帧统一使用 1.4× 共享比例、骨盆锚点 x=96；不再进入跳跃时突然缩小。" },
  { id: "failed", title: "失败 / 不适", english: "Failed", row: 5, frames: 8, ms: 235,
    description: "烟雾增大、眯眼后缩、咳呛、挥手驱烟并恢复。", note: "沿用当前已通过版本。" },
  { id: "waiting", title: "等待", english: "Waiting", row: 6, frames: 6, ms: 330,
    description: "等待批准或输入时的视线、头肩与重心变化。", note: "沿用当前已通过版本。" },
  { id: "running", title: "工作中", english: "Working", row: 7, frames: 6, ms: 250,
    description: "专注处理任务时的观察、思考和手机操作。", note: "沿用当前已通过版本。" },
  { id: "review", title: "审核", english: "Review", row: 8, frames: 6, ms: 300,
    description: "检查输出时的低头、抬头、皱眉与确认动作。", note: "沿用当前已通过版本。" }
];

const stageImage = document.querySelector("#stageImage");
const stateTitle = document.querySelector("#stateTitle");
const stateMeta = document.querySelector("#stateMeta");
const stateDescription = document.querySelector("#stateDescription");
const reviewNote = document.querySelector("#reviewNote");
const stateGrid = document.querySelector("#stateGrid");
const timeline = document.querySelector("#timeline");
const playButton = document.querySelector("#playButton");
const speedSelect = document.querySelector("#speedSelect");

let selected = states[0];
let frame = 0;
let timer = null;
let playing = true;

const framePath = (state, index) => `../frames-final/${state.id}/${String(index).padStart(2, "0")}.png`;

function renderCards() {
  stateGrid.innerHTML = "";
  states.forEach((state) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `state-card${state.id === selected.id ? " active" : ""}`;
    button.innerHTML = `
      <div>
        <h3>${state.title}</h3>
        <p>${state.english}<br>Row ${state.row} · ${state.frames} frames</p>
        <span class="badge ${state.updated ? "updated" : ""}">${state.updated ? "v3 已优化" : "已保留"}</span>
      </div>
      <span class="thumb"><img src="${framePath(state, 0)}" alt="${state.title}缩略图"></span>`;
    button.addEventListener("click", () => selectState(state));
    stateGrid.appendChild(button);
  });
}

function renderTimeline() {
  timeline.innerHTML = "";
  for (let index = 0; index < selected.frames; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `frame-button${index === frame ? " active" : ""}`;
    button.innerHTML = `<img src="${framePath(selected, index)}" alt="第 ${index + 1} 帧"><span>${index + 1}</span>`;
    button.addEventListener("click", () => {
      frame = index;
      updateStage();
      renderTimeline();
    });
    timeline.appendChild(button);
  }
}

function updateStage() {
  stageImage.src = framePath(selected, frame);
  stateTitle.textContent = selected.title;
  stateMeta.textContent = `Row ${selected.row} · ${selected.frames} frames · frame ${frame + 1}`;
  stateDescription.textContent = selected.description;
  reviewNote.textContent = selected.note;
}

function schedule() {
  clearInterval(timer);
  if (!playing) return;
  const multiplier = Number(speedSelect.value);
  timer = setInterval(() => {
    frame = (frame + 1) % selected.frames;
    updateStage();
    renderTimeline();
  }, selected.ms * multiplier);
}

function selectState(state) {
  selected = state;
  frame = 0;
  renderCards();
  renderTimeline();
  updateStage();
  schedule();
}

playButton.addEventListener("click", () => {
  playing = !playing;
  playButton.textContent = playing ? "Ⅱ  暂停" : "▶  播放";
  schedule();
});

speedSelect.addEventListener("change", schedule);

renderCards();
renderTimeline();
updateStage();
schedule();
