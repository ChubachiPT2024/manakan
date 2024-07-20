import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Download } from 'lucide-react';
import { ReportListExportCommand } from 'src/application/reportLists/reportListExportCommand';

interface ExportButtonProps {
  reportId: string;
  enabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ reportId, enabled }) => {
  const [exportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleExport = async () => {
      const data = await window.electronAPI.exportReportListAsync(new ReportListExportCommand(Number(reportId)));

      const blob = new Blob([data.content], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const fileName = 'reportlist.xlsx';
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={!enabled}
        className={`text-white bg-black hover:bg-gray-800 font-medium rounded-md text-md w-full py-2.5 ${
          enabled ? '' : 'opacity-50 cursor-not-allowed'
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
