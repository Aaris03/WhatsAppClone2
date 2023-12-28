const prefixCountry = {
    Canada: "+1",
    EstadosUnidos: "+1",
    Peru: "+51",
    Argentina: "+54",
    Brasil: "+55",
    Chile: "+56",
    Colombia: "+57",
    Venezuela: "+58",
    Bolivia: "+591",
    Guayana: "+592",
    Ecuador: "+593",
    Paraguay: "+595",
    Uruguay: "+598",
    Grecia: "+30",
    PaisesBajos: "+31",
    Belgica: "+32",
    Francia: "+33",
    España: "+34",
    Portugal: "+351",
    Irlanda: "+353",
    Italia: "+39",
    Suiza: "+41",
    Dinamarca: "+45",
    Suecia: "+46",
    Noruega: "+47",
    Polonia: "+48",
    Alemania: "+49",
    Japon: "+81",
    CoreaDelSur: "+82",
    HongKong: "+852",
    India: "+91",
    Australia: "+61"
}
const activePrevChat = [{
    interlocutor: "2563485",
    chats: [
        {
            date: new Date(2023,11,1,15,25),
            viewed: true,
            own: false,
            message: "Buenas tardes"
        },
        {
            date: new Date(2023,11,1,15,28),
            viewed: true,
            own: true,
            message: "Hola Luis, dime"
        }
    ]
},{
    interlocutor: "4698335",
    chats: [
        {
            date: new Date(2023,11,3,18,00),
            viewed: true,
            own: false,
            message: "Holis"
        },
        {
            date: new Date(2023,11,3,18,15),
            viewed: true,
            own: true,
            message: "Hola Laura, dime"
        }
    ]
}]

class MainUser {
    constructor({
        name,
        country,
        phoneNumber,
        contacts = [],
        activesChats = [],
        main = false
    }){
        this.name
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.contacts = contacts;
        this.completePhoneNumber = `${prefixCountry[country]}-${this.phoneNumber}`;
        this.activesChats = activesChats;
        this.main = main;
    }

    initPrevChat(){
        return this.activesChats.push(activePrevChat);
    }

    newMessage (msg, inter){
        const itemChat = {
            date: new Date(),
            viewed: false,
            own: this.main,
            message: msg
        }

        const target = this.activesChats[0].find(target => target.interlocutor === inter)

        target.chats.push(itemChat)
    }

}

class User extends MainUser{
    constructor(props){
        super(props)    
    }  
} 

const mainUser = new MainUser({
    name: "Bruno Mars",
    country: "EstadosUnidos",
    phoneNumber: "1548765",
    main: true
})

const luisMiguel = new User({
    name: "Luis Miguel",
    country: "EstadosUnidos",
    phoneNumber: "2563485"
})

const LauraPausini = new User({
    name: "Laura Pausini",
    country: "Italia",
    phoneNumber: "4698335"
})

mainUser.contacts.push(
    luisMiguel,
    LauraPausini
)

mainUser.initPrevChat();

/** Variables auxiliares */

/** Selectores de elementos */

const navNewViewElement = document.querySelector(".news-view-nav");
const navChatsViewElement = document.querySelector(".chats-view-nav");
const navCallViewElement = document.querySelector(".call-view-nav");
const navComunityViewElement = document.querySelector(".comunity-view-nav");
const comunityNavImg = document.querySelector(".comunity-view-nav img");
const carouselBox = document.querySelector(".carousel-aux-box");

/** Eventos de click para navegacion de vistas */

navNewViewElement.addEventListener("click",activeView)
navChatsViewElement.addEventListener("click",activeView)
navCallViewElement.addEventListener("click",activeView)
navComunityViewElement.addEventListener("click",activeView)

/** 
 * Reiniciamos la posicion de la caja de los contactos al cambiar a la modalidad desktop
 */

window.addEventListener("resize", ()=>{
    if(this.innerWidth>= 851){
        carouselBox.style.translate = "0";
    }
})


/** 
 * activeView se encarga de buscar al elemento que tenga por default la clase .active-view; Se la quita y luego busca que vista que se quiere activar, para añadir la misma clase y mostrar visualmente la vista activa
 */
function activeView(){
    let actualActiveView = document.querySelector(".active-view")
    actualActiveView.classList.remove("active-view")

    if(this.classList.contains("comunity-view-nav")){
        comunityNavImg.setAttribute("src","./icon/green-comunity-mobile.svg")
        this.style.borderBottom = "3px solid var(--color-green)";
    }else{
        comunityNavImg.setAttribute("src","./icon/grey-comunity-mobile.svg")
        navComunityViewElement.removeAttribute("style")
    }
    window.scroll(0,0)

    this.classList.add("active-view");
    
    moveView(this);
}

/**
 * moveView desplaza el contenedor carusel para cambiar de vista de forma dinamica, segun el nav seleccionado.
 * @param {Object} view es el objeto que inicializa el evento de click
 * Se revisa la clase que contiene para saber a que vista se debe ir y se compara con el objeto carouselIndex para saber cuantos pixeles se debe mover el contenedor.
 */
function moveView(view){
    
    const carouselIndex = {
        "comunity-view": "100%",
        "chats-view": "0",
        "news-view": "-100%",
        "call-view": "-200%"
    }

    if(view.classList.contains("comunity-view-nav")){
        carouselBox.style.translate = carouselIndex["comunity-view"]
    }else if (view.classList.contains("chats-view-nav")){
        carouselBox.style.translate = carouselIndex["chats-view"]
    }else if (view.classList.contains("news-view-nav")){
        carouselBox.style.translate = carouselIndex["news-view"]
    }else if (view.classList.contains("call-view-nav")){
        carouselBox.style.translate = carouselIndex["call-view"]
    }
}