# Exploring_Blog_App_APIs
This is a real time Blog App with the users detail along with the verification also. The new thing about it, is that the body of this Back_End APIs are also beatified in Front_End.


# The Deployed APIs of this App.

## The Base Link to connect with the API.
https://explore-blog-app.herokuapp.com/


## User Base Link to connect with the API.
https://explore-blog-app.herokuapp.com/api/users/

//Users APIs.: 

router.get('/users', Users.get_users);

router.post('/users/signup', forLogout, Users.signup);
router.post('/users/login', forLogout, Users.login);
router.post('/users/logout', authorizationToken, Users.logout)
router.post('/users/verify_acc',  Users.verify_acc);

router.patch('/users/forget_password', Users.change_pass);

router.delete('/users/delete_acc', authorizationToken, Users.delete_acc)

## Blogs Base Link to connect with the API.
https://explore-blog-app.herokuapp.com/api/blogs/

//Blogs APIs.: 

router.get('/blogs', authorizationToken, Blogs.all_blogs);
router.post('/blogs/post', authorizationToken, Blogs.new_blog);
router.patch('/blogs/edit_post', authorizationToken, Blogs.edit_blog);
router.post('/blogs/likes_dislikes/:id', authorizationToken, Blogs.likes_dislikes);
router.delete('/blogs/del/:id', authorizationToken, Blogs.del_blog)
