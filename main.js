const baseUrl = "http://localhost:3000/users";
alert('Please Read Documentation.txt');

const getUser = () => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response sukses dan error
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            console.log(responseJson)
            renderAllUser(responseJson);
        }
    }

    xhr.onerror = function () {
        showResponseMessage();
    }

    // Membuat GET request dan menetapkan target URL
    xhr.open("GET", `${baseUrl}`);
    // Mengirimkan request
    xhr.send();
};

const insertUser = (user) => {

    // Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response sukses dan error
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage('Success add data');

        getUser();
    }

    xhr.onerror = function () {
        showResponseMessage();
    }

    // Membuat GET request dan menetapkan target URL
    xhr.open("POST", `${baseUrl}`);

    // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Auth-Token", "12345");

    // Mengirimkan request dan menyisipkan JSON.stringify(user) pada body
    xhr.send(JSON.stringify(user));
};

const updateUser = (user) => {
    try {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //menetapkan callback jika response sukses dan error
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage('Data has been updated');
            getUser();
        }

        xhr.onerror = function () {
            showResponseMessage('Data Gagal ditambahkan');
        }

        // Membuat GET request dan menetapkan target URL
        xhr.open("PUT", `${baseUrl}/${user.id}`);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");

        // Mengirimkan request dan menyisipkan JSON.stringify(user) pada body
        xhr.send(JSON.stringify(user));
    } catch (error) {
        showResponseMessage('Data gagal ditambahkan')
    }
};

const removeUser = (userId) => {
    // Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response sukses dan error
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage('Data berhasil dihapus')
        getUser();
    }

    xhr.onerror = function () {
        showResponseMessage();
    }

    // Membuat DELETE request dan menetapkan target URL
    xhr.open("DELETE", `${baseUrl}/${userId}`);

    // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader("X-Auth-Token", "12345");

    // Mengirimkan request
    xhr.send();
};

const renderAllUser = (user) => {
    const listBookElement = document.querySelector("#listUser");
    listBookElement.innerHTML = ``;

    console.log(user)

    user.forEach((user) => {
        listBookElement.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>
                <button class="button-delete btn btn-delete" type="submit" name="button" id="${user.id}">Delete</button>
            </td>
        </tr>
            `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach(button => {
        button.addEventListener("click", event => {
            const userId = event.target.id;
            removeUser(userId);
        })
    })
};

const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
};

window.onload = function () {
    var modalBtn = document.querySelector(".modal-btn");
    var modalBg = document.querySelector(".modal-bg");
    var modalClose = document.querySelector(".modal-close");
    var buttonSave = document.querySelector("#buttonSave");
    const inputNim = document.querySelector("#nim");
    const inputName = document.querySelector("#name");
    const inputAddres = document.querySelector("#address");
    const inputNim1 = document.querySelector("#nim1");
    const inputName1 = document.querySelector("#name1");
    const inputAddres1 = document.querySelector("#address1");
    const buttonUpdate = document.querySelector("#buttonUpdate");

    modalBtn.addEventListener('click', function () {
        modalBg.classList.add('bg-active');

    });

    modalClose.addEventListener('click', function () {
        modalBg.classList.remove('bg-active');
    });

    buttonSave.addEventListener("click", function () {
        const user = {
            id: inputNim1.value,
            name: inputName1.value,
            address: inputAddres1.value
        };
        // console.log(user);
        insertUser(user)
        modalBg.classList.remove('bg-active');
    });
    buttonUpdate.addEventListener("click", function () {
        const user = {
            id: inputNim.value,
            name: inputName.value,
            address: inputAddres.value
        };

        updateUser(user)
    });
    getUser();
}

