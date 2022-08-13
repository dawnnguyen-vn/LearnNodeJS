const Post = require('../models/Post');

class PostService {

    async find(userId) {
        const result = await Post.find({user: userId}).populate('user', ['username']);
        return result;
    }

    async save(post) {
        const _post = new Post(post);
        const newPost = await _post.save();
        return newPost;
    }

    async update(post, updateCondition) {
        const _post = await Post.findOneAndUpdate(updateCondition, post, {new: true});
        return _post;
    }

    async delete(deleteCondition) {
        const _post = await Post.findOneAndDelete(deleteCondition);
        return _post;
    }
}

module.exports = new PostService;