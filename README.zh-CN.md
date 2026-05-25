# motion-guide skills

[English](README.md)

Motion Guide 是一个可安装的 AI agent skill，用来帮助 coding agent 做产品 UI 动效决策。

它不是组件库，也不是动效素材库。它的目标是把「加一点动画」这类模糊需求，转化为清晰的产品判断：什么时候该用动效，什么时候应该减弱动效，什么时候不应该动。它还会约束实现细节，包括时长、缓动、可访问性、减少动态效果、性能、依赖风险和 review 标准。

这个公开仓库只发布可安装的 Motion Guide skill package。托管网页只是辅助浏览和展示的 companion demo，并且不再作为这个公开 skill repo 的源码发布。

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

## License

MIT. See [LICENSE](LICENSE).
