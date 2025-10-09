document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("user-table-body");

    const editModalElement = document.getElementById('editUserModal');
    const editModal = new bootstrap.Modal(editModalElement);

    function renderTable() {
        tableBody.innerHTML = "";
        if (users.length === 0) {
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `<td colspan="5" class="text-center fst-italic text-secondary">Không có dữ liệu người dùng.</td>`;
            tableBody.appendChild(emptyRow);
        } else {
            users.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm btn-edit" data-index="${index}">Sửa</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Xóa</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    tableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('btn-edit')) {
            const indexToEdit = parseInt(target.getAttribute('data-index'));
            const userToEdit = users[indexToEdit];

            document.getElementById('editUserIndex').value = indexToEdit;
            document.getElementById('editUserName').value = userToEdit.name;
            document.getElementById('editUserEmail').value = userToEdit.email;
            document.getElementById('editUserPhone').value = userToEdit.phone;

            editModal.show();
        }

        if (target.classList.contains('btn-delete')) {
            const indexToDelete = parseInt(target.getAttribute('data-index'));
            const userToDelete = users[indexToDelete];

            if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${userToDelete.name}" không?`)) {
                users.splice(indexToDelete, 1);
                localStorage.setItem('users', JSON.stringify(users));
                renderTable(); 
            }
        }
    });

    const saveChangesBtn = document.getElementById('saveChangesBtn');
    saveChangesBtn.addEventListener('click', function () {
        const indexToSave = parseInt(document.getElementById('editUserIndex').value);

        const newName = document.getElementById('editUserName').value;
        const newEmail = document.getElementById('editUserEmail').value;
        const newPhone = document.getElementById('editUserPhone').value;

        if (indexToSave >= 0 && users[indexToSave]) {
            users[indexToSave].name = newName;
            users[indexToSave].email = newEmail;
            users[indexToSave].phone = newPhone;
        }

        localStorage.setItem('users', JSON.stringify(users));

        editModal.hide();

        renderTable();
    });

    renderTable();
});