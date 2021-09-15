import m from "mithril";

const CharacterDetailRow = {
  view(vnode) {
    return m(".row", [
      m(".one-third.column", vnode.attrs.label),
      m(".two-thirds.column", vnode.attrs.value),
    ]);
  },
};

export default CharacterDetailRow;
