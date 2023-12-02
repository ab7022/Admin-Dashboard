document.addEventListener('DOMContentLoaded', () => {

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const deleteButtons = document.querySelectorAll('.delete');
  const searchInput = document.getElementById('title');
  const checkboxCount = document.getElementById('checkbox-count');
  updateCheckboxCount()
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.id === 'check-all') {
        checkboxes.forEach(otherCheckbox => {
          otherCheckbox.checked = checkbox.checked;
        });
      }
      updateCheckboxCount();
      updateSelectedRowStyle();
    });
  });

  deleteButtons.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const row = checkbox.closest('tr');
          row.remove();
        }
      });

      updateCheckboxCount();
      updateSelectedRowStyle();
    });
  });

  searchInput.addEventListener('input', () => {
const searchTerm = searchInput.value.toLowerCase();
const rows = document.querySelectorAll('#book-list tr');

rows.forEach(row => {
    const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const email = row.querySelector('input[name="email"]').value.toLowerCase();
    const role = row.querySelector('input[name="role"]').value.toLowerCase();
    if (name.includes(searchTerm) || email.includes(searchTerm) || role.includes(searchTerm)) {
        row.style.display = 'table-row';
    } else {
        row.style.display = 'none';
    }
});

updateCheckboxCount();
updateSelectedRowStyle();
});

function updateCheckboxCount() {
    const visibleCheckboxes = document.querySelectorAll('#book-list input[type="checkbox"]:checked:not(#check-all):not(:disabled)');
    const totalVisibleRows = Array.from(document.querySelectorAll('#book-list tr')).filter(row => row.style.display !== 'none').length;
    checkboxCount.textContent = `Selected: ${visibleCheckboxes.length} out of`;
}


  function updateSelectedRowStyle() {
    const rows = document.querySelectorAll('#book-list tr');

    rows.forEach(row => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        row.classList.add('selected-row');
      } else {
        row.classList.remove('selected-row');
      }
    });
  }
});

function enableEdit(button, event) {
  console.log("called");
  event.preventDefault();
  const row = button.closest("tr");
  const nameInput = row.querySelector('input[name="name"]');
  const emailCell = row.querySelector('input[name="email"]');
  const roleCell = row.querySelector('input[name="role"]');
  const currentName = nameInput.value.trim();
  const currentEmail = emailCell.textContent.trim();
  const currentRole = roleCell.textContent.trim();
  const inputFields = row.querySelectorAll('input');

  nameInput.outerHTML = `<input type="text" name="name" value="${currentName}" />`;
  emailCell.innerHTML = `<input type="text" name="email" value="${currentEmail}" />`;
  roleCell.innerHTML = `<input type="text" name="role" value="${currentRole}" />`;
  nameInput.focus()
  inputFields.forEach(inputField => {
    inputField.style.border = "1.5px solid black";
  });

  row.querySelectorAll("input").forEach((inputField) => {
    inputField.addEventListener("blur", () => {

      const updatedName = row
        .querySelector('input[name="name"]')
        .value.trim();
      const updatedEmail = row
        .querySelector('input[name="email"]')
        .value.trim();
      const updatedRole = row
        .querySelector('input[name="role"]')
        .value.trim();

      nameInput.outerHTML = updatedName;
      emailCell.innerHTML = updatedEmail;
      roleCell.innerHTML = updatedRole;
    });

    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        inputFields.forEach(field => {
          field.style.border = "none";
        });
      }
    });
  });
}

function enableDelete(button) {
  console.log("Delete called");
  const row = button.closest('tr');
  row.remove();
}
