const e={data:{list:[{pendiente:"cagar",completed:!0}]},listeners:[],init(){if(localStorage.getItem("local-state")){console.log("Soy el init, se encontró un local-state");const e=localStorage.getItem("local-state");this.setState(JSON.parse(e))}else console.log("Soy el init, no se encontró un local-state, puntuación reniciada"),this.setState(this.getState())},getState(){return this.data},setState(e){console.log("Soy el NewState del setState",e),this.data=e;for(const e of this.listeners)e();localStorage.setItem("local-state",JSON.stringify(e))},subscribe(e){this.listeners.push(e)},addItem(e){const t=this.getState();t.list.push(e),this.setState(t)},removeItem(e){const t=this.getState();t.list.splice(e,1),this.setState(t)}};class t extends HTMLElement{shadow=this.attachShadow({mode:"open"});constructor(){super(),this.render()}connectedCallback(){e.subscribe((()=>{this.render()}))}render(){console.log(e.getState());const t=e.getState().list;console.log("Soy el render de list",t);var n=document.createElement("style");n.textContent="\n            @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');\n            .div{\n                padding: 30px;\n            }\n            .div__item{\n                margin-bottom: 15px;\n                display: flex;\n                justify-content: space-between;\n                padding: 15px;\n                background-color: #FFF599;\n                min-height: 10px;\n            }\n            .div__item-container{\n                display: flex;\n                justify-content: space-between;\n                flex-direction: column;\n                align-items: center;\n            }\n            .checkbox{\n                height: 20px;\n                width: 20px;\n            }\n            .button{\n                height: 25px;\n                width: 25px;\n                border: none;\n                background-color: #FFF599;\n                background-image: url(\"/delete.3dc2c69c.svg\");\n                background-repeat: no-repeat;\n                background-position: center;\n                cursor: pointer;\n            }\n            .button:hover{\n                transform: scale(1.1);\n            }\n            .p{\n                text-overflow: ellipsis;\n                overflow: hidden;\n                white-space: nowrap;\n\n                max-width: 600px;\n                max-height: 600px;\n                font-family: 'Macondo', cursive;\n                font-size: 18px;\n                font-weight: 400;\n                line-height: 21px;\n                letter-spacing: 0em;\n                text-align: left;\n            }\n            ",this.shadow.innerHTML=`\n            <div class="div">\n                ${t.map((e=>`\n                        <div class="div__item" id="${t.indexOf(e)}">\n                            <p class="p"id="p${t.indexOf(e)}">${e.pendiente}</p>\n                            <div class="div__item-container">\n                                <input class="checkbox" type="checkbox" id="checkbox${t.indexOf(e)}"/>\n                                <button class="button" id="button${t.indexOf(e)}"></button>\n                        </div>\n                    </div>`)).join(" ")}\n            </div>\n            `,this.shadow.appendChild(n),t.forEach((n=>{const o=this.shadow.getElementById("p"+t.indexOf(n)),i=this.shadow.getElementById("checkbox"+t.indexOf(n));1==n.completed?(i.checked=!0,o.style.textDecoration="line-through"):(i.checked=!1,o.style.textDecoration="none"),i.addEventListener("change",(e=>{i.checked?(n.completed=!0,o.style.textDecoration="line-through"):(n.completed=!1,o.style.textDecoration="none")}));const s=this.shadow.getElementById(t.indexOf(n));this.shadow.getElementById("button"+t.indexOf(n)).addEventListener("click",(()=>{s.remove(),e.removeItem(t.indexOf(n)),console.log("Soy el botón remove",e.getState())}))}))}}customElements.define("list-el",t),e.init();
//# sourceMappingURL=index.45ca8c81.js.map
