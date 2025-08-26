document.addEventListener('DOMContentLoaded', function() {

    const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'python',          
        theme: 'monokai',         
        lineNumbers: true,        
        lineWrapping: true,       
        autofocus: true,          
        extraKeys: {
            "Ctrl-Space": "autocomplete"  
        },
        hintOptions: {
            completeSingle: true  
        }
    });


    const openBtn = document.getElementById('openBtn');
    const saveBtn = document.getElementById('saveBtn');
    const runBtn = document.getElementById('runBtn');
    const filePathDisplay = document.getElementById('filePathDisplay');
    const outputPanel = document.getElementById('output-panel');
    const outputContent = document.getElementById('output-content');

    let currentFilePath = null;

    function saveFile() {
        const content = editor.getValue();
        window.electronAPI.saveFile(content)
            .then((savedPath) => {
                if (savedPath) {
                    currentFilePath = savedPath;
                    filePathDisplay.textContent = `Saved: ${savedPath}`;
                }
            })
            .catch((error) => {
                console.error('Save failed:', error);
            });
    }

    function openFile() {
        window.electronAPI.openFile()
            .then((fileData) => {
                if (fileData) {
                    editor.setValue(fileData.content);
                    currentFilePath = fileData.path;
                    filePathDisplay.textContent = `Opened: ${currentFilePath}`;
                }
            })
            .catch((error) => {
                console.error('Open failed:', error);
            });
    }

    function runFile() {
        if (!currentFilePath) {
            alert('Please save the file first');
            saveFile();
            return;
        }

        window.electronAPI.runFile(currentFilePath)
            .then((result) => {
                console.log('Run result:', result);
                
                outputPanel.classList.add('expanded');
                outputContent.textContent = result.output || result.error || 'No output';
            })
            .catch((error) => {
                console.error('Run failed:', error);
            });
    }


    saveBtn.addEventListener('click', saveFile);
    openBtn.addEventListener('click', openFile);
    runBtn.addEventListener('click', runFile);

    
    document.addEventListener('keydown', function(event) {
        
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            saveFile();
        }
        
        if (event.ctrlKey && event.key === 'o') {
            event.preventDefault();
            openFile();
        }
        
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            runFile();
        }
    });

  
    window.electronAPI.onRunOutput((event, result) => {
       
        outputContent.textContent = '';

        
        outputPanel.classList.add('expanded');

        
        if (result.output) {
            outputContent.textContent += result.output;
        }
        
        if (result.error) {
            outputContent.textContent += `\nError:\n${result.error}`;
        }

      
        outputContent.textContent += `\n\nExit Code: ${result.exitCode}`;
    });
});
