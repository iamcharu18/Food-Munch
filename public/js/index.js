const menuSection = document.querySelector('.exploreMenuSectionRow');
const carouselSection = document.querySelector('.carousel-inner');
let first = true;

document.getElementById("addButton").onclick = function () {
    location.href = "/editor";
};

db.collection("task").get().then((items) => {
    items.forEach(item => {
        if (item.id != decodeURI(location.pathname.split("/").pop())) {
            addMenuItem(item);
        }
    });
    menuSection.innerHTML += `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="menu-item-card shadow p-3 mb-3">
                <a href="/editor">
                    <img src="img/plus.png" class="menu-item-image w-100" alt="add item" />
                    <h1 class="menu-card-title font-weight-bold">Add New Menu Item</h1>
                </a>
            </div>
        </div>`

})


const addMenuItem = (item) => {
    let data = item.data();
    console.log(data);
    menuSection.innerHTML += `
    <div class="col-12 col-md-6 col-lg-3">
        <div class="menu-item-card shadow p-3 mb-3">
            <img src="${data.image}" class="menu-item-image w-100" alt="item 1" />
            <h1 class="menu-card-title">${data.name}</h1>
            <a href="/${item.id}/editor" class="menu-item-link">
                Edit
                <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-arrow-right-short"
                    fill="#d0b200" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
            </a>
            <a href="#exploreMenuSection" onclick="deleteItem('${item.id}')" class="delete-item-link">
                Delete
                <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-arrow-right-short"
                    fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
            </a>
        </div>
    </div>
    `;

    carouselSection.innerHTML += `
    <div class="carousel-item ${first ? 'active' : ''}">
    <img class="d-block w-100" src = "${data.image}" alt = "${data.name + "img"}" >
        <div class="carousel-caption d-none d-md-block">
            <h5>${data.name}</h5>
        </div>
    </div >
    `;

    first = false;
}

const deleteItem = (id) => {
    db.collection("task").doc(id).delete().then(() => {
        location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}