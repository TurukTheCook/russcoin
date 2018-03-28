var searchObj = {
  caseInsensitive: (word) => {
    return { $regex: new RegExp("^" + word + '$', "i") }
  },

  regexEmail: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'i')
}

export default searchObj;