const savedLang = localStorage.getItem("lang") || "ar";

// تحديد اسم المجلد الرئيسي تلقائيًا (للتوافق مع GitHub Pages)
const basePath = window.location.pathname.split('/')[1];

window.i18nextReady = new Promise((resolve, reject) => {
  i18next
    .use(i18nextHttpBackend)
    .init({
      lng: savedLang,
      debug: true,
      backend: {
     /*  loadPath: `translation{{lng}}.json` // local servier  */
       
        loadPath: `/${basePath}/translation{{lng}}.json` 
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
  });

  if (i18next.language === 'ar') {
    document.querySelectorAll('.card').forEach(card => {
      card.style.flexDirection = 'row-reverse';
    });
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  } else {
    document.querySelectorAll('.card').forEach(card => {
      card.style.flexDirection = 'row';
    });
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }
}

function changeLanguage(lang) {
  localStorage.setItem("lang", lang);
  i18next.changeLanguage(lang, updateContent);
}
