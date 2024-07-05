import { useNavigate } from 'react-router-dom';

import { FileUploader } from "react-drag-drop-files";

import { MdOutlineFileUpload } from "react-icons/md";

import { fetchReportId } from '../hooks/useFetchReportId';

const DropForm = () => {
	// ナビゲーション用フック
	const navigate = useNavigate();

	/**
	 * ファイルをドロップしたときの処理
	 *
	 * @param {File} file - ドロップされたファイル
	 */
	const handleDrop = async (file: File) => {
		// file名がreportlist.xlsxでない場合はエラー
		if (file.name !== "reportlist.xlsx") {
			alert("インポートされたファイルがreportlist.xlsxではありません。");
			return;
		}

		try {
			// レポートIDを取得
			const reportId = await fetchReportId(file.path);
			
			// 評価画面に遷移
			navigate(`/evaluation/${reportId}`);

		} catch (error) {
			console.error(error);
			alert("ファイルのインポートに失敗しました。");
		}
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
							<p className="text-lg text-gray-600">ここにreportlist.xlsxをドロップ</p>
							<p className="text-lg text-gray-400">または</p>
							<div className="text-gray-600 cursor-pointer border border-gray-300 shadow px-2">ファイルを選択</div>
					</div>
				}
			/>
		</>
  );
}

export default DropForm;
