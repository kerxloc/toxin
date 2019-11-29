class ExpandableCheckbox {
  constructor(options = {}) {
    if (options.expandableBtn) {
      this.expandableBtn = options.expandableBtn;
    } else {
      console.error(
        "Expected expandableBtn inside constructor object but not received"
      );
    }

    if (options.expandableList) {
      this.expandableList = options.expandableList;
      this.isHide = this.expandableList.classList.contains(
        "checkbox__item-list--hide"
      );
    } else {
      console.error(
        "Expected expandableList inside constructor object but not received"
      );
    }
  }

  onToggleHide = () => {
    const parentExpandableBtn = this.expandableBtn.parentNode;
    parentExpandableBtn.classList.toggle("checkbox__title--expandable-open");
    this.expandableList.classList.toggle("checkbox__item-list--hide");
  };

  init = () => {
    this.expandableBtn.addEventListener("click", this.onToggleHide);
  };
}

export default ExpandableCheckbox;
