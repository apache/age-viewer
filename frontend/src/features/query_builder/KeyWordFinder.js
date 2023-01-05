class KeyWordFinder {
  constructor() {
    this.keywordList = new Map();
    this.matrix = [];
  }

  getConnectedNames(kw) {
    if (kw === '') {
      return KeyWordFinder.INITIAL;
    }
    console.log(kw);
    const relationships = this.keywordList[kw];
    const keywordList = Object.keys(this.keywordList);
    const relatedKeys = [];
    relationships.forEach((element, index) => {
      console.log(element, index);
      if (element !== '0') {
        console.log('not 0', element);
        relatedKeys.push(keywordList[index]);
      }
    });
    console.log('connected names', relatedKeys);
    console.log(this.keywordList);
    return relatedKeys;
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
      finder.keywordList[element] = relationships[index].slice(1);
    });
    return finder;
  }
}

export default KeyWordFinder;
