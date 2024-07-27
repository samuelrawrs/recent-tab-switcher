import { Notice, Plugin, TextFileView, WorkspaceLeaf } from 'obsidian';

export default class RecentTabSwitcher extends Plugin {
    private previousLeaf: WorkspaceLeaf | null = null;
    private currentLeaf: WorkspaceLeaf | null = null;

    async onload() {
        console.log("RecentTabSwitcher Plugin loaded");

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', () => {
                // console.log("Active leaf changed");
                this.updatePreviousLeaf();
            })
        );

        // console.log("Event listener for 'active-leaf-change' registered");

        this.updatePreviousLeaf();

        this.addCommand({
            id: 'switch-to-previous-leaf',
            name: 'Switch to Previous Leaf',
            callback: () => this.switchToPreviousLeaf()
        });

        // console.log("Command for switching to previous leaf registered");
    }

    private updatePreviousLeaf() {
        const newLeaf = this.app.workspace.activeLeaf; // couldn't find a suitable 
        // console.log("Updating Previous Leaf. New Leaf:", newLeaf);
        if (newLeaf && newLeaf !== this.currentLeaf) {
            this.previousLeaf = this.currentLeaf;
            this.currentLeaf = newLeaf;
            // console.log("Previous Leaf updated to:", this.previousLeaf);
            // console.log("Current Leaf updated to:", this.currentLeaf);
        }
    }

    private switchToPreviousLeaf() {
        const activeLeaf = this.app.workspace.activeLeaf;
        // console.log("Active Leaf:", activeLeaf);

        if (activeLeaf) {
            if (this.previousLeaf && this.previousLeaf !== activeLeaf) {
                // console.log("Switching to Previous Leaf:", this.previousLeaf);
                this.app.workspace.setActiveLeaf(this.previousLeaf); // Set the previous leaf as active
            } else {
                console.log("No previous tab to switch to.");
                new Notice("No previous tab to switch to.");
            }
        }
    }
}