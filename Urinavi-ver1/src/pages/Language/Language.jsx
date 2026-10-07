import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Language/LanguageModule.css";

function Language() {
    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState("日本語");

    const languages = [
        "日本語",
        "英語",
        "韓国語",
        "中国語・簡体字",
        "中国語・繁体字"
    ];

    // つぎのページリンク
    const handleStart = () => {
        navigate("/Home");
    };

    return (
        <div className = "languagePage">
            <div className = "languageContainer">
                <img src = "/Language/language.png" alt = "Language" className = "languageIcon" />

                <div className = "select">
                    <span className = "selectTitle">
                        言語を選択してください
                    </span>

                    {languages.map((language) => (
                        <button
                            key = {language}
                            className = {`languageItem ${selectedLanguage === language ? "selected" : ""
                                }`}
                            onClick={() => setSelectedLanguage(language)}
                        >
                            <span>{language}</span>

                            {selectedLanguage === language && (
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