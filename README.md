# xplore

每天一点值得保留的好奇心。

网站：[xplore](https://shuruws.github.io/xplore/) · [RSS](https://shuruws.github.io/xplore/feed.xml)

```sh
npm run build
npm run check
npm run dev
```

本地预览：http://127.0.0.1:43187

- `content/projects.json`：已核验的初始收录。
- `content/candidates.json`：每日挖掘候选，发布前核验。
- `dist/`：A/B/C 三种布局 Demo、RSS 样本；邮箱不保存、不发信。
- `docs/PRD.md`、`docs/adr/`：产品边界与决策。

推送网站文件或正式内容到 `main` 后，GitHub Actions 会构建、检查并部署 `dist/` 到 GitHub Pages；也可手动运行部署。仅修改候选库不会触发部署，候选不会进入网站。

构建时可用 `SITE_URL` 设置站点地址，默认使用上面的 GitHub Pages 地址。邮件订阅仍为流程演示。

视觉参考：[The Outer Loop](https://github.com/Shuruws/the-outer-loop)，仅参考配色与字体，不修改原仓库。
