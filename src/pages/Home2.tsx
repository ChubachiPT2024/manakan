import { useState, useRef, useMemo } from "react";

const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputFolders, setInputFolders] = useState<FileList | null>(null);

    const selectedFolderArray: File[] = useMemo(() => {
        return inputFolders ? [...Array.from(inputFolders)] : [];
    }, [inputFolders]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        if (!inputRef.current?.files) return;

        const newFileArray = [
            ...selectedFolderArray,
            ...Array.from(event.target.files),
        ].filter(
            (file, index, self) =>
                self.findIndex((f) => f.name === file.name) === index // 重複を削除
        );

        const dt = new DataTransfer();
        newFileArray.forEach((file) => dt.items.add(file));
        inputRef.current.files = dt.files; // input内のFileListを更新
        setInputFolders(dt.files); // Reactのstateを更新
    };

    // const handleDelete = (index: number) => {
    //     if (!inputRef.current?.files) return;
    //     const dt = new DataTransfer();
    //     selectedFileArray.forEach((file, i) => i !== index && dt.items.add(file));
    //     inputRef.current.files = dt.files; // input内のFileListを更新
    //     setInputFiles(dt.files); // Reactのstateを更新
    // };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleChange}
                ref={inputRef}
                // @ts-ignore
                webkitdirectory="true"
            />
            <div className="w-fit space-y-3">
                {selectedFolderArray.map((file, index) => (
                    <div
                        key={file.name}
                        className="flex items-center justify-between gap-2"
                    >
                        <div>{file.name}</div>
                        {/* <button onClick={() => handleDelete(index)}>削除</button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
