import * as http from 'http';
import app from './app';

import { log } from './common/common';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
  log(`server is running at port`, `${port}`);
});
