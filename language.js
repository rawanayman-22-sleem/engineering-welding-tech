const savedLang = localStorage.getItem("lang") || "ar";

window.i18nextReady = new Promise((resolve, reject) => {
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: savedLang,
    debug: true,
    backend: {
      loadPath: 'translation{{lng}}.json'
    }

  }, function(err, t) {
    updateContent();
    resolve();
        });

  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.textContent = i18next.t(key);

    if(i18next.language === 'ar'){
  document.querySelectorAll('.card').forEach(card => {
    card.style.flexDirection = 'row-reverse';
  });
} else {
  document.querySelectorAll('.card').forEach(card => {
    card.style.flexDirection = 'row';
  });
}

  });

  // تغيير اتجاه الصفحة حسب اللغة
  if (i18next.language === 'ar') {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }
}

function changeLanguage(lang) {
  localStorage.setItem("lang", lang); 
  i18next.changeLanguage(lang, updateContent);
}
