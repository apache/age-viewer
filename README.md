[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
# Goal of AGViewer

AGViewer is graph visualisation tool, for AgensGraph or Apache AGE.

# How to use this image
```
docker run \
    --publish=3001:3001 \
    --name=agviewer \
    bitnine/agviewer:latest
```

# How to run using command
```
npm run setup
npm run start
```
# How to build using command
```
npm run setup-backend
npm run build-front
pm2 stop ag-viewer-develop
pm2 delete ag-viewer-develop
pm2 start ecosystem.config.js
```

# License
AGViewer is licensed under the Apache License, Version 2.0. See LICENSE for the full license text.
