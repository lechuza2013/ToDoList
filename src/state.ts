export const state = {
    data: {
      list: [{
        pendiente: "cagar",
        completed: true
      }
    ],
  },
  listeners: [], // los callbacks
  init(){ //Pone en la data lo que hay en el Storage
    if (localStorage.getItem("local-state")){
      console.log("Soy el init, se encontró un local-state");
      const localData = localStorage.getItem("local-state") as string;
      this.setState(JSON.parse(localData));
  }
  else{
      console.log("Soy el init, no se encontró un local-state, puntuación reniciada");
     this.setState(this.getState());
 }
  },
    getState() {
     return this.data; //Devuelve la data 
    },
    setState(newState) {
      console.log("Soy el NewState del setState", newState)
      this.data = newState; //Modifica this.data (el state) e invoca los callbacks
        for(const cb of this.listeners){ 
            cb();
            // console.log("Callback: ", cb)
        }
        localStorage.setItem("local-state", JSON.stringify(newState));
        // console.log("Soy el state, he cambiado");
       // modifica this.data (el state) e invoca los callbacks
    },
    subscribe(callback: (any) => any) {
      this.listeners.push(callback);
       // recibe callbacks para ser avisados posteriormente
    },
    addItem(item) { 
      const cb = this.getState();
      cb.list.push(item);
      this.setState(cb);
      // suma el nuevo item a la lista
    },
    removeItem(position){
      const cb = this.getState();
      cb.list.splice(position, 1);
      this.setState(cb);
    }
  };