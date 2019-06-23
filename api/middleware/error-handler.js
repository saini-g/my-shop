const path = require('path');

const projectRoot = require('../../util/path');

const notFound = (req, res, next) => {
    // res.status(404).sendFile(path.join(projectRoot, 'views', 'not-found.html'));
    res.status(404).render('not-found', { docTitle: 'Page Not Found', path: 'not-found' });
}

module.exports = {
    notFound: notFound
};