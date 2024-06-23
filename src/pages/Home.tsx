import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null); // ファイル選択用のinput要素の参照
    const navigate = useNavigate(); // ルーティング用の関数

    const importFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const fileList = event.target.files;

        // フォルダの中身を取得
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            console.log(file.webkitRelativePath);
        }

        //　フォルダのインポート後、評価ページに遷移
        navigate('/evaluation', {
            state: { fileList }
        });
    };

    return (
        <>
            <h1>Home</h1>
            <p>Homeページです</p>
            <input
                type="file"
                multiple
                onChange={importFolder}
                ref={inputRef}
                // @ts-ignore
                webkitdirectory="true"
            />
        </>
    );
};

export default Home;