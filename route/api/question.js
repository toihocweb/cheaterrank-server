const postQuestion = (req, res) => {
  // {
  //     id: 1,
  //     lang: "javascript",
  //     desc: "Tính tổng số lượng các sản phẩm",
  //     inputs:
  //       '[[{"name": "Dress" , "quantity": 10} , {"name": "Hat" , "quantity": 20}], [{"name": "Shirt"} , {"name": "Coat" , "quantity": 20}]]',
  //     outputs: "[30 , 20]",
  //   }
  const {} = req.body;
  return res.send("post question is ok");
};
module.exports = postQuestion;
