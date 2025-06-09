import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "mistral-llm-ext" is now active!');


    const mistralChatDisposable = vscode.commands.registerCommand('mistral-ext.llm', () => {

        const panel = vscode.window.createWebviewPanel(
            'MistralChat',
            'Mistral Chat',
            vscode.ViewColumn.One,
            {enableScripts: true}
        );

        // Get the URI for the image in the webview
        const logoUri = panel.webview.asWebviewUri(
            vscode.Uri.joinPath(context.extensionUri, 'media', 'logo.png')
        );

        panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Security-Policy" 
            content="default-src 'none'; 
            img-src ${panel.webview.cspSource} data:; 
            script-src 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; 
            style-src 'unsafe-inline' https://cdnjs.cloudflare.com;">
            <title>Mistral VS Code Extension</title>
            <style>
                body { font-family: sans-serif; margin: 1rem; }
                #prompt { width: 100%; box-sizing: border-box; }
                #response {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    background-color: #f4f4f4;
                    padding: 10px;
                    border-radius: 5px;
                    line-height: 1.6;
                }
                #response pre {
                    background-color: #2d3748;
                    color: #e2e8f0;
                    padding: 1rem;
                    border-radius: 6px;
                    overflow-x: auto;
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                }
                #response code {
                    background-color: #e2e8f0;
                    color: #2d3748;
                    padding: 0.2rem 0.4rem;
                    border-radius: 3px;
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                }
                #response pre code {
                    background-color: transparent;
                    color: inherit;
                    padding: 0;
                }
            </style>
        </head>
        <body>
            <img src="${logoUri}" alt="Logo" style="max-width: 120px; display: block; margin-bottom: 1rem;" />
            <h2>Mistral VS Code Extension</h2>
            <textarea id="prompt" rows="3" placeholder="Ask something..."></textarea><br />
            <button id="askBtn">Ask</button>
            <div id="response"></div>
            <button id="copyAllBtn" style="margin-top: 1rem;">Copy Full Response</button>
            <div id="thinking" style="display:none; margin-top: 1rem; color: #555; font-size: 0.95em;">
              <em>Thinking...</em>
            </div>
            <div style="margin-top: 0.5rem; color: #555; font-size: 0.95em;">
              <strong>Tip:</strong> Click any code block to copy just the code, or use the button above to copy the entire response.
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            <script>
                const vscode = acquireVsCodeApi();
                let thinkingShown = false;
                document.getElementById('askBtn').addEventListener('click', () => {
                    const text = document.getElementById('prompt').value;
                    vscode.postMessage({ command: 'chat', text });
                    // Show thinking indicator immediately
                    document.getElementById('thinking').style.display = 'block';
                    thinkingShown = true;
                });
                window.addEventListener('message', event => {
                    const { command, text } = event.data;
                    if (command === 'chatResponse') {
                        // Hide thinking indicator on first response
                        if (thinkingShown) {
                            document.getElementById('thinking').style.display = 'none';
                            thinkingShown = false;
                        }
                        marked.setOptions({
                            highlight: function(code, lang) {
                                return hljs.highlightAuto(code).value;
                            }
                        });
                        let html = marked.parse(text);
                        document.getElementById("response").innerHTML =  html;
                        document.querySelectorAll('pre code').forEach((el) => {
                            hljs.highlightElement(el);
                            // Make code blocks easily selectable for copy
                            el.style.userSelect = 'all';
                            el.style.cursor = 'pointer';
                            el.title = 'Click to copy code';
                            el.onclick = function(e) {
                                navigator.clipboard.writeText(el.innerText);
                            };
                        });
                    }
                });
                // Copy full response button
                document.getElementById('copyAllBtn').addEventListener('click', () => {
                    const el = document.getElementById('response');
                    if (el) {
                        const temp = document.createElement('textarea');
                        temp.value = el.innerText;
                        document.body.appendChild(temp);
                        temp.select();
                        document.execCommand('copy');
                        document.body.removeChild(temp);
                    }
                });
            </script>
        </body>
        </html>`;


		panel.webview.onDidReceiveMessage(async (message: any) => {
			if(message.command === 'chat'){
                const userPrompt = "Respond in markdown format.\n\n" + message.text;
				let responseText = '';

				try{
					const streamResponse = await ollama.chat({
						model: 'mistral:latest',
						messages: [{ role: 'user', content: userPrompt }],
						stream: true
					});

				for await (const part of streamResponse){
					responseText += part.message.content,
					panel.webview.postMessage({ command: 'chatResponse', text: responseText });
				}

				}catch(err){
					panel.webview.postMessage({ command: 'chatResponse', text: `error: ${String(err)}`});
				}
			}
		});
	});

    context.subscriptions.push(mistralChatDisposable);
	
}


export function deactivate() {}