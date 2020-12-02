import { Router, Request, Response, NextFunction, response } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined; };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403).send('Not permited');
};

const router = Router();

router.get('/', (req: Request, res: Response) => {

    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div>
                You are logged In
            </div>
            <a href="/logout">Logout</a>
        </div>
    `);
    } else {
        res.send(`
        <div>
            <div>
                You are not logged In
            </div>
            <a href="/login">Login</a>
        </div>
    `);
    }
});

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    `);
});


router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    if (email && password && email === 'a@s' && password === 'pw') {
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send('Invalid email or pw');
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});

router.get('/proc', requireAuth, (req: Request, res: Response) => {
    res.send('Welcomed to protected route login user');
});

export { router };