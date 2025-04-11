function selectMenuItem(event) {
  console.log(event.target);

  switch (event.target.id) {
    case "menu-table":
      hideAllItems();
      tabelContainer.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;
    case "menu-converter":
      hideAllItems();
      converter.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;

    case "menu-request":
      hideAllItems();
      request.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;
    case "menu-add-rate":
      hideAllItems();
      addRate.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;
    case "menu-search":
      hideAllItems();
      search.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;
    case "menu-alert":
      hideAllItems();
      addAlert.style.display = "block";

      removeAllSelectedClass()
      event.target.classList.add("selected-menu")
      break;

    default:
      break;
  }
}

function hideAllItems() {
  appItems.forEach((item) => (item.style.display = "none"));
}

function removeAllSelectedClass(){
    menuItems.forEach(item=>{
        item.classList.remove("selected-menu")
    })
}
