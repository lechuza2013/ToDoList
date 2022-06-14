    customElements.define("header-el", class extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }
        render(){
            // EL CSS DEL SHADOW
            var style = document.createElement("style");
            //ACA ENTRA EL CSS
            style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
            .header{
                display: flex; 
                justify-content: center;
                height: 20vh;
                background-color: #87ceeb;
                align-items: center;
            }
            .h1{
                text-align: center;
                font-family: 'Macondo', cursive;
            }
            `;
            this.shadow.innerHTML = `
            <header class="header">
                <h1 class="h1">Mis pendientes</h1>
            </header>
            `;
            this.shadow.appendChild(style);
        }
    });
