class KeyWordFinder {
  constructor() {
    this.keywordMap = new Map();
    this.allKeywords = new Set();
  }

  getConnectedNames(kw) {
    if (!this.allKeywords.has(kw)) {
      return KeyWordFinder.INITIAL;
    }
    const relationships = this.keywordMap[kw];
    const keywordList = Object.keys(this.keywordMap);
    const relatedKeys = [];
    relationships.forEach((element, index) => {
      if (element !== '0') {
        relatedKeys.push(keywordList[index]);
      }
    });
    return relatedKeys;
  }

  hasWord(word) {
    return this.allKeywords.has(word);
  }

  static get INITIAL() {
    return ['MATCH', 'CREATE', 'MERGE'];
  }

  static fromMatrix(data) {
    const { kw, relationships } = data;
    const finder = new KeyWordFinder();
    // kw is list of keywordList and relationships is matrix
    kw.forEach((element, index) => {
      if (element === '') return;
      finder.keywordMap[element] = relationships[index].slice(1);
      finder.allKeywords.add(element);
    });
    return finder;
  }
}

export default KeyWordFinder;
