const mongoose = require('mongoose');

//this is a schema to represent a blog
const blogPostSchema = mongoose.Schema({
	author: {
		firstName: String,
		lastName: String
	},
	title: {type: String, required: true},
	content: {type: String},
	created: {type: Date, default: Date.now}
});

blogPostSchema.virtual('authorName').get(function( ) {
	return `${this.author.firstName} ${this.author.lastName}`.trim( );
});

blogPostSchema.methods.apiRepr = function( ) {
	return {
		id: this._id,
		author: this.authorName,
		content: this.content,
		title: this.title,
		created: this.created
	};
};

const blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = {blogPost};