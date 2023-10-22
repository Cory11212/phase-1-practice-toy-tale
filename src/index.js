let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

 

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((json) => {
    const coll = document.getElementById('toy-collection')
    const cards =[]

    json.forEach(element => {
      const makeCard = document.createElement('div')
      const h2 = document.createElement('h2')
      h2.textContent = element.name

      const img = document.createElement('img')
      img.src = element.image
      img.className= "toy-avatar"

      const p = document.createElement('p')
      p.textContent = element.likes

      const btn = document.createElement('button')
      btn.className = 'like-btn'
      btn.id = element.id
      btn.textContent = 'Like ❤️'
      btn.addEventListener('click', ()=>{
        let newNumberOfLikes = element.likes++
        p.textContent = newNumberOfLikes
        fetch(`http://localhost:3000/toys/${element.id}`,{
          method : "PATCH",
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newNumberOfLikes
          })

        })
      })

      makeCard.className= 'card'
      makeCard.append(h2, img, p, btn)
      coll.append(makeCard)
      /*makeCard.innerHTML = `<h2>${element.name}</h2>
      <img src="${element.image}" class="toy-avatar" />
      <p>${element.likes}</p>
      <button class="like-btn" id="${element.id}">Like ❤️</button>`
      makeCard.className = 'card'
      cards.push(makeCard)*/
    });

  
  });

  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit',(event)=>{
    const answers = document.getElementsByClassName('input-text')
   fetch('http://localhost:3000/toys',{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${answers[0].value}`,
      "image": `${answers[1].value}`,
      "likes": 0
    })
    })

  })

 

  

});
