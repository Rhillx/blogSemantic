// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({ blogs: [] }).write();

const BlogPost = {};

/*
	@func getItems
	@desc gets all todos
*/
BlogPost.getItems = () => {
	return db.get('blogs').value();
	// .write();
}

/*
	@func createItem
	@desc creates a new todo
*/

BlogPost.createItem = (itemToCreate) => {
	db.get('blogs').push({
		id: Date.now(),
		data: itemToCreate,
	}).write();
}

/*
*/
BlogPost.updateItem = (id, key, propertyToUpdate) => {
	const blog = db.get('blogs')
		  .find({ id });
			
		blog.set(key, propertyToUpdate)
		  .write()
}



BlogPost.deleteItem = (id) => {
	db.get('blogs')
		.remove({ id })
		.write();
}

module.exports = BlogPost;
