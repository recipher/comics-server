const map = data => {
  const image = data.images.length &&
    `${data.images[0].path}/standard_xlarge.${data.images[0].extension}`;

  const comic = {
    id: data.id,
    title: data.title,
    description: data.description || undefined,
    image: image || undefined,
  };

  return comic;
};

module.exports = map;