const express = require('express');

const router = express.Router();

const BlogPost = require('./blogPostHandler')


// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/blogs',(request, response, next) => {
	next();
});


router.post('/blogs', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	BlogPost.createItem(requestBody);

	next();

});

router.put('/blog/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;
	Object.keys(dataPayload).forEach((key) => {
		BlogPost.updateItem(id, 'data.' + key, dataPayload[key]);
	})
	next();
});


// put todo
// router.put('/blog/:id', (request, response, next) => {
// 	const title = blogItem.data.title;
// 	const blog = blogItem.data.blog;
// 	const id= parseInt(request.params.id, 10);
// 	// const dataPayload = request.body;
//
// 	BlogPost.updateItem(id, title, blog);
//
// 	next();
// }); // blog

// delete blog
router.delete('/blog/:id', (request, response, next) => {

	const id = parseInt(request.params.id, 10);

	BlogPost.deleteItem(id);

	next();
}); // delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(BlogPost.getItems());
});

module.exports = router;
