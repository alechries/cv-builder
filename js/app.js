function saveData() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const about = document.getElementById('about').value;

  const data = { name, title, about };
  localStorage.setItem('resumeData', JSON.stringify(data));
  updatePreview(data);
}

function updatePreview(data) {
  document.getElementById('preview-name').innerText = data.name;
  document.getElementById('preview-title').innerText = data.title;
  document.getElementById('preview-about').innerText = data.about;
}

function loadData() {
  const saved = localStorage.getItem('resumeData');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById('name').value = data.name;
    document.getElementById('title').value = data.title;
    document.getElementById('about').value = data.about;
    updatePreview(data);
  }
}

function generatePDF() {
  // Обновляем preview перед генерацией
  const data = {
    name: document.getElementById('name').value,
    title: document.getElementById('title').value,
    about: document.getElementById('about').value
  };
  updatePreview(data); // Синхронизируем отображение

  const element = document.getElementById('preview');
  html2pdf().from(element).save('resume.pdf');
}

window.onload = loadData;
