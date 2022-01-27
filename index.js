window.onload = function(){
    const tareas = {
        data(){
            return{
                listatareas: [],
                nombre: '',
            }
        },
        methods:{
            agregar(){
                this.listatareas.push(
                    {
                        nombre: this.nombre, // Nombre, título o descripción
                        fecha: new Date().toLocaleString(), // Formato DD/MM/YY
                        prioridad: 1, // Prioridad por defecto baja
                        prioridadname: '',
                        estado:false // Las tareas se crean por defecto como no completas
                    }
                );
                this.nombre = '';
                this.nameprioridad();
                this.ordenar();
                this.updateLocalStorage();
            },
            completar(index){
                this.listatareas[index].estado = !this.listatareas[index].estado;
                this.ordenar();
                this.updateLocalStorage();
            },
            borrar(index){
                this.listatareas.splice(index, 1);
                this.ordenar();
                this.updateLocalStorage();
            },
            updateLocalStorage(){
                localStorage.all = JSON.stringify(this.listatareas);
            },
            incprioridad(index){ // Incrementar prioridad
                if(this.listatareas[index].prioridad < 3){
                    this.listatareas[index].prioridad++;
                }
                this.ordenar();
                this.nameprioridad();
                this.updateLocalStorage();
            },

            decprioridad(index){ // Decrementar prioridad
                if(this.listatareas[index].prioridad > 1){
                    this.listatareas[index].prioridad--;
                }
                this.nameprioridad();
                this.ordenar();
                this.updateLocalStorage();
            },

            nameprioridad(){ // Ponerle nombre a cada número de prioridad, 1 siendo baja y 3 siendo la más alta y la máxima
                this.listatareas.forEach(element => {
                    if(element.prioridad == 1){
                        element.prioridadname = 'Baja';
                    }else if(element.prioridad == 2){
                        element.prioridadname = 'Media';
                    }else{
                        element.prioridadname = 'Alta';
                    }
                })
                
            },
            borrarCompletadas(){ // Borrar todas las tareas cuyo estado es true
                arr = [];
                this.listatareas.forEach(element => {
                    if(element.estado == false){
                        arr.push(element);
                    }
                });
                this.listatareas = arr;
                this.ordenar();
                this.updateLocalStorage();
            },
            ordenar(){
                this.listatareas = this.listatareas.sort((a, b) => {
                        if (b.prioridad == 2 && a.prioridad == 1) {
                            return 1;
                        }else if (b.prioridad == 3 && a.prioridad == 1) {
                            return 1;
                        }else if(b.prioridad == 3  && a.prioridad == 2){
                            return 1;
                        }else if (a.prioridad == 3 && b.prioridad == 2) {
                            return -1;
                        }else if (a.prioridad == 3 && b.prioridad == 1) {
                            return -1;
                        }else if (a.prioridad == 2 && b.prioridad == 1) {
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                )
                this.updateLocalStorage();
            },

            mostrarCompletas(){
                this.listatareas = JSON.parse(localStorage.all); 

                let completadas = []; // Nueva lista para almacenar las completadas
                this.listatareas.forEach(tarea => {
                    if (tarea.estado) {
                        completadas.push(tarea);
                    }
                    this.listatareas = completadas; // Sobreescribe listatareas para mostrar las completas
                });
                // No actualiza el local storage porque allí se encuentra almacenada listatareas completa con todas las tareas
            },
            mostrarIncompletas(){
                this.listatareas = JSON.parse(localStorage.all);

                let incompletas = []; // Nueva lista para almacenar incompletas
                this.listatareas.forEach(tarea => {
                    if (!tarea.estado) {
                        incompletas.push(tarea);
                    }
                    this.listatareas = incompletas; // Sobreescribe listatareas para mostrar las incompletas
                });
                // No actualiza el local storage porque allí se encuentra almacenada listatareas completa con todas las tareas
            },

            mostrarTodas(){
                this.ordenar();
                this.listatareas = JSON.parse(localStorage.all);
            }
        },

        computed:{
            incompletos(){
                let num_incompletos = this.listatareas.filter(tarea => !tarea.estado).length;
                return num_incompletos;
            }
        },
        mounted(){
            if(localStorage.all)
                this.listatareas = JSON.parse(localStorage.all);
        }
    }

    Vue.createApp(tareas).mount('#app');
}