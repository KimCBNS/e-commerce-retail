const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    console.log("this is the route");
    const allTags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product, through: ProductTag
         
        },
      ],
    });

    console.log(allTags);
    const allTagsProducts = allTags.map(tag => tag.get({ plain: true }));
   

    res.json(allTagsProducts);  // Return JSON data

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});




router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log("this is the route");
    const aTag = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product, through: ProductTag
         
        },
      ],
    });

    console.log(aTag);
    const aTagDisplay = aTag.get({ plain: true });
   

    res.json(aTagDisplay);  // Return JSON data

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };




});

router.post('/', async(req, res) => {
  // create a new tag
  
  console.log('post process starting')
  console.log(req.body)
  try {
    
    // Create an entry in the category table just need the category name
    await Tag.create(req.body);

    res.status(200).json({ message: 'New tag created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {

    console.log("this is the individual tag to be updated");
    
    // this gets the info from the insomnia post body
    const { tag_name } = req.body;

    const tagUpdate = await Tag.findByPk(req.params.id);
    console.log(tagUpdate + ' to update');

    if (!tagUpdate) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    // Update the category name
    await Tag.update(
      { tag_name: tag_name },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ message: 'Tag_name updated successfully' });
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagDelete) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
