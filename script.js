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

// التحقق من حجم الشاشة
function checkDevice() {
  if (window.innerWidth <= 768) {
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
document.addEventListener("DOMContentLoaded", function() {
  type();
  checkDevice();
});

// مؤثرات صوتية
const clickSound = new Audio("sounds/click.mp3");
const openSound = new Audio("sounds/open.mp3");
const scrollSound = new Audio("sounds/scroll.mp3");
const bgMusic = new Audio("sounds/bg-music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.2;

// تشغيل الموسيقى الخلفية بعد التفاعل الأول
document.body.addEventListener('click', () => {
  if (bgMusic.paused) bgMusic.play();
}, { once: true });

// صوت عند الضغط على أي زر أو رابط
document.querySelectorAll("button, a").forEach(el => {
  el.addEventListener("click", () => {
    clickSound.play();
  });
});

// صوت عند فتح مقال (class = read-more)
document.querySelectorAll(".read-more").forEach(link => {
  link.addEventListener("click", () => {
    openSound.play();
  });
});

// صوت عند التمرير
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let st = window.scrollY || document.documentElement.scrollTop;
  if (Math.abs(st - lastScrollTop) > 50) {
    scrollSound.play();
    lastScrollTop = st;
  }
});

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault(); // منع النموذج من إرسال البيانات مباشرة

  var email = document.getElementById('email').value;
  var message = document.getElementById('message');

  // التحقق من صحة البريد الإلكتروني
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    message.textContent = "شكراً على اشتراكك! سيتم إرسال النشرة إلى بريدك الإلكتروني.";
    message.style.color = "green";
    // هنا يمكن إضافة كود لإرسال البريد الإلكتروني إلى الخادم (Backend)
  } else {
    message.textContent = "يرجى إدخال بريد إلكتروني صالح.";
    message.style.color = "red";
  }
});
