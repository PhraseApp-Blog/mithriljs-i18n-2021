import m from "mithril";

const CharacterDetailsRow = {
  view(vnode) {
    return m(".row", [
      m(
        ".three.columns.character-details-label",
        vnode.attrs.label,
      ),
      m(".nine.columns", vnode.attrs.value),
    ]);
  },
};

export default CharacterDetailsRow;
