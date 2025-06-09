# Mistral-LLM-Ext README

Use Ollama to run Mistral LLM models in Visual Studio Code.

This extension allows you to interact with Mistral LLM models directly from Visual Studio Code, providing a seamless experience for developers and data scientists who want to leverage the power of large language models in their coding environment.

This extension run Mistral models using [Ollama](https://ollama.com/), a tool for running large language models locally. It provides features like code completion, chat interfaces, and custom prompts, making it easier to integrate Mistral's capabilities into your development workflow.

![Mistral LLM Extension](https://github.com/marcoslaranz/llama-Mistral-LLM-Vscode-extension/blob/main/icon.png?raw=true)
![GitHub Repo stars](https://img.shields.io/github/stars/marcoslaranz/llama-Mistral-LLM-Vscode-extension?style=social)
![GitHub forks](https://img.shields.io/github/forks/marcoslaranz/llama-Mistral-LLM-Vscode-extension?style=social)
![GitHub issues](https://img.shields.io/github/issues/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![GitHub pull requests](https://img.shields.io/github/issues-pr/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![GitHub last commit](https://img.shields.io/github/last-commit/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![GitHub contributors](https://img.shields.io/github/contributors/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![GitHub top language](https://img.shields.io/github/languages/top/marcoslaranz/llama-Mistral-LLM-Vscode-extension)



![version](https://img.shields.io/github/v/release/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![license](https://img.shields.io/github/license/marcoslaranz/llama-Mistral-LLM-Vscode-extension)
![vscode](https://img.shields.io/badge/vscode-1.60.0%2B-blue)
![node](https://img.shields.io/badge/node-16.0.0%2B-blue)
![npm](https://img.shields.io/badge/npm-6.0.0%2B-blue)
![ollama](https://img.shields.io/badge/ollama-0.0.0%2B-blue)
![language](https://img.shields.io/badge/language-JavaScript-blue)
![language](https://img.shields.io/badge/language-TypeScript-blue)
![language](https://img.shields.io/badge/language-JSON-blue)
![language](https://img.shields.io/badge/language-HTML-blue)
![language](https://img.shields.io/badge/language-CSS-blue)
![language](https://img.shields.io/badge/language-Markdown-blue)








## Contributing
We welcome contributions to this project! If you have ideas for improvements, bug fixes, or new features, please feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
This extension is built on top of the [Ollama](https://ollama.com/) platform, which provides a powerful and flexible way to run large language models locally. We thank the Ollama team for their work in making this possible.

## Changelog
- **1.0.0**: Initial release of the Mistral LLM Extension for Visual Studio Code.

## Support
If you encounter any issues or have questions about using this extension, please open an issue on the [GitHub repository](https://github.com/marcoslaranz/llama-Mistral-LLM-Vscode-extension)







### One downside 

This may take while to responding depending of your resources of hardware and the size of the model.



## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Changelog](#changelog)
- [Support](#support)
- [Contact](#contact)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Known Issues](#known-issues)



## Features
- **Run Mistral Models**: Execute Mistral models using Ollama directly from VS Code.
- **Code Completion**: Get intelligent code completions powered by Mistral.
- **Chat Interface**: Engage in conversations with the Mistral model, asking questions and receiving responses in real-time.
- **Custom Prompts**: Create and manage custom prompts for specific tasks or queries.
- **Configuration Options**: Easily configure the extension settings to suit your workflow.
## Installation
1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "Mistral LLM Extension".
4. Click on the Install button to install the extension.
5. After installation, reload Visual Studio Code to activate the extension.
## Usage
1. **Open the Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).

**Enjoy!**  

## Requirements

To use this extension, you must have the following installed and configured on your machine:

1. **Ollama**  
   - Download and install Ollama from [https://ollama.com/download](https://ollama.com/download).
   - Start the Ollama service before using the extension.

2. **Mistral Model**  
   - Pull the Mistral model in Ollama by running:
     ```
     ollama pull mistral
     ```

3. **Visual Studio Code**  
   - Make sure you are running a compatible version of VS Code (see `engines.vscode` in `package.json`).

4. **This Extension**  
   - Install this extension from the VS Code Marketplace or from a `.vsix` file.