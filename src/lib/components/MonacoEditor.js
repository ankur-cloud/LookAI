import loader from "@monaco-editor/loader";
import { API_BASE_URL } from "../api";
import { Icons } from "../icons";


function getFileLanguage(fileType) {
  const fileTypeToLanguage = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    css: "css",
    py: "python",
    java: "java",
    rb: "ruby",
    php: "php",
    cpp: "c++",
    c: "c",
    swift: "swift",
    kt: "kotlin",
    json: "json",
    xml: "xml",
    sql: "sql",
    sh: "shell",
  };
  const language = fileTypeToLanguage[fileType.toLowerCase()];
  return language;
}


const getTheme = () => {
  const theme = localStorage.getItem("mode-watcher-mode");
  return theme === "light" ? "vs-light" : "vs-dark";
};

export async function initializeMonaco() {
  const monacoEditor = await import("monaco-editor");
  loader.config({ monaco: monacoEditor.default });
  return loader.init();
}

export async function initializeEditorRef(monaco, container) {
  const editor = monaco.editor.create(container, {
    theme: getTheme(),
    readOnly: false,
    automaticLayout: true,
  });
  return editor;
}


export async function saveFile(editor,models) {
  const projectName = localStorage.getItem("selectedProject");
  try {
    editor.onDidChangeModelContent(async () => {
      const model = editor.getModel();
      if (model) {
        let filename = null;
        for (let modelName in models) {
          console.log('modelName:',modelName);
          if (models[modelName] === model) {
              filename = modelName
              break; // Exit the loop once the model is found
          }
        }
        console.log('filename:', filename);
        // console.log('models:', models);
        // console.log('model:', model);
        // console.log('editor',editor)
        const code = model.getValue();
        console.log('before saveFile code:',code);

        // Replace this with your actual save API endpoint or local storage mechanism
        const response = await fetch(`${API_BASE_URL}/api/save_file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename, code, projectName }),
        });

        console.log('after saveFile', response, response.ok);

        if (!response.ok) {
          throw new Error(`Failed to save file: ${response.statusText}`);
        }
        console.log("File saved successfully");
      }
    });
  } catch (error) {
    console.error("Error saving file:", error);
  }
}

export function createModel(monaco, file) {
  const model = monaco.editor.createModel(
    file.code,
    getFileLanguage(file.file.split(".").pop()),
  );
  return model;
}

export function disposeEditor(editor) {
  if (editor) editor.dispose();
}

export function enableTabSwitching(editor, models, tabContainer) {
  tabContainer.innerHTML = "";
  Object.keys(models).forEach((filename, index) => {
    const tabElement = document.createElement("div");
    tabElement.textContent = filename.split("/").pop();
    tabElement.className =
      "tab p-2 me-2 rounded-lg text-sm cursor-pointer hover:bg-secondary text-primary whitespace-nowrap";
    tabElement.setAttribute("data-filename", filename);
    tabElement.addEventListener("click", () =>
      switchTab(editor, models, filename, tabElement),
    );
    if (index === Object.keys(models).length - 1) {
      tabElement.classList.add("bg-secondary");
    }
    tabContainer.appendChild(tabElement);
  });
}

function switchTab(editor, models, filename, tabElement) {
  Object.entries(models).forEach(([file, model]) => {
    if (file === filename) {
      editor.setModel(model);
    }
  });

  const allTabElements = tabElement?.parentElement?.children;
  for (let i = 0; i < allTabElements?.length; i++) {
    allTabElements[i].classList.remove("bg-secondary");
  }

  tabElement.classList.add("bg-secondary");
}

export function sidebar(editor, models, sidebarContainer) {
  sidebarContainer.innerHTML = "";
  const createSidebarElement = (filename, isFolder) => {
    const sidebarElement = document.createElement("div");
    sidebarElement.classList.add("mx-3", "p-1", "px-2", "cursor-pointer");
    if (isFolder) {
      sidebarElement.innerHTML = `<p class="flex items-center gap-2">${Icons.Folder}${" "}${filename}</p>`;
      // TODO implement folder collapse/expand to the element sidebarElement
    } else {
      sidebarElement.innerHTML = `<p class="flex items-center gap-2">${Icons.File}${" "}${filename}</p>`;
    }
    return sidebarElement;
  };

  const changeTabColor = (index) => {
    const allTabElements =
      document.querySelectorAll("#tabContainer")[0].children;
    for (let i = 0; i < allTabElements?.length; i++) {
      allTabElements[i].classList.remove("bg-secondary");
    }
    allTabElements[index].classList.add("bg-secondary");
  };

  const folders = {};

  Object.entries(models).forEach(([filename, model], modelIndex) => {
    const parts = filename.split("/");
    let currentFolder = sidebarContainer;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        const fileElement = createSidebarElement(part, false);
        fileElement.addEventListener("click", () => {
          editor.setModel(model);
          changeTabColor(modelIndex);
        });
        currentFolder.appendChild(fileElement);
      } else {
        const folderName = part;
        if (!folders[folderName]) {
          const folderElement = createSidebarElement(part, true);
          currentFolder.appendChild(folderElement);
          folders[folderName] = folderElement;
          currentFolder = folderElement;
        } else {
          currentFolder = folders[folderName];
        }
      }
    });
  });
}
