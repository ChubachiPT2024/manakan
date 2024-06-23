import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { ReportProvider } from './context/ReportProvider';

const root = createRoot(
    document.body
);
root.render(
    <React.StrictMode>
        <ReportProvider>
            <App />
        </ReportProvider>
    </React.StrictMode>
);