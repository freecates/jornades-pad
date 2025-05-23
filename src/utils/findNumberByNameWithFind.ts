type PadPageObject = Record<string, number>;

/**
 * Troba el número associat a un nom dins de l'array.
 * @param string El nom del string a buscar com a clau.
 * @returns El número associat si es troba, altrament undefined.
 */
const findNumberByNameWithFind = (string: string, array: PadPageObject[]): number | undefined => {
  const objecteTrobat: PadPageObject | undefined = array.find(obj => 
    obj.hasOwnProperty(string)
  );

  return objecteTrobat ? objecteTrobat[string] : undefined;
};

export default findNumberByNameWithFind;