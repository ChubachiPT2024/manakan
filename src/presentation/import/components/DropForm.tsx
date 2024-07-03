import { useNavigate } from 'react-router-dom';

import { FileUploader } from "react-drag-drop-files";

import { MdOutlineFileUpload } from "react-icons/md";

const DropForm = () => {
	const navigate = useNavigate();

	const handleDrop = (file: File) => {
		console.log(file);

		// ルーティング処理
		navigate('/evaluation');
	}

  	return (
		<>
			<FileUploader
				// オプションについては
				// https://www.npmjs.com/package/react-drag-drop-files
				handleChange={handleDrop}
				multiple={false}
				name="file"
				types={['XLSX']}
				hoverTitle=" " // ドラッグ時のタイトル (空文字で非表示)
				children={
					<div className="rounded-lg bg-gray-100 px-20 py-6 flex flex-col items-center justify-center">
  						<MdOutlineFileUpload size={100} color="gray" />
  						<p className="text-lg text-gray-600">ここにファイルをドロップ</p>
  						<p className="text-lg text-gray-400">または</p>
  						<div className="text-gray-600 cursor-pointer border border-gray-300 shadow px-2">ファイルを選択</div>
					</div>

				}
			/>
		</>
  	);
}

export default DropForm;
