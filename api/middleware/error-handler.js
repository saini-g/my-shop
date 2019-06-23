const notFound = (req, res, next) => {
    res.status(404).render('not-found', { docTitle: 'Page Not Found', path: 'not-found' });
}

module.exports = {
    notFound: notFound
};