import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

// When served standalone (preview server at /main/), use /main/ as basename.
// When loaded as a federated module by host-app, the page URL won't start with /main/.
const basename = window.location.pathname.startsWith('/main/') ? '/main/' : '/';

export const router = createBrowserRouter(routes, { basename });
