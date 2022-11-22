const itemNameField = document.querySelector('.title');

const itemImage = document.querySelector('#img-upload');
const image = document.querySelector(".banner-img");
let imgPath;

const addItemBtn = document.querySelector('.add-btn');

itemImage.addEventListener("change", () => {
    console.log(1);
    uploadImage(itemImage, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    console.log(2);
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                imgPath = `${location.origin}/${data}`;
                console.log(imgPath);
                image.style.backgroundImage = `url("${imgPath}")`;
                console.log(3);
            })
    } else {
        alert("upload Image only");
    }
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

addItemBtn.addEventListener('click', () => {
    if (itemNameField.value.length) {

        let docName;
        if (itemId[0] == 'editor') {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let itemName = itemNameField.value.split(" ").join("-");
            let id = '';
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            docName = `${itemName}-${id}`;
        } else {
            docName = decodeURI(itemId[0]);
        }

        let date = new Date(); // for added at info

        //access firstore with db variable;
        db.collection("task").doc(docName).set({
            name: itemNameField.value,
            image: imgPath,
            addedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
            .then(() => {
                location.href = `/#exploreMenuSection`;
            })
            .catch((err) => {
                console.error(err);
            })
    }
});

// editing item
let itemId = location.pathname.split("/");
console.log(itemId);
itemId.shift(); // remove first item from the array because first item is empty 

if (itemId[0] != 'editor') {
    // means we are in existing item route
    let docRef = db.collection("task").doc(decodeURI(itemId[0]));
    docRef.get().then((doc) => {
        console.log(doc);
        if (doc.exists) {
            let data = doc.data();
            imgPath = (data.image).replace(/\s/g, '%20');
            console.log(imgPath);
            image.style.backgroundImage = `url(${imgPath})`;
            itemNameField.value = data.name;
        } else {
            location.replace("/editor");
        }
    })
}