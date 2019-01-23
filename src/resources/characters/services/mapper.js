const map = data => {
  const image = `${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}`;

  const character = {
    id: data.id,
    name: data.name,
    description: data.description || undefined,
    image: image || undefined,
  };

  return character;
};

module.exports = map;