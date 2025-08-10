// generar-spacing-css.js
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonPath = join(__dirname, "spacing.json");
const data = JSON.parse(readFileSync(jsonPath, "utf-8"));
const variables = data.variables;

const propertyTemplates = [
  { name: "m", cssProp: "margin" },
  { name: "mx", cssProp: ["margin-left", "margin-right"] },
  { name: "my", cssProp: ["margin-top", "margin-bottom"] },
  { name: "p", cssProp: "padding" },
  { name: "px", cssProp: ["padding-left", "padding-right"] },
  { name: "py", cssProp: ["padding-top", "padding-bottom"] },
  { name: "gap", cssProp: "gap" },
  { name: "gap-x", cssProp: "column-gap" },
  { name: "gap-y", cssProp: "row-gap" },
];

// Variables para media queries
const tbQuery = "@media (min-width: var(--breakpoint-tb))";
const dkQuery = "@media (min-width: var(--breakpoint-dk))";

let cssOutput = `/* Archivo generado automáticamente */\n\n`;

variables.forEach((variable) => {
  const id = variable.name.replace("Spacing ", "spacing-");
  const values = variable.valuesByMode;

  const base = values["77:10"] || 0;
  const tb = values["77:9"] || 0;
  const dk = values["77:8"] || 0;

  propertyTemplates.forEach(({ name, cssProp }) => {
    const className = `.${name}-${id}`;
    const baseRules = Array.isArray(cssProp)
      ? cssProp.map((prop) => `  ${prop}: ${base}px;`).join("\n")
      : `  ${cssProp}: ${base}px;`;

    const tbRules = Array.isArray(cssProp)
      ? cssProp.map((prop) => `  ${prop}: ${tb}px;`).join("\n")
      : `  ${cssProp}: ${tb}px;`;

    const dkRules = Array.isArray(cssProp)
      ? cssProp.map((prop) => `  ${prop}: ${dk}px;`).join("\n")
      : `  ${cssProp}: ${dk}px;`;

    // Clase base
    cssOutput += `${className} {\n${baseRules}\n}\n\n`;

    // Tablet
    cssOutput += `${tbQuery} {\n  ${className} {\n${tbRules}\n  }\n}\n\n`;

    // Desktop
    cssOutput += `${dkQuery} {\n  ${className} {\n${dkRules}\n  }\n}\n\n`;
  });
});

writeFileSync(join(__dirname, "spacing-tokens.css"), cssOutput);
console.log(
  "✅ Archivo spacing-tokens.css generado en CSS puro con media queries.",
);
