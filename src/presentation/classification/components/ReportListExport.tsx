import { ReportListExportCommand } from 'src/application/reportLists/reportListExportCommand';

interface ExportButtonProps {
  reportId: string;
  enabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ reportId, enabled }) => {
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
    </div>
  );
};
