const myModal = new bootstrap.Modal(document.getElementById('avatarModal'));
const profileMainContainer = document.querySelector('.profile-main');
const avatarEditButton = document.getElementById('avatar-edit-button');
const avatarUploadButton = document.getElementById('avatar-upload');

avatarEditButton.addEventListener('click', () => {
  myModal.show();
});

avatarUploadButton.addEventListener('click', async (event) => {
  event.preventDefault();
  myModal.hide();
  const formData = new FormData();
  const avatarUploadField = document.getElementById('avatarFile');
  formData.append('avatarFile', avatarUploadField.files[0]);

  const response = await fetch('/profile', {
    method: 'POST',
    body: formData,
  });

  const result = await response.text();
  profileMainContainer.innerHTML = result;
});
