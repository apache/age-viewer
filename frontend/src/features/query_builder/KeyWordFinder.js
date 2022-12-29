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
    const startIndex = this.keywords[kw];
    if (!startIndex) return [];
    const nodesList = Object.keys(this.keywords);
    const edgeList = this.matrix[startIndex];
    const keywords = [];
    edgeList.forEach((e, i) => {
      if (e > 0) {
        keywords.push(nodesList[i]);
      }
    });
    return keywords;
  }

  static fromMatrix(m) {
    //
  }
}

export default KeyWordFinder;
