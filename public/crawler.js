
async function exportData(f){
  const title = document.querySelector('.router-link-active')
  const list = [...document.querySelectorAll('.sub-menu-list-item-link')]
  const data = {
    path: '',
    name: title.textContent,
    children: []
  }
  for (const item of list) {
    item.click();
    await new Promise(r => setTimeout(r, 200))
    data.children.push({
      path: location.href.match(/[^\/]+$/)[0],
      name: item.textContent
    })
  }
  window.myData = JSON.stringify(data, null, 2);
  return data;
}

copy(window.myData);