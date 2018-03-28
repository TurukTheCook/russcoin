var searchObj = {
  caseInsensitive: (word) => {
    return { $regex: new RegExp("^" + word + '$', "i") }
  },

  regexEmail: new RegExp(/^[A-Z0-9.+]+@[A-Z0-9.-]+$/, 'i') 
  // PS : C'est de la merde cette RegEx, le vrai bail ce serait rien du tout ou a la limite ".+@.+" devrait être okay .
}

export default searchObj;