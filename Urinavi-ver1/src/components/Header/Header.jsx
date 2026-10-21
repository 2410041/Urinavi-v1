import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../Header/HeaderModule.css";
import { createPortal } from "react-dom";

const languages = [
    { code: "ja", name: "日本語" },
    { code: "en", name: "英語" },
    { code: "ko", name: "韓国語" },
    { code: "zh-CN", name: "中国語・簡体字" },
    { code: "zh-TW", name: "中国語・繁体字" }
];

export default function Header({ storeName = "飛鳥店" }) {
    const [isOpen, setIsOpen] = useState(false);

    // 翻訳関数と言語情報を取得
    const { t: translate, i18n } = useTranslation();

    // 現在の言語を取得
    const selectedLanguage = i18n.resolvedLanguage || "ja";

    // useRefはHTML要素を直接参照するときに使用
    // triggerRef: 言語切り替えボタン
    // sheetRef: ボトムシート本体
    const triggerRef = useRef(null);
    const sheetRef = useRef(null);

    // find: 配列の中から条件に一致する最初の要素を探すソケッド
    const currentLanguage = languages.find((language) => language.code === selectedLanguage) ?? languages[0];

    useEffect(() => {

        // ボトムシートが閉じているなら、それ以降の処理を行わない
        if (!isOpen) {
            return;
        }

        // ボトムシートが開いていると、背後の画面がスクロールしないようにする
        // previousOverflow: ボトムシートが開く前の状態を保持
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // ボトムシート内の選択済み言語ボタンを探して、フォーカス移動する処理
        // querySelector: CSSセレクタを使用してHTML要素を探す
        sheetRef.current?.querySelector(".languageOption.isSelected")?.focus();

        // escキーを押すとシートが閉じる
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        // キー操作を監視
        document.addEventListener("keydown", handleKeyDown);

        // ボトムシートを閉じるときに下記の処理を行う
        // 1. 背景スクロールを元に戻す
        // 2. キーボードイベントの監視を解除
        // 3. 言語ボタンフォーカスを戻す
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            triggerRef.current?.focus();
        };
        // isOpen: 変化があればEffectを再実行
    }, [isOpen]);

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    }

    return (
        <>
            <header className="webAppHeader">
                <div className="headerBrand">
                    <img src="/Evergreen.png" alt="エバグリーン" className="headerLogo"></img>
                    <span className="headerStoreName">
                        {translate("header.store", { defaultValue: storeName })}
                    </span>
                </div>

                <button type="button" ref={triggerRef} className="headerLanguageButton" onClick={() => setIsOpen(true)} aria-haspopup="dialog" aria-expanded={isOpen}>
                    <img src="/Language/language.png" alt="" className="headerLanguageIcon" />
                    <span>{currentLanguage.name}</span>
                </button>
            </header>

            {isOpen && createPortal(
                <div className="languageOverlay" onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        setIsOpen(false);
                    }
                }}>
                    <div ref={sheetRef} className="languageBottomSheet" role="dialog" aria-modal="true" aria-labelledby="languageTitle">
                        <div className="sheetHeader"></div>

                        <div className="sheetHeader">
                            <div>
                                <h2 id="languageSheetTitle">
                                    {translate("language.title")}
                                </h2>
                            </div>

                            <button type="button" className="sheetCloseButton" onClick={() => setIsOpen(false)} aria-label="閉じる">
                                ×
                            </button>
                        </div>

                        <div className="languageList">
                            {languages.map((lang) => (
                                <button key={lang.code} type="button" className={
                                    `languageOption ${selectedLanguage === lang.code ? "isSelected" : ""}`
                                } aria-pressed={selectedLanguage === lang.code} onClick={() => handleLanguageChange(lang.code)}>
                                    <span className="languageName">
                                        {lang.name}
                                    </span>

                                    {selectedLanguage === lang.code && (
                                        <span className="languageCheck" aria-hidden="true">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}