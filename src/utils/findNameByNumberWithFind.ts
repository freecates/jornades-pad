type PadPageObject = Record<number, string>;

/**
 * Troba el nom associat a un número dins de l'array.
 * @param number El número a buscar com a clau.
 * @returns El nom associat si es troba, altrament undefined.
 */
const findNumberByNameWithFind = (number: number, array: PadPageObject[]): string | undefined => {
  const objecteTrobat: PadPageObject | undefined = array.find(obj => 
    obj.hasOwnProperty(number)
  );

  return objecteTrobat ? objecteTrobat[number] : undefined;
};

export default findNumberByNameWithFind;