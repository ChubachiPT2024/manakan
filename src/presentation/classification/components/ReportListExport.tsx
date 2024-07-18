import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ReportListExportCommand } from 'src/application/reportLists/reportListExportCommand';
import { Download } from 'lucide-react';
import { dialog } from 'electron';

interface ExportButtonProps {
  reportId: number;
  isDisabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ reportId, isDisabled }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportError(null);

      try {
        // バックエンドのexportAsyncメソッドを呼び出す
        const command = new ReportListExportCommand(reportId);
        const result = await window.electronAPI.exportReportListAsync(command);
  
        // ファイルの保存場所を選択させる
        const { filePath } = await dialog.showSaveDialog({
          title: 'レポートリストを保存',
          defaultPath: `report-list-${reportId}.xlsx`,
          filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
        });

      if (filePath) {
        // 選択されたパスにファイルを保存
        // TODO: ファイル保存の処理をメインプロセスで実装する必要あり
        await window.electronAPI.saveFile(filePath, result.content);
        console.log('File saved successfully');
      } else {
        console.log('File save was canceled');
      }
    } catch (error) {
      console.error('Error exporting report list:', error);
      setExportError('レポートリストのエクスポートに失敗しました。もう一度お試しください。');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleExport}
        disabled={isDisabled || isExporting}
        className="w-full flex items-center justify-center space-x-2"
      >
        <Download size={16} />
        <span>{isExporting ? 'エクスポート中...' : 'エクスポート'}</span>
      </button>
      {exportError && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{exportError}</Alert>
        </Stack>
      )}
    </div>
  );
};
