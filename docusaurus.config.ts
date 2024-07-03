import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import site_config from "./docs/.config/site-config.json";

import "dotenv/config";

const config: Config = {
  title: site_config.title,
  tagline: site_config.tagline,
  favicon: "img/favicon.ico",
  trailingSlash: true,
  url: site_config.url,
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      logo: site_config.logo,
      items: [
        {
          href: site_config.repo,
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "csharp",
        "java",
        "json",
        "php",
        "protobuf",
      ],
    },
    docs: {
      sidebar: {
        hideable: true, // https://docusaurus.io/docs/sidebar#hideable-sidebar
      },
    },
  } satisfies Preset.ThemeConfig,
};

if (process.env.TYPESENSE_ENABLED === "true") {
  if (!config.themes) config.themes = [];
  config.themes.push("docusaurus-theme-search-typesense");
  if (!config.themeConfig) config.themeConfig = {};
  config.themeConfig.typesense = {
    typesenseCollectionName: process.env.TYPESENSE_COLLECTION_NAME,
    typesenseServerConfig: {
      nodes: [
        {
          host: process.env.TYPESENSE_SERVER_HOST,
          port: 443,
          protocol: "https",
        },
      ],
      apiKey: process.env.TYPESENSE_SEARCH_ONLY_APIKEY,
    },
    typesenseSearchParameters: {},
    contextualSearch: true,
  };
}

export default config;
