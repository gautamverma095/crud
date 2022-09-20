
const url = "http://localhost:3000"

window.addEventListener("load", () => {
  getData()
})

let getData = async () => {
    let res = await fetch(`${url}/todo`)
    res = await res.json()
    renderDom(res)
    // console.log(res)
}

let renderDom = (data) => {
    let container = document.getElementById("container")
    container.innerHTML = null
  data.forEach(({id,title,status}) => {
      let div = document.createElement("div")
      let h3 = document.createElement("h3")
      h3.innerText = title

      let p = document.createElement("p")
      p.innerText = status

      // delete
      let dlt_btn = document.createElement("button")
      dlt_btn.innerText = "Delete"
      dlt_btn.onclick = () => {
          remove(id)
      }

      // toggle
      let tgl_btn = document.createElement("button")
      tgl_btn.innerText = "Toggle"
      tgl_btn.onclick = () => {
          toggle(id)
      }

      div.append(h3,p,dlt_btn,tgl_btn)
      container.append(div)

  });
}
let addTodo = async() => {
    let todo = document.getElementById("todo").value 

    let todo_obj = {
        title: todo,
        id: Date.now() + todo,
       status : false,
    }
    console.log(todo_obj);
    let res = await fetch(`${url}/todo`,{
        method : "POST",
        body : JSON.stringify(todo_obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    getData()

}


let remove = async (id) => {
    // console.log(id);
   let res = await fetch(`${url}/todo/${id}`,{
       method :"DELETE"
   })
   getData()

}
let toggle = async (id) => {
    let todo = await fetch(`${url}/todo/${id}`)
    todo = await todo.json()

    let todo_status = {status : !todo.status}

    let res = await fetch(`${url}/todo/${id}`,{
        method :"PATCH",
        body : JSON.stringify(todo_status),
        headers:{
            "Content-Type":"application/json"
        }
    })
    getData()
}

