let siteNameInput = document.getElementById("siteName");
let webUrlInput = document.getElementById("webUrl");

let siteDetails = [];

if (localStorage.getItem("Website") != null) {
  siteDetails = JSON.parse(localStorage.getItem("Website"));
  display();
}

btn.onclick = function adding() {
  if(Validation(siteName) && Validation(webUrl)){
    let siteInfo = {
      name: siteNameInput.value,
      url: webUrlInput.value,
    };
  
    siteDetails.push(siteInfo);
  
  
    display();
    clearItems();
  
    localStorage.setItem("Website", JSON.stringify(siteDetails));
    tableTable.nextElementSibling.classList.remove("d-none");
  }else{
    tableTable.nextElementSibling.classList.remove("d-none");
    tableTable.nextElementSibling.classList.add("d-block");
  closeModal();
}
};

function display() {
  let box = "";
  for (let i = 0; i < siteDetails.length; i++) {
    box += `
    <tr>
        <td>${i + 1}</td>
        <td>${siteDetails[i].name}</td>
        <td>${siteDetails[i].url}</td>
        <td><button  onclick="visitItem(${i})"  id="visit" class="btn btn-success"><a href="${
      siteDetails[i].url
    }">Visit</a></button></td>
        <td><button  onclick ="deleteItem(${i})"  id="del" class="btn btn-warning">Delete</button></td>
    </tr>`;
  }

  document.getElementById("items").innerHTML = box;
}

function clearItems() {
  siteNameInput.value = "";
  webUrlInput.value = "";
}

function deleteItem(i) {
  siteDetails.splice(i, 1);
  display();
  localStorage.setItem("Website", JSON.stringify(siteDetails));
}

function visitItem(i) {}

delAll.onclick = function (deleteAll) {
  siteDetails.splice(deleteAll);
  display();
  localStorage.removeItem("Website", JSON.stringify(siteDetails));
};

function Validation(ele) {
  var Regex = {
    siteName: /^[A-Za-z\d\s\_]{3,}$/,
    webUrl: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  };
  if (Regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    
    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
  
    return false;
  }
}

closeModal.onclick = function closeModal(){
  tableTable.nextElementSibling.classList.add("d-none");
}