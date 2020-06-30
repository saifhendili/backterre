import express from 'express';
import Blogs from '../models/blogs';
import { isAuth, isAdmin } from '../util';
// import Product from '../models/productModel  ';
const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blogs.find({});
  res.send(blogs);
});

router.get('/:id', async (req, res) => {
  const blogs = await Blogs.findOne({ _id: req.params.id });
  if (blogs) {
    res.send(blogs);
  } else {
    res.status(404).send({ message: ' ' });
  }
});

router.put('/:id', async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blogs.findById(blogId);
  if (blog) {
    blog.name = req.body.name;
    blog.price = req.body.price;
    blog.image = req.body.image;
    blog.description = req.body.description;
    const updatedblog = await blog.save();

    if (updatedblog) {
      return res
        .status(200)
        .send({ message: ' blog modifier', data: updatedblog });
    }
  }
  return res
    .status(500)
    .send({ message: ' erreur lors de la modification du produit.' });
});

router.delete('/:id', async (req, res) => {
  const deletedblog = await Blogs.findById(req.params.id);
  if (deletedblog) {
    await deletedblog.remove();
    res.send({ message: 'blog supprimer' });
  } else {
    res.send('erreur lors de la suppression');
  }
});

router.post('/', async (req, res) => {
  const blog = new Blogs({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  });
  const newblog = await blog.save();
  if (newblog) {
    return res.status(201).send({ message: 'blog crée', data: newblog });
  }
  return res.status(500).send({ message: ' erreur lors la création du blog.' });
});

export default router;
