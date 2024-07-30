function mostrarProyectos(usuarios, pagina) {
    const listaUsuarios = document.getElementById("lista-proyectos");
    listaUsuarios.innerHTML = "";

    const usuariosPorPagina = 15;
    const inicio = (pagina - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    const usuariosPagina = usuarios.slice(inicio, fin);

    usuariosPagina.forEach(usuario => {
        const usuarioDiv = document.createElement("div");
        usuarioDiv.className = "proyecto";

        const id = document.createElement("h3");
        id.innerText = "ID: " + usuario.id;
        usuarioDiv.appendChild(id);

        const nombre = document.createElement("p");
        nombre.innerText = "Nombre: " + usuario.nombre;
        usuarioDiv.appendChild(nombre);

        const verButton = document.createElement("button");
        verButton.innerText = "Ver";
        verButton.className = "paginacion-btn";
        verButton.onclick = function() {
            mostrarDetallesUsuario(usuario.id);
        };
        usuarioDiv.appendChild(verButton);

        listaUsuarios.appendChild(usuarioDiv);
    });

    // Crear botones de paginación
    const paginacionDiv = document.getElementById("paginacion");
    paginacionDiv.innerHTML = "";

    if (pagina > 1) {
        const anteriorButton = document.createElement("button");
        anteriorButton.innerText = "Anterior";
        anteriorButton.className = "paginacion-btn";
        anteriorButton.onclick = function() {
            obtenerUsuarios(pagina - 1);
        };
        paginacionDiv.appendChild(anteriorButton);
    }

    if (fin < usuarios.length) {
        const siguienteButton = document.createElement("button");
        siguienteButton.innerText = "Siguiente";
        siguienteButton.className = "paginacion-btn";
        siguienteButton.onclick = function() {
            obtenerUsuarios(pagina + 1);
        };
        paginacionDiv.appendChild(siguienteButton);
    }
}

function mostrarDetallesUsuario(id) {
    fetch(ruta + '/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del usuario');
        }
        return response.json();
    })
    .then(data => {
        const modal = document.getElementById("modal");
        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const id = document.createElement("h2");
        id.innerText = "ID: " + data.usuario.id;
        modalContent.appendChild(id);

        const nombre = document.createElement("p");
        nombre.innerText = "Nombre: " + data.usuario.nombre;
        modalContent.appendChild(nombre);

        const correo = document.createElement("p");
        correo.innerText = "Correo: " + data.usuario.correo;
        modalContent.appendChild(correo);

        const programa = document.createElement("p");
        programa.innerText = "Programa: " + data.usuario.programa;
        modalContent.appendChild(programa);

        const usuario = document.createElement("p");
        usuario.innerText = "Usuario: " + data.usuario.usuario;
        modalContent.appendChild(usuario);

        const fecha = document.createElement("p");
        fecha.innerText = "Fecha de registro: " + data.usuario.fecha;
        modalContent.appendChild(fecha);

        const cerrarButton = document.createElement("button");
        cerrarButton.innerText = "Cerrar";
        cerrarButton.className = "paginacion-btn";
        cerrarButton.onclick = function() {
            modal.style.display = "none";
        };
        modalContent.appendChild(cerrarButton);

        // Mostrar el modal
        modal.style.display = "block";

        // Desplazarse hacia la parte superior de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Error al obtener detalles del usuario:', error);
        alert('Hubo un problema al obtener los detalles del usuario.');
    });
}

function obtenerUsuarios(pagina = 1) {
    fetch(ruta + '/ver_usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarProyectos(data.usuarios, pagina);
            // Desplazarse hacia la parte superior de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Error al obtener usuarios: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al obtener los usuarios.');
    });
}

// Llamada inicial para obtener y mostrar usuarios
obtenerUsuarios();