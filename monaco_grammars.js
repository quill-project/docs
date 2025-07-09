
window.editors = [];
window.wireEditorGrammars = () => {};

import { Registry } from 'https://cdn.jsdelivr.net/npm/monaco-textmate@3.0.1/+esm'
import { wireTmGrammars } from 'https://cdn.jsdelivr.net/npm/monaco-editor-textmate@4.0.0/+esm'
import onigasm from 'https://cdn.jsdelivr.net/npm/onigasm@2.2.2/+esm'

await onigasm.loadWASM('https://cdn.jsdelivr.net/npm/onigasm@2.2.2/lib/onigasm.wasm');

const onigLib = Promise.resolve({
    createOnigScanner: (patterns) => new onigasm.OnigScanner(patterns),
    createOnigString: (str) => new onigasm.OnigString(str)
 });

const grammarSources = {
    "source.quill": await fetch("res/quill.tmlanguage.json").then(r => r.text()),
    "source.js": await fetch("res/javascript.tmlanguage.json").then(r => r.text())
};

const registry = new Registry({
    onigLib,
    getGrammarDefinition: async (scopeName) => ({
        format: 'json',
        content: grammarSources[scopeName]
    })
});

const grammars = new Map();
grammars.set("quill", "source.quill");
grammars.set("javascript", "source.js");

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.45.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    monaco.languages.register({ id: "quill" });
});

window.wireEditorGrammars = async function() {
    for(const editor of window.editors) {
        await wireTmGrammars(monaco, registry, grammars, editor);
    }
    window.editors = [];
};

window.wireEditorGrammars();