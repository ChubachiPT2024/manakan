import DropForm from "../import/components/DropForm";

const Home = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mx-auto mt-10">
                {/* ファイルのインポート */}
                <DropForm />

                {/* 最近使用したデータリスト */}
                <div className="w-full max-w-lg rounded-lg p-4 pt-8">
                    <h3 className="text-lg font-semibold mb-1">最近使用したデータ</h3>
                    <ul className="">
                        <li className="py-2 flex justify-between items-center w-220">
                            <a href="#" className="flex justify-between block text-black hover:text-blue-600 bg-white hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 w-full">
                                <div>
                                    情報アーキテクチャ2 期末レポート
                                </div>
                                <span className="text-gray-500 text-sm block">2024-06-30</span>
                            </a>
                        </li>
                        <li className="py-2 flex justify-between items-center w-220">
                            <a href="#" className="flex justify-between block text-black hover:text-blue-600 bg-white hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 w-full">
                                <div>
                                    情報アーキテクチャ2 中間レポート
                                </div>
                                <span className="text-gray-500 text-sm block">2024-06-20</span>
                            </a>
                        </li>
                        <li className="py-2 flex justify-between items-center w-220">
                            <a href="#" className="flex justify-between block text-black hover:text-blue-600 bg-white hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 w-full">
                                <div>
                                    情報アーキテクチャ2 個人レポート課題
                                </div>
                                <span className="text-gray-500 text-sm block">2024-06-10</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Home;
