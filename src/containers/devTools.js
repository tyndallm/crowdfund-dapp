import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-v"
                 changePositionKey="ctrl-p"
                 changeMonitorKey="ctrl-m"
                 defaultIsVisible={false}>
        <Inspector />
    </DockMonitor>
);

export default DevTools;