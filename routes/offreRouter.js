import express from 'express';
import Offre from '../models/offre';
// import { isAuth, isAdmin } from '../util';
// import Product from '../models/productModel  ';
const router = express.Router();

router.get('/', async (req, res) => {
  const offre = await Offre.find({});
  res.send(offre);
});

router.get('/:id', async (req, res) => {
  const offre = await Offre.findOne({ _id: req.params.id });
  if (offre) {
    res.send(offre);
  } else {
    res.status(404).send({ message: ' ' });
  }
});

router.put('/:id', async (req, res) => {
  const offreId = req.params.id;
  const offre = await Offre.findById(offreId);
  if (offre) {
    offre.name = req.body.name;
    offre.price = req.body.price;
    offre.image = req.body.image;
    offre.description = req.body.description;
    const updatedoffre = await offre.save();

    if (updatedoffre) {
      return res
        .status(200)
        .send({ message: ' Offre modifier', data: updatedoffre });
    }
  }
  return res
    .status(500)
    .send({ message: ' erreur lors de la modification du produit.' });
});

router.delete('/:id', async (req, res) => {
  const deleteoffre = await Offre.findById(req.params.id);
  if (deleteoffre) {
    await deleteoffre.remove();
    res.send({ message: 'offre supprimer' });
  } else {
    res.send('erreur lors de la suppression');
  }
});

router.post('/', async (req, res) => {
  const offre = new Offre({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  });
  const newoffre = await offre.save();
  if (offre) {
    return res.status(201).send({ message: 'offre crée', data: newoffre });
  }
  return res
    .status(500)
    .send({ message: ' erreur lors la création du offre.' });
});

export default router;
