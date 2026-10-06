import { createRoot } from "react-dom/client";
import React from "react";
import Language from "../Language/LanguageModule.css";

function Language() {
    return(
        <>
            <div>
                <div className="select">
                    <span>言語を選択してください</span>
                    <span>日本語</span>
                    <span>英語</span>
                    <span>韓国語</span>
                    <span>中国語・簡体字</span>
                    <span>中国語・繁体字</span>
                </div>
            </div>
        </>
    )
}