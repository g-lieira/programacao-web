import taskService from "./taskservice.js"


let estaLogado = function () {
    let token = localStorage.getItem("token")
    return token != undefined && token != "" && token != null;
}

//let estaLogadoAdmin = function () {
  //  let token = localStorage.getItem("tokenAdmin")
    //return token != undefined && token != "" && token != null;
//}

let atualizaTarefas = async function() {
    let resp = await taskService.lista()
    if (resp.status) {
        let ul =  document.querySelector("#alunos");
        ul.innerHTML = "";
        resp.list.forEach((item) => {
            let li = document.createElement("li")

            let edit = document.createElement("button")
            edit.addEventListener("click", function() {
                document.querySelector("#tid").value = item.id
                document.querySelector("#tnome").value = item.name
                document.querySelector("#tidade").value = item.idade
            })
            edit.className = "btn btn-link"
            edit.innerHTML = "editar"
                        
            let del = document.createElement("button")
            del.innerHTML = "delete"
            del.className = "btn btn-link"
            del.addEventListener("click", async function() {
                if (confirm("Deseja excluir este aluno?")) {
                    let token = localStorage.getItem("token")
                    let resp = await taskService.exclui(token, item.id)
                    if (resp.status) {
                        ul.removeChild(li);
                    }
                }
            })

            
            if (estaLogado()) {
                li.appendChild(document.createTextNode(item.name + ", " + item.idade + " anos"))
                li.appendChild(edit)
                li.appendChild(del)
            } else {
                li.appendChild(document.createTextNode(item.name + " "))
            }
            ul.appendChild(li)
        })
    }
}

let controlaAcesso = function() {
    if (estaLogado()) {
        document.querySelector("form#faluno").className = ''
        document.querySelector("form#fusers").className = 'oculto'
        document.querySelector("form#flogin").className = 'oculto'
    } else if(estaLogadoAdmin()){
        document.querySelector("form#faluno").className = ''
        document.querySelector("form#fusers").className = ''
        document.querySelector("form#flogin").className = 'oculto'
    } else {
        document.querySelector("form#faluno").className = 'oculto'
        document.querySelector("form#fusers").className = 'oculto'
        document.querySelector("form#flogin").className = ''
    }
}

window.addEventListener("load", function() {
    atualizaTarefas()
    controlaAcesso()

    document.querySelector("form#faluno").addEventListener("submit", async function(evt) {
        evt.preventDefault();
        let token = localStorage.getItem("token")
        let hid = document.querySelector("#tid")
        let hnome = document.querySelector("#tnome")
        let hidade = document.querySelector("#tidade")
        let resp;
        if (hid.value) {
            resp = await taskService.altera(token, hid.value, hnome.value, hidade.value);
        } else {
            resp = await taskService.novo(token, hnome.value, hidade.value);
        }
        if (resp.status) {
            atualizaTarefas()
            hid.value = '';
            hnome.value = '';
            hidade.value = '';
        }
    })

    document.querySelector("form#flogin").addEventListener("submit", async function(evt) {
        evt.preventDefault();
        let user = document.querySelector("#user").value;
        let pass = document.querySelector("#password").value;
        let resp = {status: false, mensagem:'Usuario e senha vazios'}
        if (user && pass) {
            resp = await taskService.login(user, pass)
        }
        if (resp.status) {
            localStorage.setItem("token", resp.token)
        }
        controlaAcesso()
        atualizaTarefas()
    })

    document.querySelector("#logout").addEventListener("click", () => {
        localStorage.removeItem("token")
        controlaAcesso()
        atualizaTarefas()

    })
})