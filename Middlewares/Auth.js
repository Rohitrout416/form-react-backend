import jwt from 'jsonwebtoken';

function ensureAuthenticated(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).send('Unauthorized');
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }

}

export default ensureAuthenticated;