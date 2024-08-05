const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    console.log("this is the route");
    const allCategorieswProducts = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['product_name'], // display product names in the category
        },
      ],
    });
    console.log(allCategorieswProducts);

    const categoriesReturned = allCategorieswProducts.map((allCategorieswProducts) =>
      allCategorieswProducts.get({ plain: true })
    );

    res.json(categoriesReturned);  // Return JSON data

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});





router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    console.log("this is the individual id route");
    const indCategoryWithProducts = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['product_name'], // display product names in the category
        },
      ],
    });
    console.log(indCategoryWithProducts);

    if (!indCategoryWithProducts) {
      res.status(404).json({ message: 'No album found with that id' });
      return;
    }

    const indCategory = indCategoryWithProducts.get({ plain: true });
    res.json(indCategory);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});




router.post('/', async(req, res) => {
  // create a new category
 
    console.log('post process starting')
    console.log(req.body)
    try {
      const { category_name } = req.body;
      
        
  
  
      // Create an entry in the category table just need the category name
      await Category.create(req.body);
  
      res.status(200).json({ message: 'New category created' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });






router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    console.log("this is the individual category to be updated");
    
    // this gets the info from the insomnia post body
    const { category_name } = req.body;

    const categoryUpdate = await Category.findByPk(req.params.id);
    console.log(categoryUpdate + ' to update');

    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    // Update the category name
    await Category.update(
      { category_name: category_name },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ message: 'Category_name updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});









router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value


  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryDelete) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
