# motion-guide skills

[English](README.md)

Motion Guide 是一个可安装的 AI agent skill，用来帮助 coding agent 做产品 UI 动效决策。

它不是组件库，也不是动效素材库。它的目标是把「加一点动画」这类模糊需求，转化为清晰的产品判断：什么时候该用动效，什么时候应该减弱动效，什么时候不应该动。它还会约束实现细节，包括时长、缓动、可访问性、减少动态效果、性能、依赖风险和 review 标准。

这个公开仓库只发布可安装的 Motion Guide skill package。托管网页只是辅助浏览和展示的 companion demo，并且不再作为这个公开 skill repo 的源码发布。

## Motion Guide 是什么？

**Motion Guide 是一个可安装的 AI Agent Skill，用于做产品安全的 UI 动效决策。** 它帮助 coding agent 将模糊的动效需求转化为明确建议：使用动效、减弱动效或不使用动效。建议会包含命名动效模式、替代方案、实现约束、可访问性检查、减少动态效果行为、性能护栏和 review 标准。

| 问题 | 答案 |
| --- | --- |
| 它解决什么问题？ | 让 Agent 将动效视为产品决策，而不是只把动画当作装饰。 |
| 适合谁？ | 需要设计、添加、修改、建议或 review UI 动效的开发者和 coding agent。 |
| 包含哪些内容？ | 114 个实用 UI 动效模式、creative motion pack、决策规则、可访问性与性能约束，以及 review 标准。 |
| 会给出哪些结论？ | 根据产品意图、清晰度、可访问性和风险，给出 `use motion`、`reduce motion` 或 `no motion`。 |
| 覆盖哪些动效场景？ | 实用 UI 动效，以及面向 2D、3D、WebGL、shader、粒子、数据和系统可视化的表达性动效。 |
| 它不是什么？ | 它不是组件库，也不是装饰性特效素材库。 |

### 可核验事实

- 当动画会带来延迟、干扰、虚假进度、可访问性风险或产品理解混乱时，Motion Guide 可以建议不使用动效。
- 当适合使用动效时，建议会同时考虑减少动态效果、性能、依赖和实现 review。
- 本仓库发布的是可安装的 skill package；配套网站另行维护，且其应用源码不在该公开仓库中。
- 可使用 `npx skills add JarvixGaby/motion-guide-skill` 安装，或将 `motion-guide/` 软链接到 Codex skills 目录。

## What The Skill Contains

- 114 个实用 UI 动效模式。
- 面向 2D、3D、WebGL、shader、粒子、数据和系统可视化的 creative motion pack。
- 判断什么时候不该加动效的规则。
- 可访问性、减少动态效果、性能和依赖约束。
- 面向 AI 生成前端代码的动效 review 标准。
- 一个用于浏览和比较同一套决策体系的网站：
  - Hosted site: <https://motion-guide.pages.dev/>
  - Install section: <https://motion-guide.pages.dev/#install-the-skill>

托管网站/app 源码与项目存档在其他地方维护，不属于这个公开仓库。

## Install

Install with the open `skills` CLI:

```bash
npx skills add JarvixGaby/motion-guide-skill
```

### With Codex Skills

也可以把 skill 包复制或软链接到 Codex skills 目录：

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/motion-guide" ~/.codex/skills/motion-guide
```

然后重新开启 agent session，让 skill loader 重新发现它。

## Usage

当 agent 需要设计、添加、修改、建议或 review UI 动效时使用 Motion Guide。

示例 prompts:

```text
Use /motion-guide to improve this dashboard loading state.
```

```text
Use /motion-guide to review this PR for fake progress, missing reduced-motion, and unnecessary animation dependencies.
```

```text
Use /motion-guide to choose between skeleton, spinner, and progress bar for this import screen.
```

```text
Use /motion-guide to design a creative WebGL hero motion, but keep it product-intent driven and include a reduced-motion fallback.
```

skill 可能会给出三类判断：

- `use motion`：动效能改善反馈、方向感、加载信心、输入清晰度、onboarding、数据理解、内容揭示或明确的品牌/叙事意图。
- `reduce motion`：更轻的过渡或静态状态更稳妥。
- `no motion`：动画会带来延迟、干扰、虚假进度、可访问性风险或产品理解混乱。

## Repository Structure

- `motion-guide/` - 可安装的 skill 包。
- `motion-guide/SKILL.md` - skill 入口。
- `motion-guide/agents/openai.yaml` - OpenAI/Codex 风格 skill surface 的 UI 元数据。
- `motion-guide/references/` - 完整动效模式参考。

## 常见问题

### Motion Guide 是 UI 组件库吗？

不是。它是产品动效的决策层，帮助 Agent 选择合适的动效模式，或判断减弱动效、完全不动效更合适。

### 什么时候应该使用 Motion Guide？

当需要设计、添加、修改、建议或 review UI 动效时使用，包括加载状态、onboarding、数据可视化和以产品意图为中心的创意动效。

### Motion Guide 是否支持可访问性和减少动态效果？

支持。其决策与实现建议同时覆盖可访问性检查、减少动态效果行为、性能与依赖约束。

### 它会建议不加动画吗？

会。当动画会造成延迟、干扰、虚假进度、可访问性风险或用户理解混乱时，它可以建议 `no motion`。

### Motion Guide 托管网站是否属于这个仓库？

不属于。该公开仓库包含可安装的 Skill 包；托管配套网站及其应用源码由其他位置单独维护。

## License

MIT. See [LICENSE](LICENSE).
