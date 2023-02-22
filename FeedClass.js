class Feed {
    
     horaatual = new Date();
     horas = this.horaatual.getHours();
     minutos = this.horaatual.getMinutes();
 

    posts = [
        {
            photo: "https://www.viajali.com.br/wp-content/uploads/2020/04/praia-de-boa-viagem-9.jpg",
            description: "Praia",
              autor: {
                name: "Ivina Karol", 
                username: "ivinakarol",
                perfil: "https://vignette.wikia.nocookie.net/rebeld/images/6/66/70780-anah-iacute-como-m-iacute-a-colucci-em-950x0-1.jpg/revision/latest?cb=20170926183617&path-prefix=pt-br",
                description: "Hoje deu Praia"
            }
        },
        {
            photo:"https://images2.alphacoders.com/103/1030226.jpg",
            description:"Montanha",
            autor: {
                name: "Maria Joaquina", 
                username: "Mariajoa",
                perfil: "http://3.bp.blogspot.com/-_IvPBxXYpn8/T-j1Eb6GjgI/AAAAAAAAISk/81Mvl6TB_WE/s1600/20120622104903.jpg",
                description: "Vista de hoje"
            }
        },
        {
            photo:"https://tse1.mm.bing.net/th?id=OIP.-MdLT6WP_CFyhnY-wTuoXAHaEv&pid=Api&P=0",
            description:"Neve",
            autor: {
                name: "José da Silva", 
                username: "JoseSilva",
                perfil: "https://vignette.wikia.nocookie.net/rebeld/images/6/66/70780-anah-iacute-como-m-iacute-a-colucci-em-950x0-1.jpg/revision/latest?cb=20170926183617&path-prefix=pt-br",
                description: "Muita Neve"
            }
        }
    
    ] 

    constructor(){
        this.addFeed(this.posts);
       
        }
    addFeed(posts){
        if(this.horas < 10 ){
            this.horas = "0" + this.horas;
}
        if(this.minutos < 10){
            this.minutos = "0" + this.minutos;
} 
        for(let i=0; i<posts.length; i++){
            let post = document.createElement("div");
            let username = document.createElement("span");
            let photo = document.createElement("img");
            
            photo.src = this.posts[i].autor.perfil;
            username.innerText = `@ ${this.posts[i].autor.username} \n Legenda: ${this.posts[i].autor.description}  
            Horário da publicação:  ${this.horas} : ${this.minutos}`;
            photo.src = this.posts[i].photo;

         
            post.appendChild(username);
            post.appendChild(photo);
            post.className = "post";
            document.querySelector("#posts").appendChild(post);
          
   }        
}
}
new Feed();