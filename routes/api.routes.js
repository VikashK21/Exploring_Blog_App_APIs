const router = require('express').Router();
const Users = new (require('../controllers/user.controller'));
const Blogs = new (require('../controllers/blog.controller'));
const {forLogout, authorizationToken} = require('../auth/security.auth');
// const Blogs = new (require());


router.get('/', async (req, res, next) => {
  res.json({ message: 'Ok api is working 🚀' });
});

//Users APIs.: 
router.get('/users', Users.get_users);

router.post('/users/signup', forLogout, Users.signup);
router.post('/users/login', forLogout, Users.login);
router.post('/users/logout', authorizationToken, Users.logout)
router.post('/users/verify_acc',  Users.verify_acc);

router.patch('/users/forget_password', Users.change_pass);

router.delete('/users/delete_acc', authorizationToken, Users.delete_acc)

//Blogs APIs.: 
router.get('/blogs', authorizationToken, Blogs.all_blogs);
router.post('/blogs/post', authorizationToken, Blogs.new_blog);
router.patch('/blogs/edit_post', authorizationToken, Blogs.edit_blog);
router.post('/blogs/likes_dislikes/:id', authorizationToken, Blogs.likes_dislikes);
router.delete('/blogs/del/:id', authorizationToken, Blogs.del_blog)

module.exports = router;
