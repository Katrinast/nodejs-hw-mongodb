const parseContactType = (type) => {

  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;

};

const parseContactIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  return isFavourite;

};

export const parseFilterParams = ({ isFavourite, contactType }) => {
  const parsedContactType = parseContactType(contactType);
  const parsedContactIsFavourite = parseContactIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedContactIsFavourite,
  };
};
