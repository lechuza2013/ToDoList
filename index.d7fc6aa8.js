const e={data:{list:[{pendiente:"",completed:!1}]},listeners:[],init(){if(localStorage.getItem("local-state")){console.log("Soy el init, se encontró un local-state");const e=localStorage.getItem("local-state");this.setState(JSON.parse(e))}else console.log("Soy el init, no se encontró un local-state, puntuación reniciada"),this.setState(this.getState())},getState(){return this.data},setState(e){console.log("Soy el NewState del setState",e),this.data=e;for(const e of this.listeners)e();localStorage.setItem("local-state",JSON.stringify(e))},subscribe(e){this.listeners.push(e)},addItem(e){const n=this.getState();n.list.push(e),this.setState(n)},removeItem(e){const n=this.getState();n.list.splice(e,1),this.setState(n)}};customElements.define("header-el",class extends HTMLElement{shadow=this.attachShadow({mode:"open"});constructor(){super(),this.render()}render(){var e=document.createElement("style");e.textContent="\n            @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');\n            .header{\n                display: flex; \n                justify-content: center;\n                height: 20vh;\n                background-color: #87ceeb;\n                align-items: center;\n            }\n            .h1{\n                text-align: center;\n                font-family: 'Macondo', cursive;\n            }\n            ",this.shadow.innerHTML='\n            <header class="header">\n                <h1 class="h1">Mis pendientes</h1>\n            </header>\n            ',this.shadow.appendChild(e)}}),customElements.define("form-el",class extends HTMLElement{shadow=this.attachShadow({mode:"open"});constructor(){super(),this.render()}connectedCallback(){this.shadow.querySelector(".my-form").addEventListener("submit",(n=>{n.preventDefault();const t=new FormData(n.target),o=Object.fromEntries(t.entries());console.log(o),e.addItem({pendiente:o.pendiente,completed:!1}),console.log("Soy el form",e.getState())}))}render(){var e=document.createElement("style");e.textContent="\n            *, *::before, *::after{\n                box-sizing: border-box;\n            }\n            .label{\n                position: relative;\n                font-size: 14px;\n                padding-top 20px;\n                margin-bottom: 5px;\n            }\n            .label .input {\n                width: 250px;\n                -webkit-appearance: none;\n                -ms-appearance: none;\n                -moz-appearance: none;\n                appearance: none;\n                background: #f2f2f2;\n                padding: 12px;\n                border-radius: 3px;\n                outline: none;\n            }\n            .label .placeholder {\n                position: absolute;\n                left: 12px;\n                top: 50%;\n                transform: translateY(-50%);\n                color: #aaa;\n                transition: top 0.3s ease, \n                font-size 0.3s ease, \n                color 0.3s ease;\n            }\n            .label .input:valid + .placeholder,\n            .label .input:focus + .placeholder{\n                top: -45px;\n                color: #222;\n            }\n            .div{\n                background-color: white;\n                height: auto;\n                min-height: 35vh;\n                min-width: 500px;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                flex-direction: column;\n                -webkit-box-shadow: 4px 4px 8px gray;\n                -moz-box-shadow: 4px 4px 8px gray;\n            }\n            .input{\n                height: 70px; \n              \n            }\n            .input:focus::placeholder{\n                color: transparent;\n            }\n            .input::placeholder{\n                color: #222;\n                transition: color 0.3s ease;\n            }\n            .button{\n                margin-left:20px;\n                height: 70px;\n                width: 150px;\n                display: inline-block;\n                padding: 15px 25px;\n                font-size: 24px;\n                cursor: pointer;\n                text-align: center;\n                text-decoration: none;\n                outline: none;\n                color: #fff;\n                background-color: #87ceeb;\n                border: none;\n                border-radius: 15px;\n                box-shadow: 0 9px #999;\n            }\n            .button:hover {\n                background-color: #6ba2b9;\n            }\n\n            .button:active {\n            background-color: #3e8e41;\n            box-shadow: 0 5px #666;\n            transform: translateY(4px);\n            }\n            ",this.shadow.innerHTML='\n             <div class="div">\n                <form class="my-form">\n                    <label for="name" class="label">\n                    <input type="text" autocomplete="off" class="input" name="pendiente" id="name" required />\n                    <span class="placeholder"> Ingrese su pendiente aquí</span>\n                    </label>\n                    <button class="button"><span>+</span></button>\n                </form>\n            </div>\n            ',this.shadow.appendChild(e)}});class n extends HTMLElement{shadow=this.attachShadow({mode:"open"});constructor(){super(),this.render()}connectedCallback(){e.subscribe((()=>{this.render()}))}render(){console.log(e.getState());const n=e.getState().list;console.log("Soy el render de list",n);var t=document.createElement("style");t.textContent="\n            @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');\n            .div{\n                padding: 30px;\n            }\n            .div__item{\n                margin-bottom: 15px;\n                display: flex;\n                justify-content: space-between;\n                padding: 15px;\n                background-color: #FFF599;\n                min-height: 10px;\n            }\n            .div__item-container{\n                display: flex;\n                justify-content: space-between;\n                flex-direction: column;\n                align-items: center;\n            }\n            .checkbox{\n                height: 20px;\n                width: 20px;\n            }\n            .button{\n                height: 25px;\n                width: 25px;\n                border: none;\n                background-color: #FFF599;\n                background-image: url(\"/delete.3dc2c69c.svg\");\n                background-repeat: no-repeat;\n                background-position: center;\n                cursor: pointer;\n            }\n            .button:hover{\n                transform: scale(1.1);\n            }\n            .p{\n                text-overflow: ellipsis;\n                overflow: hidden;\n                white-space: nowrap;\n\n                max-width: 600px;\n                max-height: 600px;\n                font-family: 'Macondo', cursive;\n                font-size: 18px;\n                font-weight: 400;\n                line-height: 21px;\n                letter-spacing: 0em;\n                text-align: left;\n            }\n            ",this.shadow.innerHTML=`\n            <div class="div">\n                ${n.map((e=>`\n                        <div class="div__item" id="${n.indexOf(e)}">\n                            <p class="p"id="p${n.indexOf(e)}">${e.pendiente}</p>\n                            <div class="div__item-container">\n                                <input class="checkbox" type="checkbox" id="checkbox${n.indexOf(e)}"/>\n                                <button class="button" id="button${n.indexOf(e)}"></button>\n                        </div>\n                    </div>`)).join(" ")}\n            </div>\n            `,this.shadow.appendChild(t),n.forEach((t=>{const o=this.shadow.getElementById("p"+n.indexOf(t)),a=this.shadow.getElementById("checkbox"+n.indexOf(t));1==t.completed?(a.checked=!0,o.style.textDecoration="line-through"):(a.checked=!1,o.style.textDecoration="none"),a.addEventListener("change",(e=>{a.checked?(t.completed=!0,o.style.textDecoration="line-through"):(t.completed=!1,o.style.textDecoration="none")}));const s=this.shadow.getElementById(n.indexOf(t));this.shadow.getElementById("button"+n.indexOf(t)).addEventListener("click",(()=>{s.remove(),e.removeItem(n.indexOf(t)),console.log("Soy el botón remove",e.getState())}))}))}}customElements.define("list-el",n),e.init();
//# sourceMappingURL=index.d7fc6aa8.js.map
