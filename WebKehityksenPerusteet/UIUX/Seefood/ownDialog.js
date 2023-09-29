// const dialogActions = [
//   { dialog: 'dialogCrab', show: 'showCrab', close: 'closeCrab' },
//   { dialog: 'dialogClam', show: 'showClam', close: 'closeClam' },
//   { dialog: 'dialogHummus', show: 'showHummus', close: 'closeHummus' },
//   { dialog: 'dialogCod', show: 'showCod', close: 'closeCod' }
// ];

// dialogActions.forEach(action => {
//   const dialog = document.getElementById(action.dialog);
//   document.getElementById(action.show).onclick = () => dialog.show();
//   document.getElementById(action.close).onclick = () => dialog.close();
// });


const createDialog = (dialogId, openBtnId, closeBtnId) => {
  const dialog = document.getElementById(dialogId);
  const openDialogBtn = document.getElementById(openBtnId);
  const closeDialogBtn = document.getElementById(closeBtnId);

  const elements = dialog.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = elements[0];
  const lastElement = elements[elements.length - 1];

  const preventClick = e => {
    if (e.target !== closeDialogBtn) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const trapFocus = e => {
    if (e.key === 'Tab') {
      const tabForwards = !e.shiftKey && document.activeElement === lastElement;
      const tabBackwards = e.shiftKey && document.activeElement === firstElement;
      if (tabForwards || tabBackwards) {
        e.preventDefault();
        (tabForwards ? firstElement : lastElement).focus();
      }
    }
  };

  const openDialog = () => {
    dialog.showModal();
    dialog.addEventListener('keydown', trapFocus);
    dialog.addEventListener('click', preventClick);
  };

  const closeDialog = e => {
    e.preventDefault();
    dialog.close();
    dialog.removeEventListener('keydown', trapFocus);
    dialog.removeEventListener('click', preventClick);
    openDialogBtn.focus();
  };

  openDialogBtn.addEventListener('click', openDialog);
  closeDialogBtn.addEventListener('click', closeDialog);
};

createDialog('dialogCrab', 'showCrab', 'closeCrab');
createDialog('dialogClam', 'showClam', 'closeClam');
createDialog('dialogHummus', 'showHummus', 'closeHummus');
createDialog('dialogCod', 'showCod', 'closeCod');
