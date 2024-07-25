import { Plugin, Notice, TextFileView } from 'obsidian';

export default class SimpleTabLogger extends Plugin {
    async onload() {
        console.log('Simple Tab Logger plugin loaded.');

        this.addCommand({
            id: 'log-active-and-recent-tabs',
            name: 'Log Active and Recent Tabs',
            hotkeys: [{ modifiers: ["Alt"], key: "q" }],
            callback: () => {
                const activeLeaf = this.app.workspace.getActiveViewOfType(TextFileView);
                const recentTabs = this.app.workspace.getLastOpenFiles();
                console.log('Active Tab:', activeLeaf?.file?.path);
            }
        });
    }
}

