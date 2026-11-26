const TRANSLATIONS = {
      fr: {
        label: "Français",
        flag: "🇫🇷",
        dir: "ltr",
        title: "Bonjour le monde — Hello World",
        badge: "Esprit de Noël",
        greeting: "Joyeux Noël, le monde !",
        subtitle: "Une page moderne, légère et multilingue prête pour votre projet.",
        cta: "Dire bonjour 👋",
        waveMsg: "Salutations envoyées en français !",
        langInfo: "Langue : Français (FR)",
        themeLight: "☀️ Clair",
        themeDark: "🌙 Sombre"
      },
      en: {
        label: "English",
        flag: "🇬🇧",
        dir: "ltr",
        title: "Hello World — Multilingual",
        badge: "Welcome",
        greeting: "Hello, World!",
        subtitle: "A modern, lightweight, multilingual starter page ready for your project.",
        cta: "Say Hello 👋",
        waveMsg: "Greetings sent in English!",
        langInfo: "Language: English (EN)",
        themeLight: "☀️ Light",
        themeDark: "🌙 Dark"
      },
      es: {
        label: "Español",
        flag: "🇪🇸",
        dir: "ltr",
        title: "¡Hola Mundo! — Multilingüe",
        badge: "Bienvenido",
        greeting: "¡Hola, Mundo!",
        subtitle: "Una página moderna, ligera y multilingüe lista para tu proyecto.",
        cta: "Saludar 👋",
        waveMsg: "¡Saludos enviados en español!",
        langInfo: "Idioma: Español (ES)",
        themeLight: "☀️ Claro",
        themeDark: "🌙 Oscuro"
      },
      de: {
        label: "Deutsch",
        flag: "🇩🇪",
        dir: "ltr",
        title: "Hallo Welt — Mehrsprachig",
        badge: "Willkommen",
        greeting: "Hallo Welt!",
        subtitle: "Eine moderne, schlanke und mehrsprachige Startseite für Ihr Projekt.",
        cta: "Hallo sagen 👋",
        waveMsg: "Grüße auf Deutsch gesendet!",
        langInfo: "Sprache: Deutsch (DE)",
        themeLight: "☀️ Hell",
        themeDark: "🌙 Dunkel"
      },
      it: {
        label: "Italiano",
        flag: "🇮🇹",
        dir: "ltr",
        title: "Ciao Mondo — Multilingue",
        badge: "Benvenuto",
        greeting: "Ciao, Mondo!",
        subtitle: "Una pagina moderna, leggera e multilingue pronta per il tuo progetto.",
        cta: "Saluta 👋",
        waveMsg: "Saluti inviati in italiano!",
        langInfo: "Lingua: Italiano (IT)",
        themeLight: "☀️ Chiaro",
        themeDark: "🌙 Scuro"
      },
      ja: {
        label: "日本語",
        flag: "🇯🇵",
        dir: "ltr",
        title: "こんにちは世界 — Hello World",
        badge: "ようこそ",
        greeting: "こんにちは、世界！",
        subtitle: "プロジェクトにすぐ使える、モダンで軽快な多言語ページです。",
        cta: "あいさつする 👋",
        waveMsg: "日本語であいさつを送りました！",
        langInfo: "言語：日本語 (JA)",
        themeLight: "☀️ ライト",
        themeDark: "🌙 ダーク"
      },
      ar: {
        label: "العربية",
        flag: "🇸🇦",
        dir: "rtl",
        title: "مرحباً بالعالم — متعدد اللغات",
        badge: "أهلاً بك",
        greeting: "مرحباً بالعالم!",
        subtitle: "صفحة حديثة وخفيفة ومتعددة اللغات جاهزة لمشروعك.",
        cta: "ألقِ التحية 👋",
        waveMsg: "تم إرسال التحية باللغة العربية!",
        langInfo: "اللغة: العربية (AR)",
        themeLight: "☀️ فاتح",
        themeDark: "🌙 داكن"
      }
    };

    const STORAGE_LANG = "hello_world_lang";
    const STORAGE_THEME = "hello_world_theme";

    const elements = {
      langSelect: document.getElementById("lang-select"),
      hero: document.getElementById("hero"),
      badgeText: document.getElementById("badge-text"),
      greeting: document.getElementById("greeting"),
      subtitle: document.getElementById("subtitle"),
      waveBtn: document.getElementById("wave-btn"),
      feedback: document.getElementById("feedback"),
      langInfo: document.getElementById("lang-info"),
      clock: document.getElementById("clock"),
      themeToggle: document.getElementById("theme-toggle")
    };

    function detectInitialLang() {
      const saved = localStorage.getItem(STORAGE_LANG);
      if (saved && TRANSLATIONS[saved]) return saved;
      const browserLang = (navigator.language || "fr").slice(0, 2).toLowerCase();
      return TRANSLATIONS[browserLang] ? browserLang : "fr";
    }

    let currentLang = detectInitialLang();
    let currentTheme = localStorage.getItem(STORAGE_THEME) || "dark";

    function renderLanguageOptions() {
      elements.langSelect.innerHTML = "";
      for (const [code, data] of Object.entries(TRANSLATIONS)) {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${data.flag} ${data.label}`;
        elements.langSelect.appendChild(option);
      }
      elements.langSelect.value = currentLang;
    }

    function updateThemeButton() {
      const t = TRANSLATIONS[currentLang];
      elements.themeToggle.textContent = currentTheme === "dark" ? t.themeLight : t.themeDark;
    }

    function applyTheme(theme) {
      currentTheme = theme;
      document.documentElement.dataset.theme = theme;
      localStorage.setItem(STORAGE_THEME, theme);
      updateThemeButton();
    }

    function updateClock() {
      const now = new Date();
      elements.clock.textContent = now.toLocaleTimeString(currentLang, {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function applyLanguageContent(code) {
      const t = TRANSLATIONS[code];
      document.documentElement.lang = code;
      document.documentElement.dir = t.dir;
      document.title = t.title;

      elements.badgeText.textContent = t.badge;
      elements.greeting.textContent = t.greeting;
      elements.subtitle.textContent = t.subtitle;
      elements.waveBtn.textContent = t.cta;
      elements.langInfo.textContent = t.langInfo;
      elements.feedback.textContent = "";

      elements.langSelect.value = code;

      updateThemeButton();
      updateClock();
    }

    function setLanguage(code) {
      if (!TRANSLATIONS[code] || code === currentLang) return;
      currentLang = code;
      localStorage.setItem(STORAGE_LANG, code);

      elements.hero.classList.add("is-fading");
      window.setTimeout(() => {
        applyLanguageContent(code);
        elements.hero.classList.remove("is-fading");
      }, 150);
    }

    elements.waveBtn.addEventListener("click", () => {
      elements.feedback.textContent = TRANSLATIONS[currentLang].waveMsg;
    });

    elements.themeToggle.addEventListener("click", () => {
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    elements.langSelect.addEventListener("change", (event) => setLanguage(event.target.value));

    renderLanguageOptions();
    applyTheme(currentTheme);
    applyLanguageContent(currentLang);
    window.setInterval(updateClock, 15000);
