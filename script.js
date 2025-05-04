const textElement = document.getElementById("typewriter");
const phrases = [
  "قصص غامضة من التاريخ",
  "ظواهر لا تفسير لها",
  "أماكن مهجورة وأسرار مخفية",
  "حقائق غريبة أغرب من الخيال"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let speed = 100;

function type() {
  const current = phrases[currentPhrase];
  const displayed = current.substring(0, currentChar);
  textElement.innerHTML = displayed + "<span class='cursor'>|</span>";

  if (!isDeleting && currentChar < current.length) {
    currentChar++;
    speed = 100;
  } else if (isDeleting && currentChar > 0) {
    currentChar--;
    speed = 50;
  } else {
    if (!isDeleting) {
      isDeleting = true;
      speed = 1500;
    } else {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      speed = 300;
    }
  }

  setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", type);

// التحقق من حجم الشاشة
function checkDevice() {
  if (window.innerWidth <= 768) { // إذا كانت الشاشة في وضع الهاتف
    document.getElementById("desktop-popup").style.display = "flex";
  }
}

// إغلاق النافذة عند الضغط على زر "إغلاق"
document.getElementById("close-popup").onclick = function() {
  document.getElementById("desktop-popup").style.display = "none";
}

// إغلاق النافذة عند الضغط على زر "إغلاق" في المحتوى
document.getElementById("dismiss-popup").onclick = function() {
  document.getElementById("desktop-popup").style.display = "none";
}

// تنفيذ الدالة عند تحميل الصفحة
window.onload = checkDevice;
