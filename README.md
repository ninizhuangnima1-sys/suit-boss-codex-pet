# 峰哥 — Codex Animated Pet

Suit Boss is a polished 3D-toy-style animated pet for the Codex desktop app: a mature businessman in a navy suit with an orange phone, black briefcase, cigarette, and continuously animated smoke.

![Suit Boss idle](preview/frames-final/idle/00.png)
![Suit Boss jump](preview/frames-final/jumping/02.png)

## Highlights

- Codex pet atlas v2: `8 × 11` cells, `1536 × 2288`, RGBA WebP.
- Nine standard animation states and sixteen look directions.
- Expressive idle loop with breathing, blinking, brow movement, chin dip, and phone glance.
- Full-scale five-frame jump loop without character-size popping.
- Directional running smoke stays attached to the cigarette and changes shape every frame.
- Failure state includes a larger choking plume and a readable discomfort reaction.

## Interactive preview

Open the [State Viewer](preview/viewer/index.html) locally, or use the GitHub Pages link in the repository description after Pages finishes deploying.

The viewer supports all nine standard states, pause/play, playback speed, and frame-by-frame inspection.

## Install in Codex

1. Download or clone this repository.
2. Create `%USERPROFILE%\.codex\pets\suit-boss` if it does not exist.
3. Copy `spritesheet.webp` and `pet.json` into that directory.
4. Restart Codex or dismiss and re-awaken the pet if the previous atlas is cached.

Expected package:

```text
%USERPROFILE%\.codex\pets\suit-boss\
├── pet.json
└── spritesheet.webp
```

## Animation layout

| Row | State | Frames |
|---:|---|---:|
| 0 | Idle | 6 + neutral |
| 1 | Run right | 8 |
| 2 | Run left | 8 |
| 3 | Waving | 4 |
| 4 | Jumping | 5 |
| 5 | Failed / discomfort | 8 |
| 6 | Waiting | 6 |
| 7 | Working | 6 |
| 8 | Review | 6 |
| 9–10 | Look directions | 16 |

## Validation

- `spriteVersionNumber: 2`
- WebP RGBA
- `1536 × 2288`
- Transparent RGB residue: `0`
- Final atlas SHA-256: `9EF2BB2F6400F13DBBF59955A4B9F99EA749EDF561DE666F54420B119054E43C`

## 中文说明

Suit Boss 是为 Codex 桌面应用制作的 v2 动态宠物。仓库只包含最终宠物包和动作预览，不包含人物参考照片、生成提示词、制作草稿或本机路径信息。

> No license is granted by public repository visibility alone. Add an explicit license before redistributing or reusing the artwork outside personal evaluation.
