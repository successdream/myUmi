// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/umi/um3/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/login",
    "component": require('@/pages/Login').default,
    "title": "登录"
  },
  {
    "path": "/",
    "component": require('@/pages/Layouts').default,
    "title": "首页",
    "routes": [
      {
        "path": "/",
        "redirect": "/options1",
        "exact": true
      },
      {
        "path": "/options1",
        "component": require('@/pages/Layouts/Options1').default,
        "title": "options1",
        "exact": true
      },
      {
        "path": "/options2",
        "title": "options2",
        "exact": true
      },
      {
        "path": "/options3",
        "component": require('@/pages/Layouts/Options3').default,
        "title": "options3",
        "exact": true
      },
      {
        "path": "/options4",
        "component": require('@/pages/Layouts/Options4').default,
        "title": "options4",
        "exact": true
      },
      {
        "path": "/options5",
        "component": require('@/pages/Layouts/Options5').default,
        "title": "options5",
        "exact": true
      },
      {
        "path": "/options6",
        "component": require('@/pages/Layouts/Options6').default,
        "title": "options6",
        "exact": true
      },
      {
        "path": "/video",
        "component": require('@/pages/Layouts/Video').default,
        "title": "视频",
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
