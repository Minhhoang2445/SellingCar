document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users"));

    // BƯỚC 2: KHỞI TẠO DỮ LIỆU NẾU CẦN
    // Di chuyển khối 'if' ra khỏi renderTable và đặt nó ở đây!
    if (!users || users.length === 0) {
        users = [{
            name: "admin",
            email: "admin@gmail.com",
            phone: "0123456789",
            password: "Admin@123",
            role: "manager"
        }];
        // Lưu lại ngay lập tức
        localStorage.setItem("users", JSON.stringify(users));
    }

    // BƯỚC 3: BÂY GIỜ MỚI BẮT ĐẦU CÁC LOGIC KHÁC
    const tableBody = document.getElementById("user-table-body");
    const editModalElement = document.getElementById('editUserModal');
    const editModal = new bootstrap.Modal(editModalElement);

    // Hàm renderTable bây giờ chỉ có một nhiệm vụ: HIỂN THỊ
    function renderTable() {
        tableBody.innerHTML = "";

        // Vì logic khởi tạo đã chạy, chúng ta không cần kiểm tra lại ở đây nữa
        // Chúng ta chỉ cần kiểm tra xem sau tất cả, mảng có rỗng không
        if (users.length === 0) {
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `<td colspan="5" class="text-center fst-italic text-secondary">Không có dữ liệu người dùng.</td>`;
            tableBody.appendChild(emptyRow);
        } else {
            users.forEach((user, index) => {
                const row = document.createElement("tr");
                const isManager = user.role === 'manager';
                const disabledButtons = isManager ? 'disabled' : '';

                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${user.name} ${isManager ? '<span class="badge bg-primary">Manager</span>' : ''}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm btn-edit" data-index="${index}" ${disabledButtons}>Sửa</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-index="${index}" ${disabledButtons}>Xóa</button>
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