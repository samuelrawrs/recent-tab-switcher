import { Plugin, Notice, TextFileView, WorkspaceLeaf } from 'obsidian';

export default class RecentTabSwitcher extends Plugin {
    async onload() {
        console.log('Recent Tab Switcher plugin loaded.');

        this.addCommand({
            id: 'switch-to-previous-tab',
            name: 'Switch To Previous Tab',
            hotkeys: [{ modifiers: ["Alt"], key: "q" }],
            callback: () => {
                const recentTabs = this.app.workspace.getLastOpenFiles();
                const leaves = this.app.workspace.getLeavesOfType("markdown");

                // console.log ("Leaves: ", leaves?.map(leaf => (leaf.view as TextFileView)?.file.path)); // log leaves
                // console.log("Recent Tabs: ", recentTabs); // log recent tabs

                if (recentTabs.length > 1) { // seems to be always the case...
                    const previousTabPath = recentTabs[0];
                    const previousLeaf = leaves.find(leaf => (leaf.view as TextFileView)?.file.path === previousTabPath); // find the leaf with the path

                    if (previousLeaf) { // if the leaf is found
                        // this.app.workspace.revealLeaf(previousLeaf); // uncomment if you want to highlight the leaf
                        this.app.workspace.setActiveLeaf(previousLeaf); // Set the leaf as active
                    } else {
                        this.app.workspace.openLinkText(previousTabPath, previousTabPath); // open the tab if it's not already open
                    }
                } else {
                    new Notice("No previous tab to switch to.");
                }
            }
        });
    }
}
