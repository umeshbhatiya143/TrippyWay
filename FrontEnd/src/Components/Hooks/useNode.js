
const useNode = () => {
    const insertNode = function (tree, commentId, item) {
      if (tree.id === commentId) {
        tree.replies.push({
          id: new Date().getTime(),
          message: item,
          username:'trippyWay Agent ',
          pic:"../../../user.jpg",
          replies: [],
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.replies.map((ob) => {
        return insertNode(ob, commentId, item);
      });
  
      return { ...tree, replies: latestNode };
    };
  
    const editNode = (tree, commentId, value) => {
      if (tree.id === commentId) {
        tree.message = value;
        return tree;
      }
  
      tree.replies.map((ob) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.replies.length; i++) {
        const currentItem = tree.replies[i];
        if (currentItem.id === id) {
          tree.replies.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;
  