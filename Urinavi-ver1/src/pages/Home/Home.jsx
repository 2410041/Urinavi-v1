import { useTranslation } from "react-i18next";
import '../Home/HomeModule.css';
import Header from "../../components/Header/Header";

function Home() {
    // 翻訳関数をtranslateという名前で取得
    const { t: translate } = useTranslation();

    return (
        <>
            <Header />

            <div className="homePage">

                {/* 商品検索 */}
                <h1>{translate("home.title")}</h1>

                <input
                    type="text"
                    placeholder={translate("home.search")}
                />

                {/* カテゴリー */}
                <h2>{translate("home.category")}</h2>

                {/* 日替わり商品 */}
                <h2>{translate("home.dailyProducts")}</h2>

            </div>
        </>
    );
}

export default Home;