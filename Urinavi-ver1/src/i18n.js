import i18n from "i18next"
import { initReactI18next } from "react-i18next";

// 各言語のファイルを読み込む
import ja from "./Languages/ja.json";
import en from "./Languages/en.json";
import ko from "./Languages/ko.json";
import zhCN from "./Languages/zh-CN.json";
import zhTW from "./Languages/zh-TW.json";

i18n.use(initReactI18next).init({
    resources: {
        ja: { translation: ja },
        en: { translation: en },
        ko: { translation: ko },
        "zh-CN": { translation: zhCN },
        "zh-TW": { translation: zhTW }
    },

    // 初期言語
    lng: "ja",
    supportedLngs: [
        "ja",
        "en",
        "ko",
        "zh-CN",
        "zh-TW"
    ],

    interpolation: {
        escapeValue: false
    }
});

export default i18n;