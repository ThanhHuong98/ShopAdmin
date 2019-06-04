exports.index = async function(req, res, next) {
    const user = await req.user;
    console.log("user in session:", user);
    if(user)
      res.render('pages/home/index', { title: 'Home' });
    else
      res.redirect('/');
}
exports.users = function(req, res, next) {
  res.send('respond with a resource');
}