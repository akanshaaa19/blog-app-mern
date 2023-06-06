const { ObjectId } = require("mongodb");

const getDb = require("../utils/database").getDb;

exports.getFeed = (req, res, next) => {
  const getData = async () => {
    const db = getDb();
    const products = await db.collection("posts").find().toArray();
    res.status(200).json({ posts: products });
  };

  getData();
};

exports.postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const creator = req.body.creator;
  const date = new Date().toLocaleDateString();
  const image = req.file.path.replace("\\","/")

  const post = {
    title: title,
    content: content,
    creator: creator,
    date: date,
    image: image
  };

  const createPost = async (post) => {
    const db = getDb();
    const collection = db.collection("posts");
    collection.insertOne(post).then(result=>{
      res.status(201).json({
      message: "successful",
      acknowledgment: result,
    })
    }).catch(err=>{
      console.log(err);
    });;
    
  };

  // console.log(post);

  createPost(post);
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  const getPost = async (postId) => {
    const db = getDb();
    const collection = db.collection("posts");
    const id = new ObjectId(postId);
    const post = await collection.findOne({ _id: id });
    res.status(200).json({
      post: post,
    });
  };

  getPost(postId);
};
