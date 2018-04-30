const pathExp = /[\w\d]+\/?\d*/ig;

export default (path: string) => (path.match(pathExp) || [])
  .map(matchPath => matchPath.split('/'));
