class KeyWordFinder {
  constructor() {
    this.keywords = new Map();
    this.matrix = [];
  }

  insertNode(kw, relationships) {
    if (this.keywords[kw]) {
      return;
    }
    this.keywords[kw] = Object.keys(this.keywords).length - 1;
    this.matrix.push(relationships);
  }

  getConnectedNames(kw) {
    const relationships = this.keywords[kw];
    const keywordList = Object.keys(this.keywords);
    const relatedKeys = [];
    relationships.forEach((element, index) => {
      if (element !== 0) {
        relatedKeys.push(keywordList[index]);
      }
    });
    return relatedKeys;
  }

  static fromMatrix(data) {
    const { kw, relationships } = data;
    // kw is list of keywords and relationships is matrix
    kw.forEach((element, index) => {
      if (element === '') return;
      this.keywords[element] = relationships[index].slice(1);
    });
    console.log(this.keywords);
  }
}

export default KeyWordFinder;
