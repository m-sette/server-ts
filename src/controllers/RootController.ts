import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403).send('Not permited');
};

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
                <div>
                    You are logged In
                </div>
                <a href="/auth/logout">Logout</a>
            </div>
        `);
        } else {
            res.send(`
            <div>
                <div>
                    You are not logged In
                </div>
                <a href="/auth/login">Login</a>
            </div>
        `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcomed to protected route login user');
    }
}