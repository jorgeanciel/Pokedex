const colorMap = {
  normal: '#735259',
  fighting: '#96402A',
  flying: '#13b9c0',
  poison: '#5B3184',
  ground: '#a37324',
  rock: '#7E7E7E',
  bug: '#3BB039',
  ghost: '#323569',
  steel: '#5d736c',
  fire: '#E35825',
  water: '#70b7fa',
  grass: '#82CD47',
  electric: '#e2e02d',
  psychic: '#a12b6a',
  ice: '#86d2f4',
  dragon: '#448a94',
  dark: '#030706',
  fairy: '#981844',
  shadow: '#000000',
  default: '#ffeb3b',
};

const ColorName = (type) => {
  return colorMap[type.toLowerCase()] || colorMap['default'];
};

export default ColorName;
