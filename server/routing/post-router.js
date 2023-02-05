import Router from 'express';
import {getAllPosts,addAPost, getPostWithID, updatePost,deletePost} from '../controllers/post-controllers'

const postRouter=Router();

postRouter.get("/",getAllPosts);
postRouter.get("/:id",getPostWithID);
postRouter.post("/",addAPost);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);

module.exports=postRouter;

