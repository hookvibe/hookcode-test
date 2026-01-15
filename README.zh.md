> test [hookcode][hookcode]

# HookCode Issue System（前端）

这是一个简洁现代、类似 GitHub 的 Issue 系统前端页面，基于 React + TypeScript 构建。当前仅实现前端展示与交互，便于后续接入真实接口。

- 支持浅色 / 深色 / 跟随系统主题
- 支持中英文切换
- 类型清晰、数据结构完整，便于扩展

## 技术栈

- React 18
- TypeScript
- Vite

## 目录结构

- `src/App.tsx`：页面组合与状态管理
- `src/components/`：UI 组件（头部、侧边栏、列表、详情）
- `src/data/issues.ts`：模拟 Issue 数据
- `src/i18n.tsx`：多语言文案与工具
- `src/styles.css`：主题变量与页面样式

## 运行（可选）

```bash
npm install
npm run dev
```

---

English version: [README.md][readme-en]

[readme-en]: README.md
[hookcode]: https://github.com/hookvibe/hookcode
