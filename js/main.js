// EXPERIENCE: «Most recent» button logic
document.querySelectorAll('.most-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const job = btn.closest('.job');
    const isActive = job.classList.contains('green');

    // Сброс всех
    document.querySelectorAll('.job').forEach(j => {
      j.classList.remove('green');
      j.querySelector('.most-btn').textContent = 'Most recent?';
    });

    // Активация если не было активно
    if (!isActive) {
      job.classList.add('green');
      btn.textContent = 'Most recent';
    }
  });
});

// EDUCATION: «Like» icon logic
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const item = btn.closest('.education-item');
    const isLiked = item.classList.contains('liked');

    // Сброс всех
    document.querySelectorAll('.education-item').forEach(i => i.classList.remove('liked'));

    // Активация если не было лайкнуто
    if (!isLiked) {
      item.classList.add('liked');
    }
  });
});

// Ripple эффект для всех кнопок
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) ripple.remove();

  button.appendChild(circle);
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', createRipple);
});

// Режим редактирования
const editButton = document.getElementById('edit-resume');
const downloadButton = document.getElementById('download-pdf');
const editableElements = document.querySelectorAll('[data-editable]');
const container = document.querySelector('.container');

let isEditing = false;

// Переключение режима редактирования
editButton.addEventListener('click', () => {
  isEditing = !isEditing;
  
  if (isEditing) {
    // Включаем режим редактирования
    container.classList.add('edit-mode');
    editButton.textContent = 'Сохранить';
    
    // Делаем элементы редактируемыми
    editableElements.forEach(el => {
      el.contentEditable = true;
    });
  } else {
    // Выключаем режим редактирования
    container.classList.remove('edit-mode');
    editButton.textContent = 'Редактировать';
    
    // Сохраняем изменения
    saveChanges();
    
    // Эффект подсветки измененных элементов
    editableElements.forEach(el => {
      el.contentEditable = false;
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 1000);
    });
  }
});

// Сохранение данных в localStorage
function saveChanges() {
  editableElements.forEach(el => {
    const key = el.getAttribute('data-editable');
    localStorage.setItem(key, el.textContent);
  });
  
  // Сохраняем состояние кнопок
  const mostRecentJob = document.querySelector('.job.green');
  if (mostRecentJob) {
    localStorage.setItem('mostRecentJob', mostRecentJob.dataset.id);
  }
  
  const likedItem = document.querySelector('.education-item.liked');
  if (likedItem) {
    localStorage.setItem('likedEducation', likedItem.dataset.id);
  }
}

// Загрузка сохраненных данных
function loadSavedData() {
  editableElements.forEach(el => {
    const key = el.getAttribute('data-editable');
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      el.textContent = savedValue;
    }
  });
  
  // Восстанавливаем состояние кнопок
  const mostRecentJobId = localStorage.getItem('mostRecentJob');
  if (mostRecentJobId) {
    const job = document.querySelector(`.job[data-id="${mostRecentJobId}"]`);
    if (job) {
      job.classList.add('green');
      job.querySelector('.most-btn').textContent = 'Most recent';
    }
  }
  
  const likedEducationId = localStorage.getItem('likedEducation');
  if (likedEducationId) {
    const eduItem = document.querySelector(`.education-item[data-id="${likedEducationId}"]`);
    if (eduItem) {
      eduItem.classList.add('liked');
    }
  }
}

// Скачивание PDF
downloadButton.addEventListener('click', () => {
  window.print();
});

// Загрузка сохраненных данных при запуске
window.addEventListener('DOMContentLoaded', loadSavedData);