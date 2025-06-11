import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import ollama from 'ollama';

suite('Mistral LLM Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('marcoslara.mistral-llm-ext'));
    });

    test('Should activate', async () => {
        const ext = vscode.extensions.getExtension('marcoslara.mistral-llm-ext');
        await ext?.activate();
        assert.strictEqual(ext?.isActive, true);
    });

    test('Should register mistral-ext.llm command', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('mistral-ext.llm'));
    });

    test('Should create webview panel when command is executed', async () => {
        // Mock the createWebviewPanel function
        const mockPanel = {
            webview: {
                html: '',
                onDidReceiveMessage: sandbox.stub(),
                postMessage: sandbox.stub(),
                asWebviewUri: sandbox.stub().returns(vscode.Uri.parse('mock-uri'))
            },
            dispose: sandbox.stub()
        };

        const createWebviewPanelStub = sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);

        // Execute the command
        await vscode.commands.executeCommand('mistral-ext.llm');

        // Verify the panel was created with correct parameters
        assert.ok(createWebviewPanelStub.calledOnce);
        const callArgs = createWebviewPanelStub.firstCall.args;
        assert.strictEqual(callArgs[0], 'MistralChat');
        assert.strictEqual(callArgs[1], 'Mistral Chat');
        assert.strictEqual(callArgs[2], vscode.ViewColumn.One);
        assert.deepStrictEqual(callArgs[3], { enableScripts: true });
    });

    test('Webview HTML should contain required elements', async () => {
        const mockPanel = {
            webview: {
                html: '',
                onDidReceiveMessage: sandbox.stub(),
                postMessage: sandbox.stub(),
                asWebviewUri: sandbox.stub().returns(vscode.Uri.parse('mock-uri'))
            },
            dispose: sandbox.stub()
        };

        sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);

        await vscode.commands.executeCommand('mistral-ext.llm');

        // Verify the HTML content
        const html = mockPanel.webview.html;
        assert.ok(html.includes('<!DOCTYPE html>'));
        assert.ok(html.includes('<textarea id="prompt"'));
        assert.ok(html.includes('<button id="askBtn"'));
        assert.ok(html.includes('<div id="response"'));
        assert.ok(html.includes('highlight.js'));
        assert.ok(html.includes('marked.min.js'));
    });

    test('Should handle chat messages', async () => {
        const mockPanel = {
            webview: {
                html: '',
                onDidReceiveMessage: sandbox.stub(),
                postMessage: sandbox.stub(),
                asWebviewUri: sandbox.stub().returns(vscode.Uri.parse('mock-uri'))
            },
            dispose: sandbox.stub()
        };

        sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);

        await vscode.commands.executeCommand('mistral-ext.llm');

        // Simulate receiving a chat message
        const messageHandler = mockPanel.webview.onDidReceiveMessage.firstCall.args[0];
        const testMessage = { command: 'chat', text: 'Hello, Mistral!' };
        
        // Mock the Ollama response
        const mockOllamaResponse = {
            message: { content: 'Hello! How can I help you?' }
        };
        
        sandbox.stub(ollama, 'chat').returns({
            stream: true,
            messages: [{ role: 'user', content: 'Hello, Mistral!' }],
            [Symbol.asyncIterator]: async function* () {
                yield mockOllamaResponse;
            }
        } as any);

        await messageHandler(testMessage);

        // Verify the response was sent back to the webview
        assert.ok(mockPanel.webview.postMessage.called);
        const responseMessage = mockPanel.webview.postMessage.firstCall.args[0];
        assert.strictEqual(responseMessage.command, 'chatResponse');
        assert.ok(responseMessage.text.includes('Hello! How can I help you?'));
    });

    test('Should handle errors gracefully', async () => {
        const mockPanel = {
            webview: {
                html: '',
                onDidReceiveMessage: sandbox.stub(),
                postMessage: sandbox.stub(),
                asWebviewUri: sandbox.stub().returns(vscode.Uri.parse('mock-uri'))
            },
            dispose: sandbox.stub()
        };

        sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);

        await vscode.commands.executeCommand('mistral-ext.llm');

        // Simulate an error in the Ollama response
        const messageHandler = mockPanel.webview.onDidReceiveMessage.firstCall.args[0];
        const testMessage = { command: 'chat', text: 'Hello, Mistral!' };
        
        // Mock the Ollama chat to reject with an error
        const testError = new Error('Test error');
        sandbox.stub(ollama, 'chat').rejects(testError);

        // Execute the message handler and wait for it to complete
        await messageHandler(testMessage);

        // Wait a bit to ensure the error message is processed
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify error message was sent to webview
        assert.ok(mockPanel.webview.postMessage.called);
        const responseMessage = mockPanel.webview.postMessage.firstCall.args[0];
        assert.strictEqual(responseMessage.command, 'chatResponse');
        assert.strictEqual(responseMessage.text, `error: Error: Test error`);
    });
}); 