function saveData() {
  const data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    summary: document.getElementById('summary').value,
    experience: document.getElementById('experience').value,
    education: document.getElementById('education').value,
    skills: document.getElementById('skills').value,
    photo: document.getElementById('preview-photo').src // base64
  };

  localStorage.setItem('resumeData', JSON.stringify(data));
  updatePreview(data);
}

function updatePreview(data) {
  document.getElementById('preview-name').innerText = `${data.firstName} ${data.lastName}`;
  document.getElementById('preview-contact').innerText =
    `${data.email} | ${data.phone}${data.address ? ' | ' + data.address : ''}`;
  document.getElementById('preview-summary').innerText = data.summary;
  document.getElementById('preview-experience').innerText = data.experience;
  document.getElementById('preview-education').innerText = data.education;
  document.getElementById('preview-photo').src = data.photo;

  const skillList = document.getElementById('preview-skills');
  skillList.innerHTML = '';
  data.skills.split('\n').forEach(line => {
    if (line.trim()) {
      const [skill, level] = line.split(':').map(s => s.trim());
      const li = document.createElement('li');
      li.textContent = `${skill} — уровень ${level}`;
      skillList.appendChild(li);
    }
  });
}

function loadData() {
  const saved = localStorage.getItem('resumeData');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById('firstName').value = data.firstName;
    document.getElementById('lastName').value = data.lastName;
    document.getElementById('email').value = data.email;
    document.getElementById('phone').value = data.phone;
    document.getElementById('address').value = data.address;
    document.getElementById('summary').value = data.summary;
    document.getElementById('experience').value = data.experience;
    document.getElementById('education').value = data.education;
    document.getElementById('skills').value = data.skills;
    document.getElementById('preview-photo').src = data.photo;
    updatePreview(data);
  }
}

function generatePDF() {
  saveData(); // Обновляем preview перед экспортом
  const element = document.getElementById('preview');
  html2pdf().from(element).save('resume.pdf');
}

document.getElementById('photo').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview-photo').src = e.target.result;
  };
  reader.readAsDataURL(file);
});

window.onload = loadData;