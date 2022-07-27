import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "想走过亚洲的熊",
  description: "Just playing around",

  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.jpg",
    author: "想走过亚洲的熊",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    catalogTitle: "标题目录",
    autoSetCategory: true, // 自动设置分类
    // autoAddCategoryToNavbar: true, // 自动将首页、分类和标签添加至头部导航条
    lastUpdatedText: "上次更新时间",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme", "pyquery"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
      "/docs/html5/": [
        {
          text: "文章导航",
          children: ["indexd", "ha"],
        },
      ],
    },
    navbar: [
      { text: "指南", link: "/docs/guide" },
      { text: "分类", link: "/categories/html5/1/" },
      { text: "标签", link: "/tags/html5/1/" },
      {
        text: "HTML5",
        children: [
          { text: "第一", link: "/docs/html5/indexd" },
          { text: "哈哈链接", link: "/blogs/html5/haha.md" },
        ],
      },
      {
        text: "CSS3",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "JavaScript",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "TypeScript",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "Vue",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "React",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "Python",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "算法",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
    ],
    bulletin: {},
  }),
});
