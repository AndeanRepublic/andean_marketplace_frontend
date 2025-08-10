// generar-typography-css.js
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readJsonFile(filePath) {
  try {
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return null;
  }
}

function getValuesByTextStyle() {
  // Leer el archivo
  const textTokensPath = join(__dirname, "text-style.json");
  const data = readJsonFile(textTokensPath);

  // Crear el diccionario
  const result = {};

  data.variables.forEach((variable) => {
    const id = variable.id;
    result[id] = {};

    // Usamos resolvedValuesByMode para obtener el valor final (resuelto)
    const resolved = variable.resolvedValuesByMode;
    for (const modeId in resolved) {
      result[id][modeId] = resolved[modeId].resolvedValue;
    }
  });

  return result;
}

function generateTypographyCSS(textTokens) {
  const tbQuery = "@media (min-width: var(--breakpoint-tb))";
  const dkQuery = "@media (min-width: var(--breakpoint-dk))";

  let cssOutput = `/* Typography tokens generados automáticamente */\n\n`;

  const variables = textTokens.variables || [];
  const valuesTextStyle = getValuesByTextStyle();
  const stylesByClass = {};

  variables.forEach((variable) => {
    const nameParts = variable.name.split("/");
    if (nameParts.length < 2) return;

    const category = nameParts[0];
    const subCategory = nameParts[1];
    const subCategoryX = subCategory.replace(/[()]/g, "");
    const propName = nameParts[2] || "";
    const className = `${subCategoryX}`.toLowerCase().replace(/\s+/g, "-");

    if (!stylesByClass[className]) stylesByClass[className] = {};

    const extractValue = (id, mode) => {
      if (!valuesTextStyle[id]) return null;
      if (!valuesTextStyle[id][mode]) return null;
      return valuesTextStyle[id][mode];
    };

    for (const [mode, label] of Object.entries({
      base: "77:6", // mobile
      tb: "77:5", // tablet
      dk: "77:1", // desktop
    })) {
      const val = extractValue(
        variable["resolvedValuesByMode"]["77:7"]["alias"],
        label,
      );

      if (!val) continue;

      if (!stylesByClass[className][mode]) {
        stylesByClass[className][mode] = {};
      }

      let cssKey = null;

      if (propName.includes("Font Size")) cssKey = "font-size";
      else if (propName.includes("Line Height")) cssKey = "line-height";
      else if (propName.includes("Font Family")) {
        stylesByClass[className][mode]["font-family"] =
          `"Plus Jakarta Sans", sans-serif`;
      } else if (propName.includes("Letter Spacing")) cssKey = "letter-spacing";
      else if (propName.includes("Paragraph Spacing")) cssKey = "margin-bottom";
      else if (propName.includes("Font Style")) {
        if (val === "Regular")
          stylesByClass[className][mode]["font-weight"] = 400;
        else if (val === "Medium")
          stylesByClass[className][mode]["font-weight"] = 500;
        else if (val === "SemiBold")
          stylesByClass[className][mode]["font-weight"] = 600;
        else if (val === "Bold")
          stylesByClass[className][mode]["font-weight"] = 700;
        else {
          stylesByClass[className][mode]["font-style"] = val.toLowerCase();
        }
      }

      if (cssKey) {
        stylesByClass[className][mode][cssKey] =
          typeof val === "number" ? `${val}px` : val;
      }
    }
  });

  // Construcción del CSS
  for (const [className, breakpoints] of Object.entries(stylesByClass)) {
    // Base (mobile)
    if (breakpoints.base) {
      cssOutput += `.${className} {\n`;
      for (const [prop, val] of Object.entries(breakpoints.base)) {
        cssOutput += `  ${prop}: ${val};\n`;
      }
      cssOutput += `}\n\n`;
    }

    // Tablet
    if (breakpoints.tb) {
      cssOutput += `${tbQuery} {\n  .${className} {\n`;
      for (const [prop, val] of Object.entries(breakpoints.tb)) {
        cssOutput += `    ${prop}: ${val};\n`;
      }
      cssOutput += `  }\n}\n\n`;
    }

    // Desktop
    if (breakpoints.dk) {
      cssOutput += `${dkQuery} {\n  .${className} {\n`;
      for (const [prop, val] of Object.entries(breakpoints.dk)) {
        cssOutput += `    ${prop}: ${val};\n`;
      }
      cssOutput += `  }\n}\n\n`;
    }
  }

  return cssOutput;
}

function main() {
  const textTokensPath = join(__dirname, "text-tokens.json");
  const textTokens = readJsonFile(textTokensPath);

  if (textTokens) {
    const result = generateTypographyCSS(textTokens);
    writeFileSync(join(__dirname, "typography.css"), result);
    console.log("✅ Archivo generado: typography.css (CSS puro)");
  }
}

main();
