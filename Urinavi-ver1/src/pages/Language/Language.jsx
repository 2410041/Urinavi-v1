import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Language/LanguageModule.css";

function Language() {
    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState("日本語");

    const languages = [
        {
            name: "日本語",
            flag: "../../public/Language/flags/japan.svg"
        },
        {
            name: "英語",
            flag: "../../public/Language/flags/uk.svg"
        },
        {
            name: "韓国語",
            flag: "../../public/Language/flags/korea.svg"
        },
        {
            name: "中国語・簡体字",
            flag: "../../public/Language/flags/china.svg"
        },
        {
            name: "中国語・繁体字",
            flag: "../../public/Language/flags/taiwan.svg"
        }
    ];

    // つぎのページリンク
    const handleStart = () => {
        navigate("/Home");
    };

    return (
        <div className="languagePage">
            <div className="languageContainer">
                <img src="/Language/language.png" alt="Language" className="languageIcon" />

                <div className="select">
                    <span className="selectTitle">
                        言語を選択してください
                    </span>

                    {languages.map((language) => (
                        <button
                            key={language.name}
                            className={
                                `languageItem ${selectedLanguage === language.name
                                    ? "selected"
                                    : ""
                                }`
                            }
                            onClick={() => setSelectedLanguage(language.name)}
                        >
                            <div className="languageName">
                                <img src={language.flag} alt={language.name} className="flag" />
                                <span>{language.name}</span>
                            </div>

                            {selectedLanguage === language.name && (
                                <span className="checkMark">✓</span>
                            )}
                        </button>
                    ))}

                    <button className="startButton" onClick={handleStart} >
                        はじめる
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Language;