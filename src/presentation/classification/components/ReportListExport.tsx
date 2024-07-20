import { dialog } from 'electron';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Download } from 'lucide-react';
import { ReportListExportCommand } from 'src/application/reportLists/reportListExportCommand';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  reportId: number;
  isDisabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ reportId, isDisabled }) => {
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleExport = async () => {
    try {
      const command = new ReportListExportCommand(reportId);
      const data = await window.electronAPI.exportReportListAsync(command);
      const workbook = XLSX.read(data.content);

      const result = await dialog.showSaveDialog({
        title: 'Save file as',
        filters: [{
          name: "Spreadsheets",
          extensions: ["xlsx", "xls", "xlsb"]
        }]
      });

      if (result.filePath) {
        XLSX.writeFile(workbook, result.filePath);
        setExportStatus('success');
      }
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('error');
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={isDisabled}
        className={`text-white bg-black hover:bg-gray-800 font-medium rounded-md text-md w-full py-2.5 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        エクスポートする
      </button>
      {exportStatus === 'success' && (
        <Stack spacing={2} direction="row" className="mt-2">
          <Alert severity="success">Exported successfully</Alert>
          <Download size={24} />
        </Stack>
      )}
      {exportStatus === 'error' && (
        <Alert severity="error" className="mt-2">Export failed</Alert>
      )}
    </div>
  );
};
