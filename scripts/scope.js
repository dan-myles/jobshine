#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

// --- Configuration ---
const OLD_SCOPE = "@jobshine";
const NEW_SCOPE = "@jobshine";
const ROOT_DIR = "."; // Start from the current directory
const ALWAYS_EXCLUDED_DIRS = ["node_modules", ".git"]; // Always exclude these top-level dirs
// --- End Configuration ---

const __filename = fileURLToPath(import.meta.url);
const SCRIPT_NAME = path.basename(__filename);

// --- Simplified .gitignore Parsing ---

function parseGitignore(content) {
  const lines = content.split(/\r?\n/);
  const patterns = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      continue; // Skip empty lines and comments
    }
    patterns.push(trimmed);
  }
  return patterns;
}

// --- Simplified Ignore Check ---

function isIgnored(relativePath, ignorePatterns, isDirectory) {
  // Normalize path separators for comparison
  const normalizedPath = relativePath.replace(/\\/g, "/");

  for (const pattern of ignorePatterns) {
    let patternToCheck = pattern;
    let matchSubDirs = false;

    // Handle directory patterns (ending with /)
    if (pattern.endsWith("/")) {
      patternToCheck = pattern.slice(0, -1);
      matchSubDirs = true;
    }

    // 1. Exact match
    if (normalizedPath === patternToCheck) {
      return true;
    }

    // 2. Directory match (pattern applies to directory and its contents)
    if (matchSubDirs && normalizedPath.startsWith(patternToCheck + "/")) {
      return true;
    }

    // 3. If it's a directory pattern, but the item is a file inside it
    //    (This case is covered by #2, but explicit check might be clearer)
    // if (matchSubDirs && isDirectory && normalizedPath === patternToCheck) {
    //     return true;
    // }

    // 4. Simple wildcard match at the end (e.g., *.log)
    if (
      patternToCheck.startsWith("*.") &&
      normalizedPath.endsWith(patternToCheck.substring(1))
    ) {
      return true;
    }

    // 5. Simple wildcard match for directory contents (e.g., build/*)
    //    This is a basic check, doesn't handle complex globs
    if (patternToCheck.endsWith("/*")) {
      const baseDir = patternToCheck.slice(0, -2);
      if (normalizedPath.startsWith(baseDir + "/")) {
        // Check if it's directly inside, not in a sub-sub-directory
        // This simplified check might incorrectly ignore deeper files if
        // the pattern was meant to be recursive (`/**/`)
        if (
          normalizedPath.split("/").length ===
          baseDir.split("/").length + 1
        ) {
          return true;
        }
      }
    }

    // Note: Many other .gitignore features are NOT handled here (negation, **, etc.)
  }
  return false;
}

// --- File Processing Logic ---

// Helper to check for binary files (simple heuristic)
function isLikelyBinary(buffer) {
  // Check for NULL bytes within the first 1024 bytes
  const sample = buffer.slice(0, 1024);
  return sample.includes(0);
}

async function processDirectory(dirPath, ignorePatterns) {
  let items;
  try {
    items = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (err) {
    if (err.code === "EACCES" || err.code === "EPERM") {
      console.warn(`Skipping inaccessible directory: ${dirPath}`);
      return 0;
    }
    console.error(`Error reading directory ${dirPath}:`, err);
    return 0;
  }

  let changesInDir = 0;

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.relative(ROOT_DIR, fullPath);

    // Check against always excluded dirs first (more efficient)
    if (
      ALWAYS_EXCLUDED_DIRS.some((excluded) => relativePath.startsWith(excluded))
    ) {
      // console.log(`Skipping always excluded: ${relativePath}`);
      continue;
    }

    // Check against .gitignore patterns
    if (isIgnored(relativePath, ignorePatterns, item.isDirectory())) {
      // console.log(`Skipping gitignored: ${relativePath}`);
      continue;
    }

    if (item.isDirectory()) {
      changesInDir += await processDirectory(fullPath, ignorePatterns);
    } else if (item.isFile()) {
      // Skip the script itself
      if (fullPath === __filename) {
        continue;
      }

      try {
        const buffer = await fs.readFile(fullPath);

        if (isLikelyBinary(buffer)) {
          // console.log(`Skipping likely binary file: ${relativePath}`);
          continue;
        }

        const content = buffer.toString("utf8");

        if (content.includes(OLD_SCOPE)) {
          const newContent = content.replaceAll(OLD_SCOPE, NEW_SCOPE);
          if (newContent !== content) {
            await fs.writeFile(fullPath, newContent, "utf8");
            console.log(`Modified: ${relativePath}`);
            changesInDir++;
          }
        }
      } catch (err) {
        if (err.code === "EACCES" || err.code === "EPERM") {
          console.warn(`Skipping inaccessible file: ${fullPath}`);
        } else if (err.code === "ENOENT") {
          console.warn(`Skipping file that disappeared: ${fullPath}`);
        } else {
          console.error(`Error processing file ${fullPath}:`, err);
        }
      }
    }
    // Ignore other types like symlinks
  }
  return changesInDir;
}

// --- Main Execution ---

async function run() {
  console.log(`Starting replacement of "${OLD_SCOPE}" with "${NEW_SCOPE}"...`);
  console.log(
    `Excluding: ${ALWAYS_EXCLUDED_DIRS.join(", ")} and attempting to respect .gitignore (simplified).`,
  );
  console.log("---");

  let ignorePatterns = [];
  const gitignorePath = path.join(ROOT_DIR, ".gitignore");
  try {
    const gitignoreContent = await fs.readFile(gitignorePath, "utf8");
    ignorePatterns = parseGitignore(gitignoreContent);
    console.log(
      `Loaded ${ignorePatterns.length} patterns from .gitignore (using simplified parsing).`,
    );
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No .gitignore file found, proceeding without it.");
    } else {
      console.error("Error reading .gitignore:", err);
    }
  }

  const startTime = Date.now();
  let totalChanges = 0;
  try {
    totalChanges = await processDirectory(ROOT_DIR, ignorePatterns);
  } catch (error) {
    console.error("\nAn unexpected error occurred during processing:", error);
  } finally {
    const duration = (Date.now() - startTime) / 1000;
    console.log("---");
    console.log(`Replacement complete in ${duration.toFixed(2)} seconds.`);
    console.log(`Total files modified: ${totalChanges}`);
  }
}

// --- Safety Check ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.warn("\n🚨 WARNING! This script will modify files in place. 🚨");
console.warn(
  `It will replace all occurrences of "${OLD_SCOPE}" with "${NEW_SCOPE}".`,
);
console.warn(
  "It uses SIMPLIFIED .gitignore parsing - double-check exclusions!",
);
console.warn("It is highly recommended to commit your changes before running.");
rl.question("Are you sure you want to continue? (yes/no): ", (answer) => {
  if (answer.toLowerCase() === "yes") {
    run();
  } else {
    console.log("Operation cancelled.");
  }
  rl.close();
});
