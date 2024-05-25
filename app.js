const items = document.querySelectorAll('.item');
const columns = document.querySelectorAll('.column');

items.forEach((item) => {
  item.addEventListener('dragstart', () =>{
    item.classList.add('dragging')
  })

  item.addEventListener('dragend', () =>{
    item.classList.remove('dragging');
  })
})

columns.forEach((column) => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterItem = getItemPosition(column, e.clientY)
    const draggable = document.querySelector('.dragging');
    column.appendChild(draggable);
    if(afterItem == null) {
      column.appendChild(draggable);
    } else {
      column.insertBefore(draggable, afterItem);
    }
  })
})

const getItemPosition = function getPositionAfterItem(column, y){
  const draggableItems = [...column.querySelectorAll('.item:not(.dragging)')];
  return draggableItems.reduce((closest, child) => {
    let box = child.getBoundingClientRect();
    let offset = y - box.top - box.height / 2;
    if(offset < 0 && offset > closest.offset){
      return {offset: offset, element: child}
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element
}