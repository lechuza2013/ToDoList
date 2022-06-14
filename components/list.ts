import { state } from "../src/state";
    class List extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        connectedCallback(){
            state.subscribe(()=>{
                this.render();
            });
        }
        render(){
            console.log(state.getState());
            const updatedList = state.getState().list;
            console.log("Soy el render de list",updatedList);
            // EL CSS DEL SHADOW
            var style = document.createElement("style");
            const imgURL = require("url:../components/delete.svg");
            //ACA ENTRA EL CSS
            style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
            .div{
                padding: 30px;
            }
            .div__item{
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                padding: 15px;
                background-color: #FFF599;
                min-height: 10px;
            }
            .div__item-container{
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                align-items: center;
            }
            .checkbox{
                height: 20px;
                width: 20px;
            }
            .button{
                height: 25px;
                width: 25px;
                border: none;
                background-color: #FFF599;
                background-repeat: no-repeat;
                background-position: center;
                cursor: pointer;
            }
            .button:hover{
                transform: scale(1.1);
            }
            .p{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                max-width: 600px;
                max-height: 600px;
                font-family: 'Macondo', cursive;
                font-size: 18px;
                font-weight: 400;
                line-height: 21px;
                letter-spacing: 0em;
                text-align: left;
            }
            `;
            this.shadow.innerHTML = `
            <div class="div">
                ${updatedList.map((item)=>{ 
                    return `
                        <div class="div__item" id="${updatedList.indexOf(item)}">
                            <p class="p"id="p${updatedList.indexOf(item)}">${item.pendiente}</p>
                            <div class="div__item-container">
                                <input class="checkbox" type="checkbox" id="checkbox${updatedList.indexOf(item)}"/>
                                <button class="button" id="button${updatedList.indexOf(item)}"></button>
                        </div>
                    </div>`;
                    }).join(" ")  
            }
            </div>
            `;
           
            //Se agrega el "Style" a nuestro pequeño DOM
            this.shadow.appendChild(style);
            //Por cada objeto de la lista se realizan estas funciones..
            updatedList.forEach(element => {
                // -----------------CHECKBOX----------------------------------
                //El nombre de la pendiente para después tacharlo 
                const pendientNameEl = this.shadow.getElementById("p"+updatedList.indexOf(element)) as HTMLElement;
                //El checkbox del elemento
                const checkboxEl = this.shadow.getElementById("checkbox"+updatedList.indexOf(element)) as HTMLInputElement;
                //Checkea si la pendiente estuvo completado
                if (element.completed == true){
                    checkboxEl.checked = true;  
                    pendientNameEl.style.textDecoration = "line-through";
                }
                else{
                    checkboxEl.checked = false;
                    pendientNameEl.style.textDecoration = "none";
                }
                checkboxEl.addEventListener("change", (e)=>{
                    if (checkboxEl.checked){
                        element.completed = true;
                        pendientNameEl.style.textDecoration = "line-through";
                    }
                    else{
                        element.completed = false;
                        pendientNameEl.style.textDecoration = "none";
                    }
                })
                //--------------------REMOVE BUTTON-----------------------------------
                //Contenedor de la pendiente
                const pendient = this.shadow.getElementById(updatedList.indexOf(element)) as HTMLElement;
                //Botón para eliminar la pendiente
                const removePendientButton = this.shadow.getElementById("button"+updatedList.indexOf(element)) as HTMLElement;
                removePendientButton.style.backgroundImage = imgURL;
                removePendientButton.addEventListener("click",()=>{
                    // if (confirm("Estas seguro?")) { //Confirmación en caso de arrepentimiento
                    // }
                    //Elimina el elemento
                    pendient.remove();
                    //Y lo elimina del State
                    state.removeItem(updatedList.indexOf(element));
                    console.log("Soy el botón remove", state.getState());
                })
            });
                 
        }
    }
    customElements.define("list-el", List);
