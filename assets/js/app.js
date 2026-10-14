 
const cl = console.log


let post = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  }

]



const express =  require("express")

const app = express()

app.use(express.json());

app.get("/api/post",(req, res) =>{
    try {
        res.status(200).json({
            success:true,
            body:post,
            msg:"post fetched successfully !!!"
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong",
            error:err.msg
        })
    }
})

 


//get api to fetch single post 



app.get("/api/post/:id", (req , res)=>{

    try { 
      const id  = Number(req.params.id);

      const singlePost = post.find(p => p.id === id)

      if (!singlePost) {
        return res.status(404).json({
          success:false,
          msg:" single post data not found !!!"
        })
        
      }

      res.status(200).json({
        success:true,
        body:singlePost,
        msg:" single post data fetched successfully !!!"

      })
    } catch (err) {
      res.status(500).json({
        success:false,
        msg:"something went wrong !!!",
        error: err.msg

      })

    }
})




//create api for new post



app.post("/api/post", (req, res) => {
  try {
    let newPost = {
     
      body: req.body.body,
      id: Date.now().toString(),
      userId: req.body.userId,
      title: req.body.title,
    }

    post.push(newPost)

    res.status(201).json({
      success: true,
      body: newPost,
      msg: "Post created successfully !!!"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: " Something went wrong !!!",
      error: err.msg
    })
  }
})




// for update the post 



app.patch("/api/post/:id", (req, res) =>{
  try{
    let updatepost = post.find(post => post.id == req.params.id);

    if(!updatepost){
      return res.status(404).json({
        success: false,
        msg: "Post not found !!!"
      })
    }

    updatepost.userId = req.body.userId;
    updatepost.title = req.body.title;
    updatepost.body = req.body.body;

    res.status(200).json({
      success: true,
      body: updatepost,
      msg: "Post updated successfully !!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      msg: "Something went wrong !!!",
      error: err.msg
    })
  }
})



// for delete the post 



app.delete("/api/post/:id", (req, res)=>{
  try{
    let getInd = post.findIndex(d => d.id == req.params.id);

    if(getInd === -1){
      return res.status(404).json({
        success: false,
        msg: "Post not found !!!"
      })
    }
    let deletedPost = post.splice(getInd, 1);

    res.status(200).json({
      success: true,
      body: deletedPost[0],
      msg: "Post deleted successfully !!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      msg: "Something went wrong !!!",
      error: err.msg
    })
  }
})




app.listen(3000,()=>{
    cl("post data fetched successfully")
}) 



















