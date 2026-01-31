type DialogAction = {
  label: string;
  onClick: () => void;
};

export class Dialog {
  private title: string;
  private description: string;
  private actions: DialogAction[];
  private overlay: HTMLDivElement;
  private dialog: HTMLDivElement;
  static active?: Dialog;

  constructor(title: string, description: string, actions: DialogAction[]) {
    this.title = title;
    this.description = description;
    this.actions = actions;

    this.overlay = document.createElement("div");
    this.dialog = document.createElement("div");

    this.build();
  }

  private build() {
    this.overlay.className = "dialog-overlay";
    this.dialog.className = "dialog";

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;

    this.dialog.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = this.description;

    this.dialog.appendChild(descriptionElement);

    const dialogButtonsContainerElement = document.createElement("div");
    dialogButtonsContainerElement.className = "dialog-buttons-container";

    this.actions.forEach((action) => {
      const button = document.createElement("button");
      button.className = "dialog-button";
      button.textContent = action.label;
      button.addEventListener("click", action.onClick);

      dialogButtonsContainerElement.appendChild(button);
    });

    this.dialog.appendChild(dialogButtonsContainerElement);

    this.overlay.appendChild(this.dialog);
  }

  show() {
    Dialog.active?.close();
    Dialog.active = this;
    document.body.appendChild(this.overlay);
  }

  close() {
    this.overlay.remove();
  }
}
