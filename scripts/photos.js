document.addEventListener("DOMContentLoaded", () => {
    function getData(url){
        return fetch(url)
            .then(response => response.json())
            .catch(error => alert(error))
    }
    
    
    async function getPhotos(){
        try {
            let photoContainer = document.getElementById("photoContainer");
            let data = await getData("https://jsonplaceholder.typicode.com/photos");
            
            photoContainer.innerHTML = "";
    
            for (let i = 0; i < 100; i++) {
                let elemento = `
                <div class="card">
                    <img src="${data[i].url}" alt="Imagen">
                    <img src="${data[i].thumbnailUrl}" alt="Miniatura">
                    <h3>${data[i].title}</h3>
                    <p>Album ID: ${data[i].albumId}</p>
                    <p>ID: ${data[i].id}</p>
                </div>`

                photoContainer.innerHTML += elemento;
                
            }
            console.log(data)
        } catch (error) {
            
        }
    }
    
    getPhotos();
})