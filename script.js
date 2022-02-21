const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem('items')) || [];

function addedItem(e) {
  e.preventDefault()
  const text = (this.querySelector("[name=item]")).value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  localStorage.setItem('items',JSON.stringify(items))
  populateList(items, itemsList);
  this.reset();

}
function populateList(plates = [], plateList) {
  plateList.innerHTML = plates
    .map((plate, i) => {
      return `
          <li>
              <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
              <label for="item${i}" >${plate.text}</label>
          </li>
          
          `;
    })
    .join("");
}

function toggleDone(e){
   if(!e.target.matches('input')) return
   console.log(e.target)
   const toggle = e.target
   const index = toggle.dataset.index
   items[index].done = !items[index].done
   localStorage.setItem('items',JSON.stringify(items))
   populateList(items, itemsList);
}

addItems.addEventListener("submit", addedItem);
itemsList.addEventListener("click", toggleDone);
populateList(items,itemsList)