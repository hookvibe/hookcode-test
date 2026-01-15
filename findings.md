# Findings & Decisions
<!-- 
  WHAT: Your knowledge base for the task. Stores everything you discover and decide.
  WHY: Context windows are limited. This file is your "external memory" - persistent and unlimited.
  WHEN: Update after ANY discovery, especially after 2 view/browser/search operations (2-Action Rule).
-->

## Requirements
<!-- 
  WHAT: What the user asked for, broken down into specific requirements.
  WHY: Keeps requirements visible so you don't forget what you're building.
  WHEN: Fill this in during Phase 1 (Requirements & Discovery).
  EXAMPLE:
    - Command-line interface
    - Add tasks
    - List all tasks
    - Delete tasks
    - Python implementation
-->
<!-- Captured from user request -->
- 前端页面：类似 GitHub 的 Issue 系统
- 技术栈：React + TypeScript，类型需要明确
- 设计：简洁、现代
- 仅前端实现，暂不考虑后端
- 页面实现细节与组件组织由我自主决定

## Research Findings
<!-- 
  WHAT: Key discoveries from web searches, documentation reading, or exploration.
  WHY: Multimodal content (images, browser results) doesn't persist. Write it down immediately.
  WHEN: After EVERY 2 view/browser/search operations, update this section (2-Action Rule).
  EXAMPLE:
    - Python's argparse module supports subcommands for clean CLI design
    - JSON module handles file persistence easily
    - Standard pattern: python script.py <command> [args]
-->
<!-- Key discoveries during exploration -->
- Issue 系统可参考数据密集型仪表盘风格：信息分层清晰、对比强、可钻取
- 推荐「Minimal & Direct」与「Soft UI Evolution」风格：强调留白、清晰层级、轻量阴影与可访问性
- 字体搭配建议：Poppins（标题）+ Open Sans（正文），现代专业且可读性好
- 颜色推荐：SaaS 中性蓝（主色 #2563EB，背景 #F8FAFC，文字 #1E293B，边框 #E2E8F0）
- 交互可访问性重点：可见的 focus ring 与 hover 反馈，避免无替代的 outline-none
- React 栈建议：Hooks 须置顶调用；自定义 Hook 必须 use 前缀；组件与相关逻辑就近组织
- 当前仓库为空壳，仅含 README 与规划文件，需自行搭建 React+TS 前端结构

## Technical Decisions
<!-- 
  WHAT: Architecture and implementation choices you've made, with reasoning.
  WHY: You'll forget why you chose a technology or approach. This table preserves that knowledge.
  WHEN: Update whenever you make a significant technical choice.
  EXAMPLE:
    | Use JSON for storage | Simple, human-readable, built-in Python support |
    | argparse with subcommands | Clean CLI: python todo.py add "task" |
-->
<!-- Decisions made with rationale -->
| Decision | Rationale |
|----------|-----------|
| 使用 Vite + React + TS | 轻量、类型清晰、开发体验好 |
| 采用多组件拆分与集中类型定义 | 提升可维护性与复用性 |

## Issues Encountered
<!-- 
  WHAT: Problems you ran into and how you solved them.
  WHY: Similar to errors in task_plan.md, but focused on broader issues (not just code errors).
  WHEN: Document when you encounter blockers or unexpected challenges.
  EXAMPLE:
    | Empty file causes JSONDecodeError | Added explicit empty file check before json.load() |
-->
<!-- Errors and how they were resolved -->
| Issue | Resolution |
|-------|------------|
|       |            |

## Resources
<!-- 
  WHAT: URLs, file paths, API references, documentation links you've found useful.
  WHY: Easy reference for later. Don't lose important links in context.
  WHEN: Add as you discover useful resources.
  EXAMPLE:
    - Python argparse docs: https://docs.python.org/3/library/argparse.html
    - Project structure: src/main.py, src/utils.py
-->
<!-- URLs, file paths, API references -->
<!-- URLs, file paths, API references -->
- README.md

## Visual/Browser Findings
<!-- 
  WHAT: Information you learned from viewing images, PDFs, or browser results.
  WHY: CRITICAL - Visual/multimodal content doesn't persist in context. Must be captured as text.
  WHEN: IMMEDIATELY after viewing images or browser results. Don't wait!
  EXAMPLE:
    - Screenshot shows login form has email and password fields
    - Browser shows API returns JSON with "status" and "data" keys
-->
<!-- CRITICAL: Update after every 2 view/browser operations -->
<!-- Multimodal content must be captured as text immediately -->
- style 搜索结果强调：Minimal & Direct 更适合简洁页面；Soft UI Evolution 适合现代企业应用
- typography 搜索结果提供 Poppins + Open Sans 组合及可用的 Google Fonts 引入方式
- color 搜索结果提供 SaaS 中性蓝配色方案（主/次色与 CTA）
- ux 指南强调 focus/hover 可视反馈与加载态占位
- react 栈指南强调 hooks 规则与组件就近组织

---
<!-- 
  REMINDER: The 2-Action Rule
  After every 2 view/browser/search operations, you MUST update this file.
  This prevents visual information from being lost when context resets.
-->
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
