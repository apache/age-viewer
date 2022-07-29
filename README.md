[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
# Goal of Apache AGE Viewer

Apache AGE Viewer is graph visualisation tool, for Apache AGE. 
This is a sub-project of the Apache AGE project.


# Recommend Node Version & install module
- node js 14.16.0
- npm install pm2

# How to run using command
```
npm run setup
npm run start
```
# How to build using command
```
npm run setup-backend
npm run build-front
npm run build-back
pm2 stop ag-viewer-develop
pm2 delete ag-viewer-develop
pm2 start ecosystem.config.js
```

# License
Apache AGE Viewer is licensed under the Apache License, Version 2.0. See LICENSE for the full license text.
