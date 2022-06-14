import { state } from "../src/state";
export function form(){
    class Form extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        connectedCallback(){
                const myForm = this.shadow.querySelector(".my-form") as HTMLFormElement;
                myForm.addEventListener("submit",(e)=>{
                    //Anula algunas funciones que tiene el form por defecto.
                    e.preventDefault();
                    //La pendiente que recibe mi form
                    const formData = new FormData(e.target as HTMLFormElement);
                    const objeto = Object.fromEntries(formData.entries());
                    console.log(objeto);
                    //Lo agrega al state enviandole un objeto
                    state.addItem({
                        pendiente: objeto.pendiente,
                        completed: false,
                    });
                    console.log("Soy el form", state.getState());
                })
        }
        render(){
            // EL CSS DEL SHADOW
            var style = document.createElement("style");
            //ACA ENTRA EL CSS
            style.textContent = `
            *, *::before, *::after{
                box-sizing: border-box;
            }
            .label{
                position: relative;
                font-size: 14px;
                padding-top 20px;
                margin-bottom: 5px;
            }
            .label .input {
                width: 250px;
                -webkit-appearance: none;
                -ms-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background: #f2f2f2;
                padding: 12px;
                border-radius: 3px;
                outline: none;
            }
            .label .placeholder {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #aaa;
                transition: top 0.3s ease, 
                font-size 0.3s ease, 
                color 0.3s ease;
            }
            .label .input:valid + .placeholder,
            .label .input:focus + .placeholder{
                top: -45px;
                color: #222;
            }
            .div{
                background-color: white;
                height: auto;
                min-height: 35vh;
                min-width: 500px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                -webkit-box-shadow: 4px 4px 8px gray;
                -moz-box-shadow: 4px 4px 8px gray;
            }
            .input{
                height: 70px; 
              
            }
            .input:focus::placeholder{
                color: transparent;
            }
            .input::placeholder{
                color: #222;
                transition: color 0.3s ease;
            }
            .button{
                margin-left:20px;
                height: 70px;
                width: 150px;
                display: inline-block;
                padding: 15px 25px;
                font-size: 24px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                outline: none;
                color: #fff;
                background-color: #87ceeb;
                border: none;
                border-radius: 15px;
                box-shadow: 0 9px #999;
            }
            .button:hover {
                background-color: #6ba2b9;
            }

            .button:active {
            background-color: #3e8e41;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
            }
            `;
            this.shadow.innerHTML = `
             <div class="div">
                <form class="my-form">
                    <label for="name" class="label">
                    <input type="text" autocomplete="off" class="input" name="pendiente" id="name" required />
                    <span class="placeholder"> Ingrese su pendiente aquí</span>
                    </label>
                    <button class="button"><span>+</span></button>
                </form>
            </div>
            `;
            this.shadow.appendChild(style);
        }
    }
    customElements.define("form-el", Form);
}