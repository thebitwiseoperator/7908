var Language = {
    en: [],
    es: [],
    de: [],
    setLanguage: function (language) {
        Language.language = language;
        Language.loadJSON();
    },
    language: "",
    loadJSON: function (language) {
        $.getJSON("json/dictionary/text.json", function (textData) {
            for (var i = 0; i < textData.en.length; i++) {
                Language[Language.language].push(textData[Language.language][i]);
                $('[data-index="' + i + '"]').html(Language[Language.language][i]);
            }

        });
    }
};