/**
 * @file src/App.jsx
 */
import { BrowserRouter } from 'react-router';
import ServerProvider from 'src/ServerProvider';
import Router from 'src/Router';


export default function App () {
    return (
        <ServerProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ServerProvider>
    );
};